"use client";

import React from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/mocks/api";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.discount !== undefined;

  // Função para formatar preço em reais
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  // Função para adicionar ao carrinho (será implementada mais tarde com um estado global)
  const handleAddToCart = () => {
    console.log("Adicionar ao carrinho:", product);
    // TODO: Integrar com contexto de carrinho
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow group">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square mb-4 bg-zinc-100 rounded-md overflow-hidden">
          {/* Placeholder para imagem do produto */}
          <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
            {product.name}
          </div>

          {/* Badge de desconto, se aplicável */}
          {hasDiscount && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {Math.round(
                ((product.price - (product.discount || 0)) / product.price) *
                  100
              )}
              % OFF
            </div>
          )}
        </div>
      </Link>

      <Link href={`/product/${product.slug}`} className="block">
        <h3 className="text-xl font-semibold text-zinc-950 line-clamp-1">
          {product.name}
        </h3>

        <div className="text-sm text-zinc-500 mt-1 line-clamp-1">
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </div>

        <div className="mt-2 flex gap-2 items-center">
          {hasDiscount ? (
            <>
              <span className="text-lg font-bold text-zinc-950">
                {formatPrice(product.discount || 0)}
              </span>
              <span className="text-sm text-zinc-500 line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-zinc-950">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </Link>

      <div className="mt-3 flex justify-between items-center">
        <div className="flex space-x-1">
          {/* Círculos de cores disponíveis */}
          {product.colors.slice(0, 3).map((color, index) => (
            <div
              key={index}
              className="w-4 h-4 rounded-full border border-zinc-200"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}

          {/* Indicador de mais cores */}
          {product.colors.length > 3 && (
            <div className="w-4 h-4 rounded-full bg-zinc-100 flex items-center justify-center text-xs text-zinc-500">
              +{product.colors.length - 3}
            </div>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-zinc-950 text-white p-2 rounded-md hover:bg-zinc-900 transition-colors"
          aria-label={`Adicionar ${product.name} ao carrinho`}
        >
          <ShoppingCart size={18} />
        </button>
      </div>
    </div>
  );
}
