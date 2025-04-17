"use client";
import { createContext, useContext } from "react";
import { ColecaoDTO } from "@/services/collections";

export const CollectionsContext = createContext<ColecaoDTO[] | null>(null);


export function CollectionsClientProvider({ colecoes, children }: { colecoes: ColecaoDTO[]; children: React.ReactNode }) {
  return (
    <CollectionsContext.Provider value={colecoes}>
      {children}
    </CollectionsContext.Provider>
  );
}
