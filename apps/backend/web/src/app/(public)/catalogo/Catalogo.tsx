import React from "react";

interface CatalogoProps {
  items: Array<{
    id: string;
    nome: string;
    preco: number;
    imagens: { url: string }[];
  }>;
}

import { ProductCard } from "@/components/product/ProductCard";

export function Catalogo({ items }: CatalogoProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          nome={product.nome}
          preco={product.preco}
          imagens={product.imagens}
        />
      ))}
    </div>
  );
}
