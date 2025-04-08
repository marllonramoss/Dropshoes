import { Id } from "../value-objects/Id";
import { Evento } from "./Evento";

interface ItemPedido {
  produtoId: string;
  quantidade: number;
  valorUnitario: number;
}

export class PedidoRejeitado implements Evento {
  public readonly nome = "PedidoRejeitado";
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
