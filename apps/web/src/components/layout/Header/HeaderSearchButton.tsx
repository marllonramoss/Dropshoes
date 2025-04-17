"use client";
import { Search } from "lucide-react";

export function HeaderSearchButton() {
  // Aqui você pode implementar a abertura de um modal ou drawer de busca futuramente
  return (
    <button
      type="button"
      className="p-2 text-gray-400 hover:text-gray-500"
      aria-label="Abrir busca"
      // onClick={() => ...}
    >
      <Search className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
