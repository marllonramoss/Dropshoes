import { getPaginatedProducts } from "@/services/products";
import { Catalogo } from "./Catalogo";

interface CatalogPageProps {
  searchParams?: { page?: string; pageSize?: string };
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const page = Number(searchParams?.page ?? 1);
  const pageSize = Number(searchParams?.pageSize ?? 12);

  const { items, total } = await getPaginatedProducts(page, pageSize);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Catálogo</h1>
      <Catalogo items={items} />
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
