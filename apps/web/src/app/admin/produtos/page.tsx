"use client";

import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import { ConfirmationModal } from "@/components/ConfirmationModal";

export default function ProdutosAdmin() {
  const { produtos, loading, error, excluir } = useProducts();
  const [excluindo, setExcluindo] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [produtoParaExcluir, setProdutoParaExcluir] = useState<string | null>(
    null
  );

  const handleExcluir = async (id: string) => {
    setProdutoParaExcluir(id);
    setModalOpen(true);
  };

  const confirmarExclusao = async () => {
    if (!produtoParaExcluir) return;
    setModalOpen(false);

    try {
      setExcluindo(produtoParaExcluir);
      await excluir(produtoParaExcluir);
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
      setModalOpen(false);
      setProdutoParaExcluir(null);
    }
  };

  const cancelarExclusao = () => {
    setModalOpen(false);
    setProdutoParaExcluir(null);
  };

  if (loading) {
    return <div className="text-center py-10">Carregando produtos...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        Erro ao carregar produtos: {error.message}
      </div>
    );
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
                  key={produto.id}
                  className={`hover:bg-gray-50 ${excluindo === produto.id ? "opacity-50" : ""}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        {produto.imagens && produto.imagens[0] ? (
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={produto.imagens[0].url}
                            alt={produto.nome}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200" />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {produto.nome}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {produto.marca}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    R$ {produto.preco.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {produto.tamanhos.map((tamanho) => (
                        <span
                          key={tamanho}
                          className="inline-block bg-gray-100 rounded px-2 py-1 text-xs text-gray-600"
                        >
                          {tamanho}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/produtos/${produto.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleExcluir(produto.id)}
                        disabled={excluindo === produto.id}
                        className={`text-red-600 hover:text-red-900 ${
                          excluindo === produto.id
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        {excluindo === produto.id ? "Excluindo..." : "Excluir"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmationModal
        isOpen={modalOpen}
        onClose={cancelarExclusao}
        onConfirm={confirmarExclusao}
        title="Excluir Produto"
        message="Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
      />
    </div>
  );
}
