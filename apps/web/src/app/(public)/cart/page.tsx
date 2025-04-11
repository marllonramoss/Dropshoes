"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/providers/cart-provider";

export default function CartPage() {
  const { items, updateQuantity, removeItem, itemCount, totalPrice } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Seu carrinho
          </h1>
          <p className="mt-4 text-gray-500">Seu carrinho está vazio</p>
          <div className="mt-8">
            <Link
              href="/products"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Continuar comprando
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Seu carrinho
      </h1>
      <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <div className="lg:col-span-7">
          <ul className="divide-y divide-gray-200 border-b border-t border-gray-200">
            {items.map((item) => (
              <li key={`${item.id}-${item.size}`} className="flex py-6 sm:py-8">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  {/* Placeholder - em produção use a imagem real */}
                  <div className="h-full w-full bg-gray-300" />
                </div>

                <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="text-sm">
                        <Link
                          href={`/product/${item.id}`}
                          className="font-medium text-gray-700 hover:text-gray-800"
                        >
                          {item.name}
                        </Link>
                      </h4>
                      <p className="mt-1 text-sm text-gray-500">
                        Tamanho: {item.size}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        R$ {item.price.toFixed(2)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Remover</span>
                      <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="mt-4 flex items-center">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      className="rounded-md border border-gray-300 p-1 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Diminuir quantidade</span>
                      <Minus className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <input
                      type="text"
                      value={item.quantity}
                      readOnly
                      className="mx-2 h-8 w-12 rounded-md border border-gray-300 text-center"
                    />
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="rounded-md border border-gray-300 p-1 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Aumentar quantidade</span>
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <Link
              href="/products"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Continuar comprando
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </div>

        <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
          <h2 className="text-lg font-medium text-gray-900">
            Resumo do pedido
          </h2>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Subtotal</p>
              <p className="text-sm font-medium text-gray-900">
                R$ {totalPrice.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-600">Frete</p>
              <p className="text-sm font-medium text-gray-900">
                Calculado no checkout
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <p className="text-base font-medium text-gray-900">Total</p>
              <p className="text-base font-medium text-gray-900">
                R$ {totalPrice.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/checkout"
              className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-center text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Finalizar compra
            </Link>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              ou{" "}
              <Link
                href="/products"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Continuar comprando
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
