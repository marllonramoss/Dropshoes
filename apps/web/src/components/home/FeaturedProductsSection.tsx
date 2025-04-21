import { getFeaturedProducts } from "@/services/products";
import Link from "next/link";

type ImagemProduto = {
  url: string;
  descricao: string;
  principal: boolean;
};

type ColecaoDTO = {
  id: string;
  nome: string;
  slug: string;
};

type Product = {
  id: string;
  nome: string;
  marca: string;
  tamanhos: number[];
  preco: number;
  slug: string;
  imagens: ImagemProduto[];
  colecoes: ColecaoDTO[];
};

import { ProductCard } from "@/components/product/ProductCard";

export async function FeaturedProductsSection() {
  const products = await getFeaturedProducts();
  const displayProducts = products.slice(0, 8);

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center text-zinc-900">
        Produtos em Destaque
      </h2>
      <p className="text-zinc-600 text-center mt-4 max-w-2xl mx-auto">
        Descubra nossa seleção especial de produtos em destaque, cuidadosamente
        escolhidos para você.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
        {displayProducts.map((product: Product) => (
          <ProductCard key={product.id} id={product.id} nome={product.nome} preco={product.preco} imagens={product.imagens} />
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Link
          href="/produtos"
          className="bg-zinc-950 text-white px-8 py-3 rounded-md hover:bg-zinc-900 transition-colors text-lg font-medium"
        >
          Ver Todos os Produtos
        </Link>
      </div>
    </section>
  );
}
