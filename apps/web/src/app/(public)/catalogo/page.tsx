import { getPaginatedProducts } from "@/services/products";
import { Catalogo } from "./Catalogo";
import { CatalogoSidebar } from "./CatalogoSidebar";

export default async function CatalogPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  // page e pageSize podem vir como string ou array
  const pageRaw = searchParams.page;
  const pageSizeRaw = searchParams.pageSize;
  const page = Number(Array.isArray(pageRaw) ? pageRaw[0] : pageRaw ?? 1);
  const pageSize = Number(Array.isArray(pageSizeRaw) ? pageSizeRaw[0] : pageSizeRaw ?? 12);

  // marcas pode ser string ou array
  let marcas: string[] = [];
  if (searchParams.marca) {
    marcas = Array.isArray(searchParams.marca)
      ? searchParams.marca
      : [searchParams.marca];
  }

  const { items, total } = await getPaginatedProducts(page, pageSize, marcas);

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
          <a href={`/catalogo?page=${page - 1}&pageSize=${pageSize}`} className="btn">
            Anterior
          </a>
        )}
        <span>Página {page}</span>
        {page * pageSize < total && (
          <a href={`/catalogo?page=${page + 1}&pageSize=${pageSize}`} className="btn">
            Próxima
          </a>
        )}
      </div>
    </div>
  );
}
