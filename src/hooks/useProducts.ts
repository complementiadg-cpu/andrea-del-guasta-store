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
