"use client";
import Link from "next/link";
import { useCollectionsGrouped } from "@/hooks/useCollectionsGrouped";

export function HeaderCollectionsDropdown() {
  const data = useCollectionsGrouped();
  const tiposOrdem = ["marca", "genero", "faixa-etaria", "geral"];
  return (
    <div className="absolute left-1/2 top-full min-w-max bg-white shadow-lg rounded-b-md py-4 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-20 -translate-x-1/2">
      <div className="flex flex-row gap-8 px-6">
        {tiposOrdem.map(
          (tipo) =>
            data[tipo]?.length > 0 && (
              <div key={tipo} className="min-w-[150px] flex flex-col">
                <div className="mb-2 text-xs font-bold text-gray-500 uppercase tracking-wider text-center border-b border-gray-100 pb-1">
                  {tipo}
                </div>
                {data[tipo].map((colecao) => (
                  <Link
                    key={colecao.id}
                    href={
                      tipo === "marca"
                        ? `/catalogo?marca=${encodeURIComponent(colecao.nome)}`
                        : `/catalogo?colecaoSlug=${encodeURIComponent(colecao.slug)}`
                    }
                    className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded text-center"
                  >
                    {colecao.nome}
                  </Link>
                ))}
              </div>
            )
        )}
      </div>
    </div>
  );
}
