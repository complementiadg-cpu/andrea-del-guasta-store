import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2?target=deno";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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

    if (paid && orderId) {
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      );
      const { error } = await supabase
        .from("Ordini")
        .update({ stato: "paid", stripe_session_id: session.id })
        .eq("id", orderId);
      if (error) console.error("Aggiornamento ordine fallito:", error.message);
    }

    return new Response(
      JSON.stringify({
        paid,
        status: session.payment_status,
        email: session.customer_details?.email ?? null,
        amountTotal: (session.amount_total ?? 0) / 100,
        currency: session.currency ?? "eur",
        orderId,
        items: (session.line_items?.data ?? []).map((li) => ({
          name: li.description,
          quantity: li.quantity,
          amount: (li.amount_total ?? 0) / 100,
        })),
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
