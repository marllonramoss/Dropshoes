import { getAllCollections } from "@/services/collections";
import { getAllCollectionsGrouped } from "@/services/collections";
import { CollectionsProvider as CollectionsProviderInner } from "@/contexts/collections-context";

export const dynamic = "force-static";

export async function CollectionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const colecoes = await getAllCollections();
  const colecoesAgrupadas = await getAllCollectionsGrouped();
  return (
    <CollectionsProviderInner
      colecoes={colecoes}
      colecoesAgrupadas={colecoesAgrupadas}
    >
      {children}
    </CollectionsProviderInner>
  );
}
