import React from 'react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative bg-cover bg-center h-screen flex items-center" style={{ backgroundImage: 'url("https://images.pexels.com/photos/8859171/pexels-photo-8859171.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")' }}>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Estilo e Conforto para seus Passos
          </h1>
          <p className="mt-4 text-xl text-zinc-100">
            Descubra nossa nova coleção de tênis, combinando design moderno
            com materiais sustentáveis e tecnologia de ponta.
          </p>
          <div className="mt-8 space-x-4 flex justify-center">
            <Link
              href="/products"
              className="inline-block bg-zinc-950 text-white px-6 py-3 rounded-md hover:bg-zinc-900 transition-colors"
            >
              Comprar Agora
            </Link>
            <Link
              href="/collections"
              className="inline-block bg-white text-zinc-950 border border-white px-6 py-3 rounded-md hover:bg-zinc-100 transition-colors"
            >
              Ver Coleções
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
