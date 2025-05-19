import { ProdutoDTO, AdicionarProdutoDTO } from "@dropshoes/produto";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const api = {
  produtos: {
    listar: async (): Promise<ProdutoDTO[]> => {
      const response = await fetch(`${API_URL}/produtos`);
      if (!response.ok) {
        throw new Error("Falha ao buscar produtos");
      }
      return response.json();
    },

    buscarPorId: async (id: string): Promise<ProdutoDTO> => {
      const response = await fetch(`${API_URL}/produtos/${id}`);
      if (!response.ok) {
        throw new Error("Produto não encontrado");
      }
      return response.json();
    },

    buscarPorColecao: async (colecaoId: string): Promise<ProdutoDTO[]> => {
      const response = await fetch(`${API_URL}/produtos/colecao/${colecaoId}`);
      if (!response.ok) {
        throw new Error("Falha ao buscar produtos da coleção");
      }
      return response.json();
    },

    criar: async (produto: AdicionarProdutoDTO): Promise<string> => {
      const response = await fetch(`${API_URL}/produtos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(produto),
      });
      if (!response.ok) {
        throw new Error("Falha ao criar produto");
      }
      return response.text();
    },

    atualizar: async (
      id: string,
      produto: Partial<ProdutoDTO>
    ): Promise<void> => {
      const response = await fetch(`${API_URL}/produtos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(produto),
      });
      if (!response.ok) {
        throw new Error("Falha ao atualizar produto");
      }
    },

    excluir: async (id: string): Promise<void> => {
      const response = await fetch(`${API_URL}/produtos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Falha ao excluir produto");
      }
    },
  },
};
