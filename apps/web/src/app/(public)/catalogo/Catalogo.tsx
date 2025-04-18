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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
      {items.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow p-4">
          <div className="aspect-square relative bg-zinc-100 rounded-lg overflow-hidden">
            <img
              src="https://media.istockphoto.com/id/2173059563/vector/coming-soon-image-on-white-background-no-photo-available.jpg?s=612x612&w=0&k=20&c=v0a_B58wPFNDPULSiw_BmPyhSNCyrP_d17i2BPPyDTk="
              alt={product.nome}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-medium text-lg mt-4">{product.nome}</h3>
          <p className="text-zinc-600 mt-2">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(product.preco)}
          </p>
          <div className="mt-4 flex justify-between items-center">
            <button className="bg-zinc-950 text-white px-4 py-2 rounded-md hover:bg-zinc-900 transition-colors cursor-pointer">
              Comprar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
