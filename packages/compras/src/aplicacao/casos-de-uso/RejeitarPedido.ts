import { Id } from "../../dominio/value-objects/Id";
import { PedidoRepository } from "../../dominio/repositories/PedidoRepository";
import { PedidoNaoEncontradoError } from "../../dominio/errors/PedidoNaoEncontradoError";
import { PedidoNaoEstaEmProcessamentoError } from "../../dominio/errors/PedidoNaoEstaEmProcessamentoError";

export class RejeitarPedido {
  constructor(private readonly pedidoRepository: PedidoRepository) {}

  async executar(pedidoId: Id): Promise<void> {
    const pedido = await this.pedidoRepository.buscarPorId(pedidoId);

    if (!pedido) {
      throw new PedidoNaoEncontradoError(pedidoId);
    }

    try {
      pedido.rejeitar();
      await this.pedidoRepository.salvar(pedido);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("em processamento")
      ) {
        throw new PedidoNaoEstaEmProcessamentoError(pedidoId);
      }
      throw error;
    }
  }
}
