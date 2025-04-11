/**
 * Interface para geração de IDs únicos
 */
export interface GeradorDeId {
  /**
   * Gera um ID único
   * @returns ID único gerado
   */
  gerar(): string;
}
