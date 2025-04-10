import React from "react";
import Link from "next/link";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FeaturedCollections from "@/components/home/FeaturedCollections";

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-zinc-100 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-zinc-950 sm:text-5xl lg:text-6xl">
              Estilo e Conforto para seus Passos
            </h1>
            <p className="mt-4 text-xl text-zinc-700">
              Descubra nossa nova coleção de tênis, combinando design moderno
              com materiais sustentáveis e tecnologia de ponta.
            </p>
            <div className="mt-8 space-x-4">
              <Link
                href="/products"
                className="inline-block bg-zinc-950 text-white px-6 py-3 rounded-md hover:bg-zinc-900 transition-colors"
              >
                Comprar Agora
              </Link>
              <Link
                href="/collections"
                className="inline-block bg-white text-zinc-950 border border-zinc-200 px-6 py-3 rounded-md hover:bg-zinc-50 transition-colors"
              >
                Ver Coleções
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <FeaturedCollections />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Benefits Section */}
      <section className="bg-zinc-100 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Frete Grátis</h3>
              <p className="text-zinc-600">
                Para compras acima de R$ 299,90 em todo o Brasil.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Troca Rápida</h3>
              <p className="text-zinc-600">
                Troque ou devolva em até 30 dias sem burocracia.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Pagamento Seguro</h3>
              <p className="text-zinc-600">
                Pague com segurança usando métodos criptografados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Inscreva-se na nossa newsletter
            </h2>
            <p className="text-zinc-600 mb-6">
              Receba as últimas novidades, lançamentos e ofertas exclusivas
              diretamente na sua caixa de entrada.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu endereço de e-mail"
                className="flex-grow px-4 py-3 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="bg-zinc-950 text-white px-6 py-3 rounded-md hover:bg-zinc-900 transition-colors whitespace-nowrap"
              >
                Inscrever-se
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
