// Definição de tipos para os produtos
export interface ImagemProduto {
  url: string;
  descricao: string;
  principal?: boolean;
}

export interface TamanhoProduto {
  _valor: number;
}

export interface PrecoProduto {
  _valor: number;
}

export interface Produto {
  _id: string;
  _nome: string;
  _marca: string;
  _tamanhos: TamanhoProduto[];
  _preco: PrecoProduto;
  _slug: string;
  _imagens: ImagemProduto[];
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
    const data = await response.json();
    console.log("Retorno: ");
    console.log(data);

    if (!response.ok) {
      throw new Error("Falha ao buscar produtos");
    }

    return data;
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
    try {
      // Garantir o formato correto dos dados
      const payload = {
        nome: produto.nome,
        marca: produto.marca,
        tamanhos: produto.tamanhos,
        preco: Number(produto.preco),
        imagens: produto.imagens.map((img) => ({
          url: img.url,
          descricao: img.descricao,
          principal: Boolean(img.principal),
        })),
      };

      console.log("Enviando para API:", JSON.stringify(payload, null, 2));

      const response = await fetch(`${API_URL}/produtos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Log da resposta bruta para debug
      console.log("Status:", response.status);
      console.log("Status Text:", response.statusText);

      if (!response.ok) {
        const responseText = await response.text();
        try {
          const errorData = JSON.parse(responseText);
          if (errorData.message) {
            if (typeof errorData.message === "string") {
              throw new Error(errorData.message);
            } else if (Array.isArray(errorData.message)) {
              throw new Error(errorData.message.join(", "));
            }
          }
        } catch (parseError) {
          throw new Error(`Erro ${response.status}: ${responseText}`);
        }
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      // Se a criação foi bem sucedida (201), pega o ID retornado
      const produtoId = await response.text();
      console.log("Produto criado com ID:", produtoId);

      // Busca os detalhes completos do produto criado
      return await this.buscarProdutoPorId(produtoId);
    } catch (error) {
      // Se for um erro que nós criamos, repassa
      if (error instanceof Error) {
        throw error;
      }
      // Se for um erro de rede ou outro tipo
      console.error("Erro detalhado:", error);
      throw new Error(
        "Erro ao comunicar com o servidor. Verifique sua conexão."
      );
    }
  },

  // Atualizar um produto existente
  async atualizarProduto(
    id: string,
    produto: NovoProdutoDTO
  ): Promise<Produto> {
    try {
      // Garantir o formato correto dos dados
      const payload = {
        nome: produto.nome,
        marca: produto.marca,
        tamanhos: produto.tamanhos,
        preco: Number(produto.preco),
        imagens: produto.imagens.map((img) => ({
          url: img.url,
          descricao: img.descricao,
          principal: Boolean(img.principal),
        })),
      };

      console.log("Enviando para API:", JSON.stringify(payload, null, 2));

      const response = await fetch(`${API_URL}/produtos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Log da resposta bruta para debug
      console.log("Status:", response.status);
      console.log("Status Text:", response.statusText);

      if (!response.ok) {
        const responseText = await response.text();
        try {
          const errorData = JSON.parse(responseText);
          if (errorData.message) {
            if (typeof errorData.message === "string") {
              throw new Error(errorData.message);
            } else if (Array.isArray(errorData.message)) {
              throw new Error(errorData.message.join(", "));
            }
          }
        } catch (parseError) {
          throw new Error(`Erro ${response.status}: ${responseText}`);
        }
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      // Tenta fazer o parse do JSON apenas se houver conteúdo
      const responseText = await response.text();
      if (!responseText) {
        // Se não houver conteúdo, busca o produto atualizado
        return await this.buscarProdutoPorId(id);
      }

      try {
        return JSON.parse(responseText);
      } catch (parseError) {
        // Se não conseguir fazer o parse, busca o produto atualizado
        return await this.buscarProdutoPorId(id);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      console.error("Erro detalhado:", error);
      throw new Error(
        "Erro ao comunicar com o servidor. Verifique sua conexão."
      );
    }
  },

  // Excluir um produto
  async excluirProduto(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/produtos/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        if (data && data.message) {
          if (typeof data.message === "string") {
            throw new Error(data.message);
          } else if (Array.isArray(data.message)) {
            throw new Error(data.message.join(", "));
          }
        }
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      console.error("Erro detalhado:", error);
      throw new Error(
        "Erro ao comunicar com o servidor. Verifique sua conexão."
      );
    }
  },
};
