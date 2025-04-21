import { getPaginatedProducts } from "@/services/products";
import { Catalogo } from "./Catalogo";
import { CatalogoSidebar } from "./CatalogoSidebar";

import { type Metadata } from "next";

export default async function CatalogPage(props: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  // Next.js App Router: searchParams pode ser undefined
  const searchParams = props.searchParams ?? {};
  // page e pageSize podem vir como string ou array
  // Garantir que searchParams seja awaited (caso seja Promise)
  // (Na prática, Next já resolve, mas por segurança)
  // eslint-disable-next-line @typescript-eslint/await-thenable
  const params = typeof searchParams.then === "function" ? await searchParams : searchParams;

  const pageRaw = params.page;
  const pageSizeRaw = params.pageSize;
  const page = Number(Array.isArray(pageRaw) ? pageRaw[0] : (pageRaw ?? 1));
  const pageSize = Number(
    Array.isArray(pageSizeRaw) ? pageSizeRaw[0] : (pageSizeRaw ?? 12)
  );

  // marcas pode ser string ou array
  let marcas: string[] = [];
  if (params.marca) {
    marcas = Array.isArray(params.marca)
      ? params.marca
      : [params.marca];
  }

  // Suporte a filtro por slug de coleção
  const colecaoSlugRaw = params.colecaoSlug;
  const colecaoSlug = Array.isArray(colecaoSlugRaw)
    ? colecaoSlugRaw[0]
    : colecaoSlugRaw;

  const result = await getPaginatedProducts(page, pageSize, marcas, undefined, colecaoSlug);
  // LOG PARA DEBUG: verifique no terminal do servidor Next.js
  console.log('[CATALOGO DEBUG] params:', { page, pageSize, marcas, colecaoSlug });
  console.log('[CATALOGO DEBUG] API result:', result);
  let items: any[] = [];
  let total = 0;
  if (Array.isArray(result)) {
    items = result;
    total = result.length;
  } else if (result && Array.isArray(result.items)) {
    items = result.items;
    total = typeof result.total === "number" ? result.total : result.items.length;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Catálogo</h1>
      <div className="flex flex-row gap-8">
        {/* Sidebar moderna de filtros */}
        <div className="hidden lg:block min-w-[260px] max-w-xs">
          <CatalogoSidebar />
        </div>
        {/* Grid de produtos */}
        <div className="flex-1">
          <Catalogo items={items} />
        </div>
      </div>
      {/* Paginação */}
      <div className="flex gap-2 mt-8 justify-center">
        {page > 1 && (
          <a
            href={`/catalogo?page=${page - 1}&pageSize=${pageSize}`}
            className="btn"
          >
            Anterior
          </a>
        )}
        <span>Página {page}</span>
        {page * pageSize < total && (
          <a
            href={`/catalogo?page=${page + 1}&pageSize=${pageSize}`}
            className="btn"
          >
            Próxima
          </a>
        )}
      </div>
    </div>
  );
}
