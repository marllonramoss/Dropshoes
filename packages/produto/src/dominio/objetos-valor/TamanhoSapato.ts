/**
 * Objeto de valor que representa um tamanho de sapato válido
 * no mercado brasileiro.
 */
export class TamanhoSapato {
  private static readonly TAMANHOS_VALIDOS = [
    // Tamanhos adulto masculino (BR)
    37, 38, 39, 40, 41, 42, 43, 44, 45, 46,
    // Tamanhos adulto feminino (BR)
    33, 34, 35, 36, 37, 38, 39, 40,
    // Tamanhos infantil (BR)
    16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
  ];

  private constructor(private readonly _valor: number) {}

  /**
   * Cria uma nova instância de TamanhoSapato se o valor for válido
   * @param valor - O número do tamanho do sapato
   * @returns Uma instância de TamanhoSapato
   * @throws Error se o tamanho não for válido
   */
  public static criar(valor: number): TamanhoSapato {
    if (!this.ehValido(valor)) {
      throw new Error(
        `Tamanho de sapato inválido: ${valor}. Os tamanhos válidos são: ${this.TAMANHOS_VALIDOS.join(", ")}`
      );
    }
    return new TamanhoSapato(valor);
  }

  /**
   * Verifica se um tamanho de sapato é válido
   * @param valor - O número do tamanho a ser verificado
   * @returns true se o tamanho for válido, false caso contrário
   */
  public static ehValido(valor: number): boolean {
    return this.TAMANHOS_VALIDOS.includes(valor);
  }

  /**
   * Retorna todos os tamanhos válidos
   */
  public static obterTamanhosValidos(): number[] {
    return [...this.TAMANHOS_VALIDOS];
  }

  /**
   * Retorna o valor numérico do tamanho
   */
  get valor(): number {
    return this._valor;
  }

  /**
   * Verifica se este tamanho é igual a outro
   */
  public equals(outro: TamanhoSapato): boolean {
    return this._valor === outro._valor;
  }

  /**
   * Converte o tamanho para representação de string
   */
  public toString(): string {
    return `${this._valor}`;
  }

  /**
   * Converte o tamanho para representação numérica
   */
  public toNumber(): number {
    return this._valor;
  }
}
