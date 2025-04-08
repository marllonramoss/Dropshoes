import { Id } from "../value-objects/Id";

export class PedidoNaoEstaEmProcessamentoError extends Error {
  constructor(pedidoId: Id) {
    super(`Pedido com ID ${pedidoId.toString()} não está em processamento`);
    this.name = "PedidoNaoEstaEmProcessamentoError";
  }
}
