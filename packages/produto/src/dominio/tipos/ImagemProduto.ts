/**
 * Interface que representa uma imagem de produto
 */
export interface ImagemProduto {
  url: string;
  descricao: string;
  principal: boolean;
}

/**
 * Tipos de imagem suportados
 */
export const TIPOS_IMAGEM_VALIDOS = ["jpg", "jpeg", "png", "webp"];

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
   * Verifica se a extensão da imagem é válida
   */
  extensaoValida(url: string): boolean {
    const extensao = url.split(".").pop()?.toLowerCase() || "";
    return TIPOS_IMAGEM_VALIDOS.includes(extensao);
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

    if (!this.extensaoValida(imagem.url)) {
      return `Tipo de imagem inválido. Tipos suportados: ${TIPOS_IMAGEM_VALIDOS.join(", ")}`;
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
