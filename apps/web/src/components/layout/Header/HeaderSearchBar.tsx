"use client";
import { useState, useRef, useEffect } from "react";
import { useProductSearch } from "@/features/produto/hooks/useProductSearch";

export function HeaderSearchBar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [search, setSearch] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { data: produtos, isLoading, error } = useProductSearch(search);

  // Fecha ao clicar fora
  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: PointerEvent) {
      const wrapper = wrapperRef.current;
      if (wrapper && !event.composedPath().includes(wrapper)) {
        onClose();
      }
    }
    document.addEventListener("pointerdown", handleClickOutside, true);
    return () => document.removeEventListener("pointerdown", handleClickOutside, true);
  }, [open, onClose]);

  return (
    <div
      ref={wrapperRef}
      className={
        "absolute left-1/2 top-full z-40 transition-all duration-300 flex flex-col items-center w-[320px]" +
        (open
          ? " opacity-100 translate-y-0 pointer-events-auto"
          : " opacity-0 -translate-y-2 pointer-events-none")
      }
      style={{ transform: "translateX(-50%)", marginTop: 8 }}
    >
      <div className="bg-white shadow rounded w-[320px] flex items-center gap-2 py-2 px-3">
        <input
          type="text"
          className="input input-bordered flex-1 min-w-0 focus:outline-none"
          placeholder="Buscar produtos..."
          value={search}
          autoFocus={open}
          onChange={(e) => setSearch(e.target.value)}
          minLength={2}
        />
        <button
          className="text-gray-400 hover:text-gray-600 text-xl px-2"
          onClick={onClose}
          aria-label="Fechar busca"
          type="button"
        >
          &times;
        </button>
      </div>
      {/* Dropdown de sugestões */}
      {search.trim().length >= 2 && (
        <div className="w-full max-w-md">
          <div className="bg-white shadow rounded-b">
            {isLoading && <div className="p-2 text-sm">Buscando...</div>}
            {error && (
              <div className="p-2 text-sm text-red-700">
                Erro ao buscar produtos
              </div>
            )}
            {produtos && produtos.length > 0 && (
              <ul>
                {produtos.map((produto) => (
                  <li
                    key={produto._id}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {produto._imagens?.[0]?.url && (
                      <img
                        src={produto._imagens[0].url}
                        alt={produto._nome}
                        className="w-10 h-10 object-contain rounded"
                      />
                    )}
                    <span>
                      {produto._nome}{" "}
                      <span className="text-xs text-gray-500">
                        ({produto._marca})
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {produtos && produtos.length === 0 && !isLoading && (
              <div className="p-2 text-sm text-gray-500">
                Nenhum produto encontrado
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
