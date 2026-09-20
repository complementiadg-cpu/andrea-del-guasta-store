import { supabase } from '@/lib/supabase';
import type { CartItem } from "@/contexts/CartContext";

export interface CheckoutSessionInput {
  items: CartItem[];
  shippingCost: number;
  shippingLabel: string;
  email?: string;
  orderId?: string | null;
}

/** Creates a Stripe hosted checkout session and returns its URL. */
export const createStripeCheckout = async (input: CheckoutSessionInput): Promise<string> => {
  const { data, error } = await supabase.functions.invoke("create-checkout-session", {
    body: {
      order_id: input.orderId ?? null,
      email: input.email,
      items: input.items.map((i) => {
        const customSizeVal =
          i.customSize || (i as any).misurePersonalizzate || (i as any).misura_personalizzata || null;
        return {
          sku: i.sku || i.id,
          name: i.name,
          category: i.category,
          price: i.price,
          quantity: i.quantity,
          image: i.image,
          customSize: customSizeVal,
          misura_personalizzata: customSizeVal,
        };
      }),
      shippingCost: input.shippingCost,
      shippingLabel: input.shippingLabel,
      origin: window.location.origin,
    },
  });

  if (error) throw error;
  if (!data?.url) throw new Error(data?.error || "Sessione di pagamento non creata.");
  return data.url as string;
};

export interface ConfirmedSession {
  paid: boolean;
  status: string;
  email: string | null;
  amountTotal: number;
  currency: string;
  orderId: string | null;
  items: { name: string; quantity: number; amount: number }[];
}

/** Verifies a Stripe session and marks the matching order as paid. */
export const confirmStripeSession = async (sessionId: string): Promise<ConfirmedSession> => {
  const { data, error } = await supabase.functions.invoke("confirm-checkout-session", {
    body: { 
      session_id: sessionId,
      sessionId: sessionId 
    },
  });

  if (error) throw error;
  if (data?.error) throw new Error(data.error);

  // Riconosce sia { success: true } che { status: "paid" }
  const isPaid = Boolean(data?.success === true || data?.status === "paid" || data?.paid === true);

  return {
    paid: isPaid,
    status: data?.status || (isPaid ? "paid" : "unpaid"),
    email: data?.customerEmail || data?.customer_email || data?.email || null,
    amountTotal:
      typeof data?.amountTotal === "number"
        ? data.amountTotal
        : data?.amount_total
        ? data.amount_total / 100
        : 0,
    currency: data?.currency || "eur",
    orderId: data?.orderId || data?.order_id || sessionId,
    items: data?.items && data.items.length > 0 ? data.items : [{ name: "Ordine completato", quantity: 1, amount: 0 }],
  };
};
