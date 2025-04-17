import { getAllCollections } from "@/services/collections";
import { CollectionsClientProvider } from "@/contexts/collections-context";

export const dynamic = "force-static";

export async function CollectionsProvider({ children }: { children: React.ReactNode }) {
  const colecoes = await getAllCollections();
  return (
    <CollectionsClientProvider colecoes={colecoes}>
      {children}
    </CollectionsClientProvider>
  );
}
