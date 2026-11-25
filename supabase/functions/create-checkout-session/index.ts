import Stripe from "npm:stripe@14.21.0";
import { createClient } from "npm:@supabase/supabase-js@2";

const parsePrice = (v: unknown): number => {
  if (typeof v === "number") return v;
  const c = String(v ?? "").replace(/[^\d.,-]/g, "").trim();
  return parseFloat(c.includes(",") ? c.replace(/\./g, "").replace(",", ".") : c);
};

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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const secretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!secretKey) throw new Error("STRIPE_SECRET_KEY non configurata.");

    const stripe = new Stripe(secretKey.trim(), {
      apiVersion: "2023-10-16",
      httpClient: Stripe.createFetchHttpClient(),
    });

    const body = await req.json();
    const items: Item[] = Array.isArray(body?.items) ? body.items : [];
    const shippingLabel = String(body?.shippingLabel ?? "Spedizione").slice(0, 80);
    const email = typeof body?.email === "string" ? body.email : undefined;
    const orderId = body?.orderId ?? null;
    const requested = String(body?.origin || req.headers.get("origin") || "");
    const allowed = /^https:\/\/((www\.)?andreadelguasta\.com|[a-z0-9-]+\.lovable\.app)$/i.test(requested)
      || /^http:\/\/localhost(:\d+)?$/.test(requested);
    const origin = allowed ? requested : "https://www.andreadelguasta.com";

    if (items.length === 0) {
      return new Response(JSON.stringify({ error: "Carrello vuoto." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Prezzi letti dal database: il prezzo inviato dal browser viene ignorato
    const skus = [...new Set(items.map((i) => String(i?.sku ?? "")).filter(Boolean))];
    if (skus.length !== new Set(items.map((i) => i?.sku)).size || skus.length === 0) {
      return new Response(JSON.stringify({ error: "Articolo non valido." }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: prodotti, error: dbErr } = await db
      .from("Prodotti").select('SKU, "Nome Prodotto", "Prezzo (€)"').in("SKU", skus);
    if (dbErr) throw new Error("Lettura prodotti fallita: " + dbErr.message);
    const priceMap = new Map<string, { name: string; price: number }>();
    for (const p of prodotti ?? []) {
      priceMap.set(String(p.SKU), { name: p["Nome Prodotto"] ?? "", price: parsePrice(p["Prezzo (€)"]) });
    }
    for (const i of items) {
      const real = priceMap.get(String(i.sku));
      if (!real || !Number.isFinite(real.price) || real.price <= 0) {
        return new Response(JSON.stringify({ error: "Articolo non disponibile." }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      i.price = real.price;
      i.name = real.name || i.name;
      i.quantity = Math.min(20, Math.max(1, Math.round(Number(i.quantity) || 1)));
    }
    const subtotal = items.reduce((t, i) => t + i.price * i.quantity, 0);
    // Spedizione ricalcolata: nazionale gratuita, internazionale 25 € (gratuita sopra 300 €)
    const isInternational = /internazional/i.test(shippingLabel);
    const shippingCost = isInternational && subtotal <= 300 ? 25 : 0;

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
