import { supabase } from "@/lib/supabase";
import type { CartItem } from "@/contexts/CartContext";

export interface OrderPayload {
  customer: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  billingAddress: Record<string, string> | null;
  shippingOption: string;
  shippingCost: number;
  subtotal: number;
  total: number;
  items: CartItem[];
  discountCode?: string;
}

/**
 * Saves the order to the "Ordini" table with status "pending".
 * Payment card data is never stored (Stripe hosted checkout handles it).
 * Returns the created order id when available.
 */
export const saveOrder = async (payload: OrderPayload): Promise<string | null> => {
  // L'ID viene generato qui: la tabella è insert-only per i visitatori,
  // quindi non è possibile rileggere la riga appena creata.
  const id = crypto.randomUUID();
  const row = {
    email: payload.customer.email.trim().toLowerCase(),
    nome: payload.customer.firstName.trim(),
    cognome: payload.customer.lastName.trim(),
    telefono: payload.customer.phone.trim(),
    indirizzo_spedizione: payload.shippingAddress,
    indirizzo_fatturazione: payload.billingAddress,
    metodo_spedizione: payload.shippingOption,
    costo_spedizione: payload.shippingCost,
    subtotale: payload.subtotal,
    totale: payload.total,
    stato: "pending",
    codice_sconto: payload.discountCode?.trim() || null,
    articoli: payload.items.map((i) => ({
      sku: i.sku,
      nome: i.name,
      categoria: i.category,
      prezzo: i.price,
      quantita: i.quantity,
      misura_personalizzata: i.customSize ?? null,
    })),
  };

  const { error } = await supabase.from("Ordini").insert({ id, ...row });
  if (!error) return id;

  // Fallback se la colonna id non accetta UUID.
  const { error: retryError } = await supabase.from("Ordini").insert(row);
  if (retryError) throw retryError;
  return null;
};
