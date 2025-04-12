"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";

interface EditarProdutoProps {
  params: Promise<{
    id: string;
  }>;
}

// Interface para garantir que principal seja sempre booleano
interface ImagemProdutoForm {
  url: string;
  descricao: string;
  principal: boolean;
}

interface FormData {
  nome: string;
  marca: string;
  tamanhos: number[];
  preco: number;
  imagens: ImagemProdutoForm[];
}

export default function EditarProduto({ params }: EditarProdutoProps) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    nome: "",
    marca: "",
    tamanhos: [],
    preco: 0,
    imagens: [],
  });

  const [novaImagem, setNovaImagem] = useState<ImagemProdutoForm>({
    url: "",
    descricao: "",
    principal: false,
  });

  // Carregar dados do produto
  useEffect(() => {
    const carregarProduto = async () => {
      try {
        setLoading(true);
        const produto = await api.produtos.buscarPorId(id);
        setFormData({
          nome: produto.nome,
          marca: produto.marca,
          tamanhos: produto.tamanhos,
          preco: produto.preco,
          imagens: produto.imagens.map((img) => ({
            ...img,
            principal: img.principal || false, // Garante que principal é sempre booleano
          })),
        });
        setError(null);
      } catch (err) {
        console.error("Erro ao carregar produto:", err);
        toast.error("Não foi possível carregar os dados do produto.");
        setError("Não foi possível carregar os dados do produto.");
      } finally {
        setLoading(false);
      }
    };

    carregarProduto();
  }, [id]);

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
      await api.produtos.atualizar(id, formData);
      toast.success("Produto atualizado com sucesso!");
      router.push("/admin/produtos");
    } catch (err) {
      console.error("Erro ao atualizar produto:", err);
      const message =
        err instanceof Error
          ? err.message
          : "Não foi possível atualizar o produto. Tente novamente mais tarde.";
      toast.error(message);
      setError(message);
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
      <Toaster position="top-right" />
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
            value={formData.preco || ""}
            onChange={(e) =>
              setFormData({ ...formData, preco: parseFloat(e.target.value) })
            }
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        {/* Tamanhos */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tamanhos *
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.tamanhos.map((tamanho) => (
              <span
                key={tamanho}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {tamanho}
                <button
                  type="button"
                  onClick={() => handleRemoveTamanho(tamanho)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            {Array.from({ length: 15 }, (_, i) => i + 34).map((tamanho) => (
              <button
                key={tamanho}
                type="button"
                onClick={() => handleAddTamanho(tamanho)}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  formData.tamanhos.includes(tamanho)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {tamanho}
              </button>
            ))}
          </div>
        </div>

        {/* Imagens */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Imagens
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {formData.imagens.map((imagem, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 border rounded-md"
              >
                <img
                  src={imagem.url}
                  alt={imagem.descricao}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{imagem.descricao}</p>
                  <p className="text-xs text-gray-500">{imagem.url}</p>
                  {imagem.principal && (
                    <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                      Principal
                    </span>
                  )}
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
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
            <div className="flex items-center space-x-4">
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
                <span className="text-sm">Imagem principal</span>
              </label>
              <button
                type="button"
                onClick={handleAddImagem}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Link
            href="/admin/produtos"
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
          >
            {saving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
}
