"use client";
import { Search } from "lucide-react";

export function HeaderSearchButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      className="p-2 text-gray-400 hover:text-gray-500 cursor-pointer"
      aria-label="Abrir busca"
      onClick={onClick}
    >
      <Search className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
