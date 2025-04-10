"use client";

import React from "react";
import Link from "next/link";
import { useProducts } from "@/hooks/useProducts";
import { Collection } from "@/mocks/api";

interface CollectionCardProps {
  collection: Collection;
}

function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link href={`/collection/${collection.slug}`}>
      <div className="relative h-80 rounded-lg overflow-hidden group">
        {/* Placeholder para imagem */}
        <div className="absolute inset-0 bg-zinc-200 group-hover:scale-105 transition-transform duration-300 ease-in-out flex items-center justify-center">
          <div className="text-zinc-400 text-lg">{collection.name}</div>
        </div>

        {/* Overlay para melhor legibilidade do texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/70 to-transparent"></div>

        {/* Conteúdo */}
        <div className="absolute bottom-0 left-0 p-6 w-full">
          <h3 className="text-xl font-semibold text-white">
            {collection.name}
          </h3>
          <p className="text-zinc-200 mt-2">{collection.description}</p>
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedCollections() {
  const { featuredCollections, loading, error } = useProducts();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="h-8 w-48 bg-zinc-200 animate-pulse mx-auto rounded"></div>
          <div className="mt-4 h-4 w-64 bg-zinc-100 animate-pulse mx-auto rounded"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-80 bg-zinc-200 animate-pulse rounded-lg"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
          <p className="font-medium">Erro ao carregar coleções</p>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Nossas Coleções</h2>
        <p className="text-zinc-600 mt-2">
          Descubra estilos exclusivos em nossas coleções cuidadosamente
          selecionadas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredCollections.slice(0, 3).map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          href="/collections"
          className="inline-block bg-zinc-950 text-white px-6 py-3 rounded-md hover:bg-zinc-900 transition-colors"
        >
          Ver todas as coleções
        </Link>
      </div>
    </section>
  );
}
