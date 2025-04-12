"use client";

import { useState, useEffect } from "react";
import { ProdutoDTO, AdicionarProdutoDTO } from "@dropshoes/produto";
import { api } from "@/services/api";

interface UseProductsReturn {
  // Dados
  produtos: ProdutoDTO[];

  // Ações
  buscarPorId: (id: string) => Promise<ProdutoDTO>;
  buscarPorColecao: (colecaoId: string) => Promise<ProdutoDTO[]>;
  criar: (produto: AdicionarProdutoDTO) => Promise<string>;
  atualizar: (id: string, produto: Partial<ProdutoDTO>) => Promise<void>;
  excluir: (id: string) => Promise<void>;
  recarregar: () => Promise<void>;

  // Estado
  loading: boolean;
  error: Error | null;
}

export function useProducts(): UseProductsReturn {
  const [produtos, setProdutos] = useState<ProdutoDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const carregarProdutos = async () => {
    try {
      setLoading(true);
      const data = await api.produtos.listar();
      setProdutos(data);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Erro ao carregar produtos")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const buscarPorId = async (id: string) => {
    return api.produtos.buscarPorId(id);
  };

  const buscarPorColecao = async (colecaoId: string) => {
    return api.produtos.buscarPorColecao(colecaoId);
  };

  const criar = async (produto: AdicionarProdutoDTO) => {
    const id = await api.produtos.criar(produto);
    await carregarProdutos();
    return id;
  };

  const atualizar = async (id: string, produto: Partial<ProdutoDTO>) => {
    await api.produtos.atualizar(id, produto);
    await carregarProdutos();
  };

  const excluir = async (id: string) => {
    await api.produtos.excluir(id);
    await carregarProdutos();
  };

  return {
    // Dados
    produtos,

    // Ações
    buscarPorId,
    buscarPorColecao,
    criar,
    atualizar,
    excluir,
    recarregar: carregarProdutos,

    // Estado
    loading,
    error,
  };
}
