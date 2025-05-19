"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProducts } from "@/hooks/useProducts";
import { AdicionarProdutoDTO } from "@dropshoes/produto";
import Link from "next/link";
import Image from "next/image";
import { toast, Toaster } from "react-hot-toast";

export default function NovoProduto() {
  const router = useRouter();
  const { criar } = useProducts();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<AdicionarProdutoDTO>({
    nome: "",
    marca: "",
    tamanhos: [],
    preco: 0,
    imagens: [],
    colecaoIds: [],
  });

  const [novaImagem, setNovaImagem] = useState({
    url: "",
    descricao: "",
    principal: false,
  });

  const validarUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações básicas
    if (
      !formData.nome ||
      !formData.marca ||
      formData.tamanhos.length === 0 ||
      formData.preco <= 0 ||
      formData.imagens.length === 0
    ) {
      const errorMessage = !formData.imagens.length
        ? "É necessário adicionar pelo menos uma imagem para o produto."
        : "Por favor, preencha todos os campos obrigatórios.";
      toast.error(errorMessage);
      setError(errorMessage);
      return;
    }

    // Validar se há pelo menos uma imagem principal
    const temImagemPrincipal = formData.imagens.some((img) => img.principal);
    if (!temImagemPrincipal) {
      const errorMessage =
        "É necessário definir uma imagem principal para o produto.";
      toast.error(errorMessage);
      setError(errorMessage);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await criar(formData);
      toast.success("Produto criado com sucesso!");
      router.push("/admin/produtos");
    } catch (error) {
      console.error("Erro ao criar produto:", error);

      // Tratamento específico para erros conhecidos
      if (error instanceof Error) {
        const errorMessage = error.message;
        toast.error(errorMessage);
        setError(errorMessage);
      } else {
        const errorMessage =
          "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.";
        toast.error(errorMessage);
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
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
    // Validar URL
    if (!novaImagem.url || !validarUrl(novaImagem.url)) {
      setError("Por favor, insira uma URL válida para a imagem");
      return;
    }

    // Validar descrição
    if (!novaImagem.descricao || novaImagem.descricao.length < 3) {
      setError("A descrição da imagem deve ter pelo menos 3 caracteres");
      return;
    }

    // Se não houver imagens ainda, definir esta como principal
    const isFirstImage = formData.imagens.length === 0;
    const newImage = {
      ...novaImagem,
      principal: isFirstImage ? true : novaImagem.principal,
    };

    // Se esta imagem for marcada como principal, remover principal das outras
    const updatedImages = formData.imagens.map((img) => ({
      ...img,
      principal: newImage.principal ? false : img.principal,
    }));

    setFormData({
      ...formData,
      imagens: [...updatedImages, newImage],
    });
    setNovaImagem({ url: "", descricao: "", principal: false });
    setError(null);
  };

  const handleRemoveImagem = (url: string) => {
    setFormData({
      ...formData,
      imagens: formData.imagens.filter((img) => img.url !== url),
    });
  };

  return (
    <div>
      <Toaster position="top-right" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Novo Produto</h1>
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
              setFormData({
                ...formData,
                preco: e.target.value ? parseFloat(e.target.value) : 0,
              })
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
            Imagens *
          </label>
          <div className="space-y-4">
            {formData.imagens.map((imagem, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-2 bg-gray-50 rounded"
              >
                <div className="relative w-16 h-16">
                  <Image
                    src={imagem.url}
                    alt={imagem.descricao}
                    className="object-cover"
                    fill
                    sizes="64px"
                  />
                </div>
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
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Salvando..." : "Salvar Produto"}
          </button>
        </div>
      </form>
    </div>
  );
}
