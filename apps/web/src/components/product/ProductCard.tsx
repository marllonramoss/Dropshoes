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
  // Função para formatar preço em reais
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  // Função para adicionar ao carrinho (será implementada mais tarde com um estado global)
  const handleAddToCart = () => {
    // TODO: Integrar com contexto de carrinho
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col min-h-[320px]">
      <div className="aspect-square relative bg-zinc-100 rounded-lg overflow-hidden">
        <img
          src={imagens && imagens.length > 0 ? imagens[0].url : "/img/no-image.png"}
          alt={nome}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="font-medium text-lg mt-2 break-words">{nome}</h3>
      <div className="mt-auto">
        <p className="text-zinc-600">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(preco)}
        </p>
        <button className="bg-zinc-950 text-white px-4 py-2 rounded-md hover:bg-zinc-900 transition-colors cursor-pointer w-full mt-4">
          Comprar
        </button>
      </div>
    </div>
  );
}
