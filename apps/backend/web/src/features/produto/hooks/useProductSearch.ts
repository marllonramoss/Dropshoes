import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../api/searchProducts";

export function useProductSearch(term: string) {
  return useQuery({
    queryKey: ["product-search", term],
    queryFn: () => searchProducts(term),
    enabled: !!term && term.trim().length >= 2,
    staleTime: 1000 * 60, // 1 min
  });
}
