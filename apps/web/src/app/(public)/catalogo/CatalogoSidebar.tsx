"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const marcas = ["Nike", "Adidas", "Puma", "Vans", "New Balance"];
const tamanhos = [37, 38, 39, 40, 41, 42, 43, 44];

export function CatalogoSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Estado local para marcas selecionadas
  const [selectedMarcas, setSelectedMarcas] = React.useState<string[]>([]);
  // Estado local para preço máximo
  const [precoMax, setPrecoMax] = React.useState<number>(Number(searchParams.get("precoMax")) || 1500);

  // Sincroniza estado local com a URL ao montar (client only)
  React.useEffect(() => {
    setSelectedMarcas(searchParams.getAll("marca"));
    setPrecoMax(Number(searchParams.get("precoMax")) || 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);

  function toggleMarca(marca: string) {
    setSelectedMarcas((prev) =>
      prev.includes(marca)
        ? prev.filter((m) => m !== marca)
        : [...prev, marca]
    );
  }

  function aplicarFiltros() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("marca");
    selectedMarcas.forEach((m) => params.append("marca", m));
    // Filtro de preço
    if (precoMax && precoMax !== 1500) {
      params.set("precoMax", precoMax.toString());
    } else {
      params.delete("precoMax");
    }
    router.push(`/catalogo?${params.toString()}`);
    router.refresh();
  }

  function limparFiltros() {
    setSelectedMarcas([]);
    setPrecoMax(1500);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("marca");
    params.delete("precoMax");
    router.push(`/catalogo?${params.toString()}`);
    router.refresh();
  }

  return (
    <aside className="w-full max-w-xs bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-6 sticky top-16 mt-12">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900">Filtrar por</h2>
        <button className="text-sm text-zinc-500 hover:text-zinc-950 underline" type="button" onClick={limparFiltros}>Limpar filtros</button>
      </div>

      {/* Marca */}
      <details open className="group">
        <summary className="font-semibold text-zinc-700 cursor-pointer py-2 select-none flex items-center justify-between">
          Marca
          <span className="ml-2 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div className="flex flex-col gap-2 mt-2 pl-1">
          {marcas.map((marca) => (
            <label key={marca} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedMarcas.includes(marca)}
                onChange={() => toggleMarca(marca)}
                className="accent-zinc-950 rounded"
              />
              <span className="text-zinc-700">{marca}</span>
            </label>
          ))}
        </div>
      </details>


      {/* Preço */}
      <details open className="group">
        <summary className="font-semibold text-zinc-700 cursor-pointer py-2 select-none flex items-center justify-between">
          Preço
          <span className="ml-2 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div className="flex flex-col gap-2 mt-2 pl-1">
          <input
            type="range"
            min={100}
            max={1500}
            step={50}
            value={precoMax}
            onChange={e => setPrecoMax(Number(e.target.value))}
            className="w-full accent-zinc-950"
          />
          <div className="flex justify-between text-xs text-zinc-500">
            <span>R$100</span>
            <span>R${precoMax}+</span>
          </div>
        </div>
      </details>

      {/* Botão aplicar */}
      <button
        className="mt-2 bg-zinc-950 text-white py-2 rounded-lg hover:bg-zinc-900 transition-colors font-medium"
        type="button"
        onClick={aplicarFiltros}
        disabled={selectedMarcas.length === 0 && precoMax === 1500}
        style={selectedMarcas.length === 0 && precoMax === 1500 ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
      >
        Aplicar filtros
      </button>
    </aside>
  );
}
