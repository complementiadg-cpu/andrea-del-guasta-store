import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2?target=deno";
import { Resend } from "npm:resend";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const OWNER_EMAIL = "info@andreadelguasta.com";
const FROM = "Andrea Del Guasta <info@andreadelguasta.com>";

const euro = (n: number) =>
  new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(n);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const secretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!secretKey) throw new Error("STRIPE_SECRET_KEY non configurata.");

    const { sessionId } = await req.json();
    if (typeof sessionId !== "string" || sessionId.length < 10) {
      return new Response(JSON.stringify({ error: "session_id non valido." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const stripe = new Stripe(secretKey.trim(), {
      apiVersion: "2023-10-16",
      httpClient: Stripe.createFetchHttpClient(),
    });
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    const paid = session.payment_status === "paid";
    const orderId = session.metadata?.order_id || null;
    const customerEmail = session.customer_details?.email ?? null;
    const amountTotal = (session.amount_total ?? 0) / 100;
    const lineItems = (session.line_items?.data ?? []).map((li) => ({
      name: li.description,
      quantity: li.quantity,
      amount: (li.amount_total ?? 0) / 100,
    }));

    let shouldNotify = paid;

    if (paid && orderId) {
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      );

      // Evita notifiche duplicate se la pagina "Grazie" viene ricaricata.
      const { data: existing } = await supabase
        .from("Ordini")
        .select("stato")
        .eq("id", orderId)
        .maybeSingle();
      if (existing?.stato === "paid") shouldNotify = false;

      const { error } = await supabase
        .from("Ordini")
        .update({ stato: "paid", stripe_session_id: session.id })
        .eq("id", orderId);
      if (error) console.error("Aggiornamento ordine fallito:", error.message);
    }

    if (shouldNotify) {
      const apiKey = Deno.env.get("RESEND_API_KEY");
      if (!apiKey) {
        console.error("RESEND_API_KEY non configurata: notifiche ordine non inviate.");
      } else {
        const rows = lineItems
          .map(
            (i) =>
              `<tr><td style="padding:6px 0">${i.name} × ${i.quantity}</td><td style="padding:6px 0;text-align:right">${euro(i.amount)}</td></tr>`,
          )
          .join("");
        const summary = `
          <table style="width:100%;border-collapse:collapse;font-family:Helvetica,Arial,sans-serif;font-size:14px">
            ${rows}
            <tr><td style="padding:10px 0;border-top:1px solid #ddd"><strong>Totale</strong></td>
                <td style="padding:10px 0;border-top:1px solid #ddd;text-align:right"><strong>${euro(amountTotal)}</strong></td></tr>
          </table>`;

        const resend = new Resend(apiKey);

        try {
          await resend.emails.send({
            from: FROM,
            to: [OWNER_EMAIL],
            subject: `Nuovo ordine pagato${orderId ? ` #${orderId}` : ""} — ${euro(amountTotal)}`,
            html: `<p><strong>Nuovo ordine pagato</strong></p>
                   <p>Cliente: ${customerEmail ?? "n.d."}<br/>
                   Ordine: ${orderId ?? "n.d."}<br/>
                   Sessione Stripe: ${session.id}</p>
                   ${summary}`,
          });
        } catch (e) {
          console.error("Invio notifica titolare fallito:", (e as Error).message);
        }

        if (customerEmail) {
          try {
            await resend.emails.send({
              from: FROM,
              to: [customerEmail],
              subject: "Conferma del tuo ordine — ANDREADELGUASTA",
              html: `<p style="font-family:Helvetica,Arial,sans-serif">Grazie per il tuo ordine.</p>
                     ${summary}
                     <p style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#666">
                     Ti scriveremo appena il tuo ordine sarà spedito. Per qualsiasi domanda: ${OWNER_EMAIL}</p>`,
            });
          } catch (e) {
            console.error("Invio conferma cliente fallito:", (e as Error).message);
          }
        }
      }
    }

    return new Response(
      JSON.stringify({
        paid,
        status: session.payment_status,
        email: customerEmail,
        amountTotal,
        currency: session.currency ?? "eur",
        orderId,
        items: lineItems,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Errore inatteso";
    console.error("confirm-checkout-session:", message);
    return new Response(JSON.stringify({ error: message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
