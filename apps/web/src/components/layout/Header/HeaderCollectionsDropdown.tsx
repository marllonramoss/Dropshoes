"use client";
import Link from "next/link";
import { useCollections } from "@/hooks/useCollections";

export function HeaderCollectionsDropdown() {
  const colecoes = useCollections();
  return (
    <div className="absolute left-0 top-full min-w-full bg-white shadow-lg rounded-b-md py-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-20">
      {!colecoes?.length ? (
        <span className="block px-4 py-2 text-xs text-gray-400">Nenhuma coleção</span>
      ) : (
        colecoes.map((colecao) => (
          <Link
            key={colecao.id}
            href={"/collections/" + colecao.slug}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            {colecao.nome}
          </Link>
        ))
      )}
    </div>
  );
}
