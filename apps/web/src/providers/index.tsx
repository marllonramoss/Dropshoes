"use client";

import React from "react";
import { CartProvider } from "./cart-provider";
import { ReactQueryProvider } from "./ReactQueryProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <CartProvider>{children}</CartProvider>
    </ReactQueryProvider>
  );
}
