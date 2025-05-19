import { useContext } from "react";
import { CollectionsContext } from "@/contexts/collections-context";

export function useCollectionsGrouped() {
  const ctx = useContext(CollectionsContext);
  if (!ctx) throw new Error("useCollectionsGrouped must be inside CollectionsProvider");
  return ctx.colecoesAgrupadas;
}
