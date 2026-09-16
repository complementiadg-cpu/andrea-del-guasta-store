import { supabase } from "@/lib/supabase";
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
      items: input.items.map((i) => ({
        sku: i.sku,
        name: i.name,
        category: i.category,
        price: i.price,
        quantity: i.quantity,
        image: i.image,
        customSize: i.customSize ?? null,
      })),
      shippingCost: input.shippingCost,
      shippingLabel: input.shippingLabel,
      email: input.email,
      orderId: input.orderId ?? null,
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
    body: { sessionId },
  });
  if (error) throw error;
  if (data?.error) throw new Error(data.error);
  return data as ConfirmedSession;
};
