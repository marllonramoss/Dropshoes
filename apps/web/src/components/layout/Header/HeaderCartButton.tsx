"use client";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/providers/cart-provider";

export function HeaderCartButton() {
  const { itemCount } = useCart();
  return (
    <button
      type="button"
      className="relative p-2 text-gray-400 hover:text-gray-500"
      aria-label="Abrir carrinho"
    >
      <ShoppingCart className="h-5 w-5" aria-hidden="true" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  );
}
