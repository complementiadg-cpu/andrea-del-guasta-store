import { supabase } from "./supabase";

// Raw row from the "Prodotti" table
export interface ProdottoRow {
  SKU: string;
  "Nome Prodotto": string | null;
  Categoria: string | null;
  "Descrizione Originale": string | null;
  "Descrizione E-commerce Estesa": string | null;
  Design: string | null;
  Materiali: string | null;
  Lunghezza: string | null;
  Chiusura: string | null;
  "Consiglio di Stile": string | null;
  "Prezzo (€)": number | string | null;
  Immagine: string | null;
}

// Normalized shape used by UI components
export interface Product {
  sku: string;
  name: string;
  category: string;
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
}

const PLACEHOLDER = "/placeholder.svg";

export const formatEuro = (value: number): string =>
  new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);

export function mapProduct(row: ProdottoRow): Product {
  const rawPrice = row["Prezzo (€)"];
  const price =
    typeof rawPrice === "number"
      ? rawPrice
      : rawPrice
      ? parseFloat(String(rawPrice).replace(/[^\d,.-]/g, "").replace(",", "."))
      : 0;

  return {
    sku: row.SKU,
    name: row["Nome Prodotto"] ?? "",
    category: row.Categoria ?? "",
    descrizioneOriginale: row["Descrizione Originale"] ?? "",
    descrizioneEstesa: row["Descrizione E-commerce Estesa"] ?? "",
    design: row.Design ?? "",
    materiali: row.Materiali ?? "",
    lunghezza: row.Lunghezza ?? "",
    chiusura: row.Chiusura ?? "",
    consiglioStile: row["Consiglio di Stile"] ?? "",
    price: isNaN(price) ? 0 : price,
    priceLabel: formatEuro(isNaN(price) ? 0 : price),
    image: row.Immagine && row.Immagine.trim() !== "" ? row.Immagine : PLACEHOLDER,
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
