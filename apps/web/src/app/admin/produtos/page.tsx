"use client";

import { useState, useEffect } from "react";
import { produtoService, Produto } from "@/services/produtoService";
import Link from "next/link";

export default function ProdutosAdmin() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar produtos ao montar o componente
  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        setLoading(true);
        const data = await produtoService.listarProdutos();
        setProdutos(data);
        setError(null);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
        setError(
          "Não foi possível carregar os produtos. Tente novamente mais tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    carregarProdutos();
  }, []);

  // Função para excluir um produto
  const handleExcluir = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await produtoService.excluirProduto(id);
        // Atualizar a lista de produtos após a exclusão
        setProdutos(produtos.filter((produto) => produto.id !== id));
      } catch (err) {
        console.error("Erro ao excluir produto:", err);
        alert(
          "Não foi possível excluir o produto. Tente novamente mais tarde."
        );
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciamento de Produtos</h1>
        <Link
          href="/admin/produtos/novo"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Novo Produto
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <p>Carregando produtos...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <p>{error}</p>
        </div>
      ) : produtos.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600">Nenhum produto cadastrado.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Imagem</th>
                <th className="py-3 px-4 text-left">Nome</th>
                <th className="py-3 px-4 text-left">Marca</th>
                <th className="py-3 px-4 text-left">Preço</th>
                <th className="py-3 px-4 text-left">Tamanhos</th>
                <th className="py-3 px-4 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto) => (
                <tr key={produto.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    {produto.imagens && produto.imagens.length > 0 ? (
                      <img
                        src={
                          produto.imagens.find((img) => img.principal)?.url ||
                          produto.imagens[0].url
                        }
                        alt={produto.nome}
                        className="w-16 h-16 object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 flex items-center justify-center">
                        <span className="text-xs text-gray-500">
                          Sem imagem
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4">{produto.nome}</td>
                  <td className="py-3 px-4">{produto.marca}</td>
                  <td className="py-3 px-4">R$ {produto.preco.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {produto.tamanhos.map((tamanho) => (
                        <span
                          key={tamanho}
                          className="inline-block bg-gray-200 rounded px-2 py-1 text-xs"
                        >
                          {tamanho}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/produtos/${produto.id}`}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleExcluir(produto.id)}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                      >
                        Excluir
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
