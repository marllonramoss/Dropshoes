import React from 'react';

export function NewsletterSection() {
  return (
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
  );
}
