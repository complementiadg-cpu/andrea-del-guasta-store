import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchProductBySku } from "@/lib/products";

export const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 60_000,
  });

export const useProduct = (sku: string | undefined) =>
  useQuery({
    queryKey: ["product", sku],
    queryFn: () => fetchProductBySku(sku as string),
    enabled: !!sku,
    staleTime: 60_000,
  });

/** Unique Categoria / Collezione values from the catalogue, for dynamic menus. */
export const useTaxonomy = () => {
  const { data: products, isLoading } = useProducts();

  const unique = (values: Array<string | undefined>) =>
    Array.from(
      new Set(values.map((v) => (v ?? "").trim()).filter((v) => v !== ""))
    ).sort((a, b) => a.localeCompare(b, "it"));

  return {
    categories: unique((products ?? []).map((p) => p.category)),
    collections: unique((products ?? []).map((p) => p.collection)),
    isLoading,
  };
};
