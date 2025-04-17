"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
import { useCart } from "@/providers/cart-provider";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo & Mobile Menu Button */}
          <div className="flex items-center">
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

            <Link href="/" className="ml-4 lg:ml-0">
              <span className="sr-only">DropShoes</span>
              <div className="h-8 w-auto text-xl font-bold text-zinc-950">
                DropShoes
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-x-2 items-center">
            {/* Produtos com dropdown de marcas */}
            <div className="relative group">
              <a
                href="#"
                className="h-16 flex items-center px-4 text-sm font-medium text-gray-700"
              >
                Produtos
              </a>
              <div className="absolute left-0 top-full min-w-full bg-white shadow-lg rounded-b-md py-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-20">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Marca A
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Marca B
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Marca C
                </a>
              </div>
            </div>
            {/* Coleções com dropdown */}
            <div className="relative group">
              <a
                href="#"
                className="h-16 flex items-center px-4 text-sm font-medium text-gray-700"
              >
                Coleções
              </a>
              <div className="absolute left-0 top-full min-w-full bg-white shadow-lg rounded-b-md py-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-20">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Coleção A
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Coleção B
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Coleção C
                </a>
              </div>
            </div>
            {/* Night Shoes */}
            <a
              href="#"
              className="relative h-16 flex items-center px-4 text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-900 hover:to-black hover:shadow-lg"
              style={{ minWidth: '120px' }}
            >
              <span className="absolute top-2 right-2 text-[10px] bg-pink-600 text-white px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wide shadow-md">new</span>
              Night Shoes
            </a>
            {/* Ofertas - vermelho */}
            <a
              href="#"
              className="h-16 flex items-center px-4 text-sm font-bold text-red-600 hover:text-red-800"
            >
              Ofertas
            </a>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-gray-500"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <span className="sr-only">Pesquisar</span>
              <Search className="h-5 w-5" aria-hidden="true" />
            </button>

            <Link
              href="/account"
              className="p-2 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Conta</span>
              <User className="h-5 w-5" aria-hidden="true" />
            </Link>

            <Link href="/cart" className="group -m-2 flex items-center p-2">
              <ShoppingCart
                className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
              <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                {itemCount}
              </span>
              <span className="sr-only">itens no carrinho, ver carrinho</span>
            </Link>
          </div>
        </div>

        {/* Search panel */}
        {isSearchOpen && (
          <div className="py-4">
            <div className="relative max-w-3xl mx-auto">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                className="block w-full rounded-md border-0 py-2 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Pesquisar produtos..."
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile menu panel */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {/* Produtos com dropdown simples */}
            <div className="mb-2">
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              >
                Produtos
              </a>
              <div className="pl-4">
                <a
                  href="#"
                  className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Marca A
                </a>
                <a
                  href="#"
                  className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Marca B
                </a>
                <a
                  href="#"
                  className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Marca C
                </a>
              </div>
            </div>
            {/* Coleções com dropdown simples */}
            <div className="mb-2">
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              >
                Coleções
              </a>
              <div className="pl-4">
                <a
                  href="#"
                  className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Coleção A
                </a>
                <a
                  href="#"
                  className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Coleção B
                </a>
                <a
                  href="#"
                  className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Coleção C
                </a>
              </div>
            </div>
            {/* Night Shoes */}
            <a
              href="#"
              className="h-12 flex items-center rounded-md px-3 text-base font-medium text-gray-700 transition-colors duration-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-900 hover:to-black"
              style={{ minWidth: '120px' }}
            >
              Night Shoes
            </a>
            {/* Ofertas - vermelho */}
            <a
              href="#"
              className="block rounded-md px-3 py-2 text-base font-bold text-red-600 hover:text-red-800"
            >
              Ofertas
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
