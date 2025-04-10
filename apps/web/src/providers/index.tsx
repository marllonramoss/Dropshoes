"use client";

import React from "react";
import { CartProvider } from "./cart-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
