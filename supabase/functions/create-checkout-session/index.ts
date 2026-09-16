import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Item {
  sku: string;
  name: string;
  category?: string;
  price: number;
  quantity: number;
  image?: string;
  customSize?: string | null;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const secretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!secretKey) throw new Error("STRIPE_SECRET_KEY non configurata.");

    const stripe = new Stripe(secretKey, { apiVersion: "2023-10-16" });

    const body = await req.json();
    const items: Item[] = Array.isArray(body?.items) ? body.items : [];
    const shippingCost = Number(body?.shippingCost ?? 0);
    const shippingLabel = String(body?.shippingLabel ?? "Spedizione");
    const email = typeof body?.email === "string" ? body.email : undefined;
    const orderId = body?.orderId ?? null;
    const origin = String(body?.origin || req.headers.get("origin") || "");

    if (items.length === 0) {
      return new Response(JSON.stringify({ error: "Carrello vuoto." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    for (const i of items) {
      if (!i?.name || !Number.isFinite(Number(i.price)) || Number(i.price) <= 0) {
        return new Response(JSON.stringify({ error: "Articolo non valido." }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: items.map((i) => ({
        quantity: Math.max(1, Math.round(Number(i.quantity) || 1)),
        price_data: {
          currency: "eur",
          unit_amount: Math.round(Number(i.price) * 100),
          product_data: {
            name: i.name,
            description: [i.category, i.customSize ? `Misura: ${i.customSize}` : null]
              .filter(Boolean)
              .join(" • ") || undefined,
            images: i.image && i.image.startsWith("http") ? [i.image] : undefined,
            metadata: { sku: i.sku ?? "" },
          },
        },
      })),
      shipping_options: shippingCost > 0
        ? [{
            shipping_rate_data: {
              type: "fixed_amount",
              display_name: shippingLabel,
              fixed_amount: { amount: Math.round(shippingCost * 100), currency: "eur" },
            },
          }]
        : [{
            shipping_rate_data: {
              type: "fixed_amount",
              display_name: shippingLabel,
              fixed_amount: { amount: 0, currency: "eur" },
            },
          }],
      metadata: { order_id: orderId ? String(orderId) : "" },
      success_url: `${origin}/grazie?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/carrello`,
    });

    return new Response(JSON.stringify({ url: session.url, id: session.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Errore inatteso";
    console.error("create-checkout-session:", message);
    return new Response(JSON.stringify({ error: message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
