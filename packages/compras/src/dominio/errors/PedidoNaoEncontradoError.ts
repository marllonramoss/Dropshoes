import { Id } from "../value-objects/Id";

export class PedidoNaoEncontradoError extends Error {
  constructor(pedidoId: Id) {
    super(`Pedido com ID ${pedidoId.toString()} não encontrado`);
    this.name = "PedidoNaoEncontradoError";
  }
}
