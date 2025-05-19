"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

// Tipos
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
}

// Criação do contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Adicionar item ao carrinho
  const addItem = (newItem: CartItem) => {
    setItems((currentItems) => {
      // Verificar se o item já existe no carrinho (mesmo id e tamanho)
      const existingItemIndex = currentItems.findIndex(
        (item) => item.id === newItem.id && item.size === newItem.size
      );

      if (existingItemIndex > -1) {
        // Item existe, atualizar quantidade
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        return updatedItems;
      } else {
        // Item novo, adicionar ao carrinho
        return [...currentItems, newItem];
      }
    });
  };

  // Remover item do carrinho
  const removeItem = (id: string, size: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => !(item.id === id && item.size === size))
    );
  };

  // Atualizar quantidade de um item
  const updateQuantity = (id: string, size: string, quantity: number) => {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id === id && item.size === size) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  // Limpar o carrinho
  const clearCart = () => {
    setItems([]);
  };

  // Calcular número total de itens
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  // Calcular valor total
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook para usar o contexto
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
