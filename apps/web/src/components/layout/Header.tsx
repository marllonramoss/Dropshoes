"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
          <nav className="hidden lg:flex lg:gap-x-8">
            <Link
              href="/category/men"
              className="text-sm font-medium text-gray-700 hover:text-gray-800"
            >
              Masculino
            </Link>
            <Link
              href="/category/women"
              className="text-sm font-medium text-gray-700 hover:text-gray-800"
            >
              Feminino
            </Link>
            <Link
              href="/category/kids"
              className="text-sm font-medium text-gray-700 hover:text-gray-800"
            >
              Infantil
            </Link>
            <Link
              href="/category/sport"
              className="text-sm font-medium text-gray-700 hover:text-gray-800"
            >
              Esportivo
            </Link>
            <Link
              href="/category/sales"
              className="text-sm font-medium text-red-600 hover:text-red-800"
            >
              Ofertas
            </Link>
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
            <Link
              href="/category/men"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            >
              Masculino
            </Link>
            <Link
              href="/category/women"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            >
              Feminino
            </Link>
            <Link
              href="/category/kids"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            >
              Infantil
            </Link>
            <Link
              href="/category/sport"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            >
              Esportivo
            </Link>
            <Link
              href="/category/sales"
              className="block rounded-md px-3 py-2 text-base font-medium text-red-600 hover:bg-gray-50 hover:text-red-800"
            >
              Ofertas
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
