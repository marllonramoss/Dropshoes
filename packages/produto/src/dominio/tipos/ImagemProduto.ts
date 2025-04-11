/**
 * Interface que representa uma imagem de produto
 */
export interface ImagemProduto {
  url: string;
  descricao: string;
  principal: boolean;
}

/**
 * Funções utilitárias para validação de imagens
 */
export const validadorImagem = {
  /**
   * Verifica se a URL é válida
   */
  urlValida(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  },

  /**
   * Valida todos os aspectos de uma imagem
   */
  validarImagem(imagem: ImagemProduto): string | null {
    if (!imagem.url || typeof imagem.url !== "string") {
      return "URL da imagem é obrigatória";
    }

    if (!this.urlValida(imagem.url)) {
      return "URL da imagem inválida";
    }

    if (!imagem.descricao || typeof imagem.descricao !== "string") {
      return "Descrição da imagem é obrigatória";
    }

    if (imagem.descricao.length < 3) {
      return "Descrição da imagem deve ter pelo menos 3 caracteres";
    }

    return null; // Nenhum erro encontrado
  },
};
