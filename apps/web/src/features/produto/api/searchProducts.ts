import { Produto } from "@/shared/types/produto";

export async function searchProducts(term: string): Promise<Produto[]> {
  if (!term || term.trim().length < 2) return [];
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/produtos/search?query=${encodeURIComponent(term)}`);
  if (!res.ok) throw new Error("Erro ao buscar produtos");
  return res.json();
}
