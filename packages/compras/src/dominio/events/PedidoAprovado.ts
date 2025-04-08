import { Id } from "../value-objects/Id";
import { Evento } from "./Evento";

interface ItemPedido {
  produtoId: string;
  quantidade: number;
  valorUnitario: number;
}

export class PedidoAprovado implements Evento {
  public readonly nome = "PedidoAprovado";
  public readonly dataOcorrencia: Date;
  public readonly dados: {
    pedidoId: Id;
    valorTotal: number;
    itens: ItemPedido[];
  };

  constructor(pedidoId: Id, valorTotal: number, itens: ItemPedido[]) {
    this.dataOcorrencia = new Date();
    this.dados = {
      pedidoId,
      valorTotal,
      itens,
    };
  }
}
