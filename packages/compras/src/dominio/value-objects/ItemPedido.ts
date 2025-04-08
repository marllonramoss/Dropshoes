import { Id } from "./Id";

export class ItemPedido {
  private readonly produtoId: Id;
  private readonly quantidade: number;
  private readonly valorUnitario: number;

  constructor(produtoId: Id, quantidade: number, valorUnitario: number) {
    this.validarQuantidade(quantidade);
    this.validarValorUnitario(valorUnitario);

    this.produtoId = produtoId;
    this.quantidade = quantidade;
    this.valorUnitario = valorUnitario;
  }

  private validarQuantidade(quantidade: number): void {
    if (quantidade <= 0) {
      throw new Error("Quantidade deve ser maior que zero");
    }
  }

  private validarValorUnitario(valor: number): void {
    if (valor <= 0) {
      throw new Error("Valor unitário deve ser maior que zero");
    }
  }

  public getProdutoId(): Id {
    return this.produtoId;
  }

  public getQuantidade(): number {
    return this.quantidade;
  }

  public getValorUnitario(): number {
    return this.valorUnitario;
  }

  public getValorTotal(): number {
    return this.quantidade * this.valorUnitario;
  }
}
