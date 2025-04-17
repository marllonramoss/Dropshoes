import { useContext } from "react";
import { CollectionsContext } from "@/contexts/collections-context";

export function useCollections() {
  const ctx = useContext(CollectionsContext);
  if (ctx === null) throw new Error("useCollections must be inside CollectionsProvider");
  return ctx;
}
