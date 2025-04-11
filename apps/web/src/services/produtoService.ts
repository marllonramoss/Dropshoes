// Definição de tipos para os produtos
export interface ImagemProduto {
  url: string;
  descricao: string;
  principal?: boolean;
}

export interface Produto {
  id: string;
  nome: string;
  marca: string;
  tamanhos: number[];
  preco: number;
  slug: string;
  imagens: ImagemProduto[];
}

export interface NovoProdutoDTO {
  nome: string;
  marca: string;
  tamanhos: number[];
  preco: number;
  imagens: ImagemProduto[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const produtoService = {
  // Listar todos os produtos
  async listarProdutos(): Promise<Produto[]> {
    const response = await fetch(`${API_URL}/produtos`);

    if (!response.ok) {
      throw new Error("Falha ao buscar produtos");
    }

    return response.json();
  },

  // Buscar produto por ID
  async buscarProdutoPorId(id: string): Promise<Produto> {
    const response = await fetch(`${API_URL}/produtos/${id}`);

    if (!response.ok) {
      throw new Error("Produto não encontrado");
    }

    return response.json();
  },

  // Criar um novo produto
  async criarProduto(produto: NovoProdutoDTO): Promise<Produto> {
    const response = await fetch(`${API_URL}/produtos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produto),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Falha ao criar produto");
    }

    return response.json();
  },

  // Atualizar um produto existente
  async atualizarProduto(
    id: string,
    produto: NovoProdutoDTO
  ): Promise<Produto> {
    const response = await fetch(`${API_URL}/produtos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produto),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Falha ao atualizar produto");
    }

    return response.json();
  },

  // Excluir um produto
  async excluirProduto(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/produtos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Falha ao excluir produto");
    }
  },
};
