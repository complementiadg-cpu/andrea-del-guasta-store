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
 * Saves the order to the "Ordini" table. Payment card data is never stored.
 */
export const saveOrder = async (payload: OrderPayload) => {
  const { error } = await supabase.from("Ordini").insert({
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
    codice_sconto: payload.discountCode?.trim() || null,
    articoli: payload.items.map((i) => ({
      sku: i.sku,
      nome: i.name,
      categoria: i.category,
      prezzo: i.price,
      quantita: i.quantity,
      misura_personalizzata: i.customSize ?? null,
    })),
  });

  if (error) throw error;
};
