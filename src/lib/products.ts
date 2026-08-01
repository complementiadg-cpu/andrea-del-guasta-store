import { supabase } from "./supabase";

// Raw row from the "Prodotti" table
export interface ProdottoRow {
  SKU: string;
  "Nome Prodotto": string | null;
  Categoria: string | null;
  Collezione: string | null;
  "Descrizione Originale": string | null;
  "Descrizione E-commerce Estesa": string | null;
  Design: string | null;
  Materiali: string | null;
  Lunghezza: string | null;
  Chiusura: string | null;
  "Consiglio di Stile": string | null;
  "Prezzo (€)": number | string | null;
  "Immagine 1": string | null;
  "Immagine 2": string | null;
  "Immagine 3": string | null;
}

// Normalized shape used by UI components
export interface Product {
  sku: string;
  name: string;
  category: string;
  collection: string;
  descrizioneOriginale: string;
  descrizioneEstesa: string;
  design: string;
  materiali: string;
  lunghezza: string;
  chiusura: string;
  consiglioStile: string;
  price: number;
  priceLabel: string;
  image: string;
  images: string[];
}

const PLACEHOLDER = "/placeholder.svg";

// Categories that support a custom made-to-measure length
export const CUSTOM_SIZE_CATEGORIES = ["girocollo", "bracciale", "choker", "collana"];

// Collections that never allow a made-to-measure length
export const NO_CUSTOM_SIZE_COLLECTIONS = ["slap"];

export const supportsCustomSize = (category: string, collection = ""): boolean => {
  const col = (collection || "").trim().toLowerCase();
  if (NO_CUSTOM_SIZE_COLLECTIONS.some((c) => col.includes(c))) return false;
  const cat = (category || "").trim().toLowerCase();
  return CUSTOM_SIZE_CATEGORIES.some((c) => cat.includes(c));
};

export const formatEuro = (value: number): string =>
  new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);

export function mapProduct(row: ProdottoRow): Product {
  const rawPrice = row["Prezzo (€)"];
  const parseItalianPrice = (value: string): number => {
    // "€ 1.088,00" -> 1088.00 ; "88,00" -> 88 ; "88.5" -> 88.5
    const cleaned = value.replace(/[^\d.,-]/g, "").trim();
    const normalized = cleaned.includes(",")
      ? cleaned.replace(/\./g, "").replace(",", ".")
      : cleaned;
    return parseFloat(normalized);
  };
  const price =
    typeof rawPrice === "number"
      ? rawPrice
      : rawPrice
      ? parseItalianPrice(String(rawPrice))
      : 0;

  // "Immagine 2" is the primary shot of the gallery when available
  const images = [row["Immagine 2"], row["Immagine 1"], row["Immagine 3"]]
    .map((v) => (v ?? "").trim())
    .filter((v) => v !== "");

  return {
    sku: row.SKU,
    name: row["Nome Prodotto"] ?? "",
    category: (row.Categoria ?? "").trim(),
    collection: (row.Collezione ?? "").trim(),
    descrizioneOriginale: row["Descrizione Originale"] ?? "",
    descrizioneEstesa: row["Descrizione E-commerce Estesa"] ?? "",
    design: row.Design ?? "",
    materiali: row.Materiali ?? "",
    lunghezza: row.Lunghezza ?? "",
    chiusura: row.Chiusura ?? "",
    consiglioStile: row["Consiglio di Stile"] ?? "",
    price: isNaN(price) ? 0 : price,
    priceLabel: formatEuro(isNaN(price) ? 0 : price),
    image: images[0] ?? PLACEHOLDER,
    images: images.length > 0 ? images : [PLACEHOLDER],
  };
}

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from("Prodotti").select("*");
  if (error) throw error;
  return (data as ProdottoRow[]).map(mapProduct);
}

export async function fetchProductBySku(sku: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("Prodotti")
    .select("*")
    .eq("SKU", sku)
    .maybeSingle();
  if (error) throw error;
  return data ? mapProduct(data as ProdottoRow) : null;
}
