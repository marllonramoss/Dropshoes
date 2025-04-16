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
