"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "../product/ProductCard";

export default function FeaturedProducts() {
  const { featuredProducts, loading, error } = useProducts();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="h-8 w-48 bg-zinc-200 animate-pulse mx-auto rounded"></div>
          <div className="mt-4 h-4 w-64 bg-zinc-100 animate-pulse mx-auto rounded"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-4">
                <div className="aspect-square bg-zinc-100 rounded-md animate-pulse"></div>
                <div className="h-6 bg-zinc-200 rounded mt-4 w-3/4 animate-pulse"></div>
                <div className="h-4 bg-zinc-100 rounded mt-2 w-full animate-pulse"></div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="h-6 bg-zinc-200 rounded w-1/4 animate-pulse"></div>
                  <div className="h-10 w-10 bg-zinc-800 rounded-md animate-pulse"></div>
                </div>
              </div>
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
          <p className="font-medium">Erro ao carregar produtos</p>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  // Limitar a 8 produtos em destaque
  const displayProducts = featuredProducts.slice(0, 8);

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Produtos em Destaque</h2>
        <p className="text-zinc-600 mt-2">
          Confira nossa seleção de produtos mais populares e exclusivos
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          href="/products"
          className="inline-flex items-center text-zinc-900 hover:text-zinc-600 font-medium"
        >
          Ver todos os produtos
          <ChevronRight size={16} className="ml-1" />
        </Link>
      </div>
    </section>
  );
}
