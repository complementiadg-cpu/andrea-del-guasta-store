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
    let orderData: any = null;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    if (paid && orderId) {
      // 1. Recupera i dati dell'ordine memorizzati su Supabase
      const { data: existing } = await supabase
        .from("Ordini")
        .select("*")
        .eq("id", orderId)
        .maybeSingle();

      if (existing) {
        orderData = existing;
        if (existing.stato === "paid") {
          shouldNotify = false;
        }
      }

      // 2. Aggiorna lo stato dell'ordine
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
        // Dettagli reali dell'ordine dal record Supabase
        const shipping = (orderData?.indirizzo_spedizione || {}) as Record<string, string>;
        const billing = (orderData?.indirizzo_fatturazione || null) as Record<string, string> | null;
        const nomeCliente = [orderData?.nome, orderData?.cognome].filter(Boolean).join(" ") || "N/D";
        const telefonoCliente = orderData?.telefono || "N/D";
        const emailCliente = orderData?.email || customerEmail || "N/D";
        const metodoSpedizione = orderData?.metodo_spedizione || null;
        const costoSpedizione = typeof orderData?.costo_spedizione === "number" ? orderData.costo_spedizione : null;
        const subtotale = typeof orderData?.subtotale === "number" ? orderData.subtotale : null;
        const codiceSconto = orderData?.codice_sconto || null;

        // Articoli con tutti i dettagli (SKU, categoria, misura personalizzata)
        type Articolo = {
          nome?: string;
          sku?: string;
          categoria?: string;
          prezzo?: number;
          quantita?: number;
          misura_personalizzata?: string | null;
        };
        const articoli: Articolo[] =
          Array.isArray(orderData?.articoli) && orderData.articoli.length > 0
            ? orderData.articoli
            : lineItems.map((i) => ({ nome: i.name, quantita: i.quantity, prezzo: i.amount }));

        const formatMisura = (m?: string | null) => {
          if (!m) return "";
          const label = /^\d+([.,]\d+)?$/.test(String(m).trim()) ? `${String(m).trim()} cm` : m;
          return `<div style="font-size:12px;color:#666;margin-top:2px">Misura personalizzata: ${label}</div>`;
        };

        const rows = articoli
          .map((a) => {
            const titolo = a.nome || "Articolo";
            const meta = [a.sku ? `SKU: ${a.sku}` : "", a.categoria || ""].filter(Boolean).join(" · ");
            const qty = a.quantita ?? 1;
            const prezzo = typeof a.prezzo === "number" ? euro(a.prezzo) : "—";
            return `<tr>
              <td style="padding:8px 0;border-bottom:1px solid #eee">
                <div style="font-weight:bold">${titolo}</div>
                ${meta ? `<div style="font-size:12px;color:#666;margin-top:2px">${meta}</div>` : ""}
                ${formatMisura(a.misura_personalizzata)}
              </td>
              <td style="padding:8px 0;text-align:right;border-bottom:1px solid #eee;vertical-align:top">× ${qty}<br/>${prezzo}</td>
            </tr>`;
          })
          .join("");

        const summary = `
          <table style="width:100%;border-collapse:collapse;font-family:Helvetica,Arial,sans-serif;font-size:14px;margin-top:10px">
            ${rows}
            ${subtotale !== null ? `<tr><td style="padding:6px 0">Subtotale</td><td style="padding:6px 0;text-align:right">${euro(subtotale)}</td></tr>` : ""}
            ${metodoSpedizione ? `<tr><td style="padding:6px 0">Spedizione — ${metodoSpedizione}</td><td style="padding:6px 0;text-align:right">${costoSpedizione !== null ? euro(costoSpedizione) : "—"}</td></tr>` : ""}
            ${codiceSconto ? `<tr><td style="padding:6px 0">Codice sconto</td><td style="padding:6px 0;text-align:right">${codiceSconto}</td></tr>` : ""}
            <tr>
              <td style="padding:10px 0;font-weight:bold">Totale</td>
              <td style="padding:10px 0;text-align:right;font-weight:bold;font-size:16px">${euro(amountTotal)}</td>
            </tr>
          </table>`;

        const addressBlock = (a: Record<string, string>) => `
          <p style="margin:3px 0">${a.address || "N/D"}</p>
          <p style="margin:3px 0">${a.postalCode || ""} ${a.city || ""} ${a.country ? `(${a.country})` : ""}</p>`;

        // Modello HTML completo destinato all'Owner del sito
        const ownerHtml = `
          <div style="font-family:Helvetica,Arial,sans-serif;color:#333;max-width:600px;line-height:1.5">
            <h2 style="border-bottom:2px solid #222;padding-bottom:8px;margin-top:0">Nuovo ordine pagato</h2>

            <p style="margin:4px 0"><strong>Ordine:</strong> ${orderId ? `#${orderId}` : "n.d."}</p>
            <p style="margin:4px 0"><strong>Sessione Stripe:</strong> <code style="background:#f4f4f4;padding:2px 4px">${session.id}</code></p>

            <hr style="border:0;border-top:1px solid #ddd;margin:15px 0" />

            <h3 style="margin-bottom:8px;color:#111">Dati Cliente</h3>
            <p style="margin:3px 0"><strong>Nome e Cognome:</strong> ${nomeCliente}</p>
            <p style="margin:3px 0"><strong>Email:</strong> ${emailCliente}</p>
            <p style="margin:3px 0"><strong>Telefono:</strong> ${telefonoCliente}</p>

            <hr style="border:0;border-top:1px solid #ddd;margin:15px 0" />

            <h3 style="margin-bottom:8px;color:#111">Indirizzo di Spedizione</h3>
            ${addressBlock(shipping)}

            ${
              billing && Object.keys(billing).length > 0
                ? `<hr style="border:0;border-top:1px solid #ddd;margin:15px 0" />
                   <h3 style="margin-bottom:8px;color:#111">Indirizzo di Fatturazione</h3>
                   ${addressBlock(billing)}`
                : ""
            }

            <hr style="border:0;border-top:1px solid #ddd;margin:15px 0" />

            <h3 style="margin-bottom:8px;color:#111">Riepilogo Articoli</h3>
            ${summary}
          </div>`;

        const resend = new Resend(apiKey);

        try {
          await resend.emails.send({
            from: FROM,
            to: [OWNER_EMAIL],
            subject: `Nuovo ordine pagato${orderId ? ` #${orderId}` : ""} — ${euro(amountTotal)}`,
            html: ownerHtml,
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
