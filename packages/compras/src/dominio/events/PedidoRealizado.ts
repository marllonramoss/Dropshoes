import { Evento } from "./Evento";
import { Id } from "../value-objects/Id";

export class PedidoRealizado implements Evento {
  readonly nome = "PedidoRealizado";
  readonly dataOcorrencia: Date;
  readonly dados: {
    pedidoId: string;
    valorTotal: number;
    itens: Array<{
      produtoId: string;
      quantidade: number;
      valorUnitario: number;
    }>;
  };

  constructor(
    pedidoId: Id,
    valorTotal: number,
    itens: Array<{ produtoId: Id; quantidade: number; valorUnitario: number }>
  ) {
    this.dataOcorrencia = new Date();
    this.dados = {
      pedidoId: pedidoId.getValor(),
      valorTotal,
      itens: itens.map((item) => ({
        produtoId: item.produtoId.getValor(),
        quantidade: item.quantidade,
        valorUnitario: item.valorUnitario,
      })),
    };
  }
}
