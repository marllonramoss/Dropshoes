"use client";
import { createContext, useContext } from "react";
import { ColecaoDTO } from "@/services/collections";

export type ColecoesAgrupadas = Record<string, ColecaoDTO[]>;

export type CollectionsContextType = {
  colecoes: ColecaoDTO[];
  colecoesAgrupadas: ColecoesAgrupadas;
};

export const CollectionsContext = createContext<CollectionsContextType | null>(null);

export function CollectionsProvider({ colecoes, colecoesAgrupadas, children }: {
  colecoes: ColecaoDTO[];
  colecoesAgrupadas: ColecoesAgrupadas;
  children: React.ReactNode;
}) {
  return (
    <CollectionsContext.Provider value={{ colecoes, colecoesAgrupadas }}>
      {children}
    </CollectionsContext.Provider>
  );
}
