"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export function HeaderMenuMobile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 lg:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span className="sr-only">Abrir menu principal</span>
        {isMenuOpen ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <Menu className="h-6 w-6" aria-hidden="true" />
        )}
      </button>
      {isMenuOpen && (
        <nav className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-start pt-24 gap-6 lg:hidden shadow-2xl">
          <button
            type="button"
            className="absolute top-6 right-6 p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Fechar menu"
            onClick={() => setIsMenuOpen(false)}
          >
            <X className="h-7 w-7" aria-hidden="true" />
          </button>
          <Link href="/catalogo" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>
            Produtos
          </Link>
          <Link href="/colecoes" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>
            Coleções
          </Link>
          <Link href="/night-shoes" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>
            Night Shoes
          </Link>
          <Link href="/ofertas" className="text-lg font-bold text-red-600" onClick={() => setIsMenuOpen(false)}>
            Ofertas
          </Link>
        </nav>
      )}
    </>
  );
}

