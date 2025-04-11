/**
 * Objeto de valor que representa o preço de um produto,
 * encapsulando a validação e comportamentos relacionados.
 */
export class Preco {
  private constructor(private readonly _valor: number) {}

  /**
   * Cria uma nova instância de Preco se o valor for válido
   * @param valor - O valor do preço em reais
   * @returns Uma instância de Preco
   * @throws Error se o valor for inválido
   */
  public static criar(valor: number): Preco {
    this.validar(valor);
    return new Preco(valor);
  }

  /**
   * Valida se o valor é um preço válido
   * @param valor - O valor a ser validado
   * @throws Error se o valor for inválido
   */
  private static validar(valor: number): void {
    if (typeof valor !== "number") {
      throw new Error("Preço deve ser um número");
    }

    if (isNaN(valor)) {
      throw new Error("Preço não pode ser NaN");
    }

    if (!isFinite(valor)) {
      throw new Error("Preço deve ser um número finito");
    }

    if (valor <= 0) {
      throw new Error("Preço deve ser maior que zero");
    }

    // Limita a precisão a 2 casas decimais
    const precisaoDuasCasas = Math.round(valor * 100) / 100;
    if (precisaoDuasCasas !== valor) {
      throw new Error("Preço deve ter no máximo duas casas decimais");
    }
  }

  /**
   * Retorna o valor numérico do preço
   */
  get valor(): number {
    return this._valor;
  }

  /**
   * Adiciona um valor ao preço e retorna um novo objeto Preco
   * @param valor - O valor a ser adicionado
   * @returns Um novo objeto Preco com o valor resultante
   */
  public adicionar(valor: number): Preco {
    const novoValor = Math.round((this._valor + valor) * 100) / 100;
    return Preco.criar(novoValor);
  }

  /**
   * Subtrai um valor do preço e retorna um novo objeto Preco
   * @param valor - O valor a ser subtraído
   * @returns Um novo objeto Preco com o valor resultante
   */
  public subtrair(valor: number): Preco {
    const novoValor = Math.round((this._valor - valor) * 100) / 100;
    return Preco.criar(novoValor);
  }

  /**
   * Aplica um desconto percentual ao preço e retorna um novo objeto Preco
   * @param percentual - O percentual de desconto (0-100)
   * @returns Um novo objeto Preco com o valor após o desconto
   */
  public aplicarDesconto(percentual: number): Preco {
    if (percentual < 0 || percentual > 100) {
      throw new Error("Percentual de desconto deve estar entre 0 e 100");
    }

    const fator = 1 - percentual / 100;
    const valorComDesconto = Math.round(this._valor * fator * 100) / 100;
    return Preco.criar(valorComDesconto);
  }

  /**
   * Verifica se este preço é igual a outro
   * @param outro - O outro preço a ser comparado
   * @returns true se os preços forem iguais, false caso contrário
   */
  public equals(outro: Preco): boolean {
    return this._valor === outro._valor;
  }

  /**
   * Verifica se este preço é maior que outro
   * @param outro - O outro preço a ser comparado
   * @returns true se este preço for maior, false caso contrário
   */
  public maiorQue(outro: Preco): boolean {
    return this._valor > outro._valor;
  }

  /**
   * Verifica se este preço é menor que outro
   * @param outro - O outro preço a ser comparado
   * @returns true se este preço for menor, false caso contrário
   */
  public menorQue(outro: Preco): boolean {
    return this._valor < outro._valor;
  }

  /**
   * Formata o preço como moeda brasileira (BRL)
   * @returns String formatada (ex: "R$ 99,90")
   */
  public formatado(): string {
    return this._valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  /**
   * Converte o preço para string
   */
  public toString(): string {
    return this._valor.toString();
  }

  /**
   * Converte o preço para representação numérica
   */
  public toNumber(): number {
    return this._valor;
  }
}
