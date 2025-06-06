import { Id } from "../value-objects/Id";
import { ItemPedido } from "../value-objects/ItemPedido";
import { Evento } from "../events/Evento";
import { PedidoRealizado } from "../events/PedidoRealizado";
import { PedidoAprovado } from "../events/PedidoAprovado";
import { PedidoRejeitado } from "../events/PedidoRejeitado";

export class Pedido {
  private readonly id: Id;
  private readonly dataCriacao: Date;
  private status: StatusPedido;
  private readonly itens: ItemPedido[];
  private realizadoEm: Date | null;
  private eventos: Evento[] = [];

  constructor(id: Id) {
    this.id = id;
    this.dataCriacao = new Date();
    this.status = StatusPedido.CRIADO;
    this.itens = [];
    this.realizadoEm = null;
  }

  public getId(): Id {
    return this.id;
  }

  public getStatus(): StatusPedido {
    return this.status;
  }

  public getDataCriacao(): Date {
    return this.dataCriacao;
  }

  public getRealizadoEm(): Date | null {
    return this.realizadoEm;
  }

  public getItens(): ItemPedido[] {
    return [...this.itens];
  }

  public getValorTotal(): number {
    return this.itens.reduce((total, item) => total + item.getValorTotal(), 0);
  }

  public getEventos(): Evento[] {
    return [...this.eventos];
  }

  public limparEventos(): void {
    this.eventos = [];
  }

  public adicionarItem(item: ItemPedido): void {
    if (this.status !== StatusPedido.CRIADO) {
      throw new Error(
        "Não é possível adicionar itens a um pedido que não está em criação"
      );
    }
    this.itens.push(item);
  }

  public realizar(): void {
    if (this.itens.length === 0) {
      throw new Error("Não é possível realizar um pedido sem itens");
    }
    if (this.status !== StatusPedido.CRIADO) {
      throw new Error("Pedido já foi realizado");
    }
    this.status = StatusPedido.EM_PROCESSAMENTO;
    this.realizadoEm = new Date();

    // Disparar o evento de domínio
    this.eventos.push(
      new PedidoRealizado(
        this.id,
        this.getValorTotal(),
        this.itens.map((item) => ({
          produtoId: item.getProdutoId(),
          quantidade: item.getQuantidade(),
          valorUnitario: item.getValorUnitario(),
        }))
      )
    );
  }

  public aprovar(): void {
    if (this.status !== StatusPedido.EM_PROCESSAMENTO) {
      throw new Error("Só é possível aprovar um pedido em processamento");
    }
    this.status = StatusPedido.APROVADO;

    // Disparar o evento de domínio
    this.eventos.push(
      new PedidoAprovado(
        this.id,
        this.getValorTotal(),
        this.itens.map((item) => ({
          produtoId: item.getProdutoId().toString(),
          quantidade: item.getQuantidade(),
          valorUnitario: item.getValorUnitario(),
        }))
      )
    );
  }

  public rejeitar(): void {
    if (this.status !== StatusPedido.EM_PROCESSAMENTO) {
      throw new Error("Só é possível rejeitar um pedido em processamento");
    }
    this.status = StatusPedido.REJEITADO;

    // Disparar o evento de domínio
    this.eventos.push(
      new PedidoRejeitado(
        this.id,
        this.getValorTotal(),
        this.itens.map((item) => ({
          produtoId: item.getProdutoId().toString(),
          quantidade: item.getQuantidade(),
          valorUnitario: item.getValorUnitario(),
        }))
      )
    );
  }

  public toJSON() {
    return {
      id: this.id.toJSON(),
      dataCriacao: this.dataCriacao,
      status: this.status,
      itens: this.itens.map((item) => item.toJSON()),
      realizadoEm: this.realizadoEm,
      eventos: this.eventos,
    };
  }
}

export enum StatusPedido {
  CRIADO = "CRIADO",
  EM_PROCESSAMENTO = "EM_PROCESSAMENTO",
  APROVADO = "APROVADO",
  REJEITADO = "REJEITADO",
}
