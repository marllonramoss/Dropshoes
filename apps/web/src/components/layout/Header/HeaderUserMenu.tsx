"use client";
import { User } from "lucide-react";

export function HeaderUserMenu() {
  // Aqui você pode integrar autenticação futuramente
  return (
    <button
      type="button"
      className="p-2 text-gray-400 hover:text-gray-500"
      aria-label="Abrir menu do usuário"
    >
      <User className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
