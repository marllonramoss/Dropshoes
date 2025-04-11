"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { produtoService, NovoProdutoDTO } from "@/services/produtoService";
import Link from "next/link";

interface EditarProdutoProps {
  params: {
    id: string;
  };
}

export default function EditarProduto({ params }: EditarProdutoProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<NovoProdutoDTO>({
    nome: "",
    marca: "",
    tamanhos: [],
    preco: 0,
    imagens: [],
  });

  const [novaImagem, setNovaImagem] = useState({
    url: "",
    descricao: "",
    principal: false,
  });

  // Carregar dados do produto
  useEffect(() => {
    const carregarProduto = async () => {
      try {
        setLoading(true);
        const produto = await produtoService.buscarProdutoPorId(params.id);
        setFormData({
          nome: produto.nome,
          marca: produto.marca,
          tamanhos: produto.tamanhos,
          preco: produto.preco,
          imagens: produto.imagens,
        });
        setError(null);
      } catch (err) {
        console.error("Erro ao carregar produto:", err);
        setError("Não foi possível carregar os dados do produto.");
      } finally {
        setLoading(false);
      }
    };

    carregarProduto();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.nome ||
      !formData.marca ||
      formData.tamanhos.length === 0 ||
      formData.preco <= 0
    ) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setSaving(true);
      setError(null);
      await produtoService.atualizarProduto(params.id, formData);
      router.push("/admin/produtos");
    } catch (err) {
      console.error("Erro ao atualizar produto:", err);
      setError(
        "Não foi possível atualizar o produto. Tente novamente mais tarde."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleAddTamanho = (tamanho: number) => {
    if (!formData.tamanhos.includes(tamanho)) {
      setFormData({
        ...formData,
        tamanhos: [...formData.tamanhos, tamanho].sort((a, b) => a - b),
      });
    }
  };

  const handleRemoveTamanho = (tamanho: number) => {
    setFormData({
      ...formData,
      tamanhos: formData.tamanhos.filter((t) => t !== tamanho),
    });
  };

  const handleAddImagem = () => {
    if (novaImagem.url && novaImagem.descricao) {
      setFormData({
        ...formData,
        imagens: [...formData.imagens, novaImagem],
      });
      setNovaImagem({ url: "", descricao: "", principal: false });
    }
  };

  const handleRemoveImagem = (url: string) => {
    setFormData({
      ...formData,
      imagens: formData.imagens.filter((img) => img.url !== url),
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Carregando produto...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Editar Produto</h1>
        <Link
          href="/admin/produtos"
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Voltar
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <p>{error}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-lg shadow"
      >
        {/* Dados básicos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome *
            </label>
            <input
              type="text"
              value={formData.nome}
              onChange={(e) =>
                setFormData({ ...formData, nome: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Marca *
            </label>
            <input
              type="text"
              value={formData.marca}
              onChange={(e) =>
                setFormData({ ...formData, marca: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
        </div>

        {/* Preço */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preço *
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={formData.preco}
            onChange={(e) =>
              setFormData({ ...formData, preco: parseFloat(e.target.value) })
            }
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        {/* Tamanhos */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tamanhos *
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.tamanhos.map((tamanho) => (
              <span
                key={tamanho}
                className="inline-flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded"
              >
                {tamanho}
                <button
                  type="button"
                  onClick={() => handleRemoveTamanho(tamanho)}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <select
              onChange={(e) => handleAddTamanho(parseInt(e.target.value))}
              className="px-3 py-2 border rounded-md"
              value=""
            >
              <option value="">Selecione um tamanho</option>
              {Array.from({ length: 15 }, (_, i) => i + 34).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Imagens */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Imagens
          </label>
          <div className="space-y-4">
            {formData.imagens.map((imagem, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-2 bg-gray-50 rounded"
              >
                <img
                  src={imagem.url}
                  alt={imagem.descricao}
                  className="w-16 h-16 object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{imagem.descricao}</p>
                  <p className="text-xs text-gray-500">{imagem.url}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveImagem(imagem.url)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remover
                </button>
              </div>
            ))}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="url"
                placeholder="URL da imagem"
                value={novaImagem.url}
                onChange={(e) =>
                  setNovaImagem({ ...novaImagem, url: e.target.value })
                }
                className="px-3 py-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Descrição da imagem"
                value={novaImagem.descricao}
                onChange={(e) =>
                  setNovaImagem({ ...novaImagem, descricao: e.target.value })
                }
                className="px-3 py-2 border rounded-md"
              />
              <div className="flex items-center gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={novaImagem.principal}
                    onChange={(e) =>
                      setNovaImagem({
                        ...novaImagem,
                        principal: e.target.checked,
                      })
                    }
                    className="mr-2"
                  />
                  Principal
                </label>
                <button
                  type="button"
                  onClick={handleAddImagem}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-4">
          <Link
            href="/admin/produtos"
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {saving ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      </form>
    </div>
  );
}
