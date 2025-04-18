import React from "react";

type ImagemProduto = {
  url: string;
  descricao: string;
  principal: boolean;
};

type ProductCardProps = {
  id: string;
  nome: string;
  preco: number;
  imagens: ImagemProduto[];
};

export function ProductCard({ nome, preco, imagens }: ProductCardProps) {
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
    <div className="bg-white rounded-lg shadow p-4">
      <div className="aspect-square relative bg-zinc-100 rounded-lg overflow-hidden">
        <img
          src="https://media.istockphoto.com/id/2173059563/vector/coming-soon-image-on-white-background-no-photo-available.jpg?s=612x612&w=0&k=20&c=v0a_B58wPFNDPULSiw_BmPyhSNCyrP_d17i2BPPyDTk="
          alt={nome}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="font-medium text-lg mt-4">{nome}</h3>
      <p className="text-zinc-600 mt-2">
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(preco)}
      </p>
      <div className="mt-4 flex justify-between items-center">
        <button className="bg-zinc-950 text-white px-4 py-2 rounded-md hover:bg-zinc-900 transition-colors cursor-pointer">
          Comprar
        </button>
      </div>
    </div>
  );
}
