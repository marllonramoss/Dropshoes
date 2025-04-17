"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function HeaderMenuMobile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
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
  );
}
