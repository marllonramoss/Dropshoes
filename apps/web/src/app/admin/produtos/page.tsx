"use client";

import { useState, useEffect } from "react";
import { produtoService, Produto } from "@/services/produtoService";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";

export default function ProdutosAdmin() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [excluindo, setExcluindo] = useState<string | null>(null);

  const carregarProdutos = async () => {
    try {
      setLoading(true);
      const data = await produtoService.listarProdutos();
      setProdutos(data);
    } catch (err) {
      console.error("Erro ao carregar produtos:", err);
      toast.error("Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const handleExcluir = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        setExcluindo(id);
        await produtoService.excluirProduto(id);

        // Atualiza o estado local removendo o produto excluído
        setProdutos((prevProdutos) =>
          prevProdutos.filter((produto) => produto._id !== id)
        );

        toast.success("Produto excluído com sucesso!");
      } catch (err) {
        console.error("Erro ao excluir produto:", err);
        toast.error(
          err instanceof Error
            ? err.message
            : "Não foi possível excluir o produto"
        );
      } finally {
        setExcluindo(null);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-10">Carregando produtos...</div>;
  }

  return (
    <div className="p-6">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciamento de Produtos</h1>
        <Link
          href="/admin/produtos/novo"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Novo Produto
        </Link>
      </div>

      {produtos.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600">Nenhum produto cadastrado.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Marca
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preço
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tamanhos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {produtos.map((produto) => (
                <tr
                  key={produto._id}
                  className={`hover:bg-gray-50 ${excluindo === produto._id ? "opacity-50" : ""}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        {produto._imagens && produto._imagens[0] ? (
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={produto._imagens[0].url}
                            alt={produto._nome}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200" />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {produto._nome}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {produto._marca}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    R$ {(produto._preco._valor || 0).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {(produto._tamanhos || []).map((tamanho) => (
                        <span
                          key={tamanho._valor}
                          className="inline-block bg-gray-100 rounded px-2 py-1 text-xs text-gray-600"
                        >
                          {tamanho._valor}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/produtos/${produto._id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleExcluir(produto._id)}
                        disabled={excluindo === produto._id}
                        className={`text-red-600 hover:text-red-900 ${
                          excluindo === produto._id
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        {excluindo === produto._id ? "Excluindo..." : "Excluir"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
