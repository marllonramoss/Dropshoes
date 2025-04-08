import { Pedido } from "../../dominio/entidades/Pedido";
import { Id } from "../../dominio/value-objects/Id";
import { PedidoRepository } from "../../dominio/repositories/PedidoRepository";
import { EventDispatcher } from "../../dominio/events/EventDispatcher";

export class RealizarPedido {
  constructor(
    private pedidoRepository: PedidoRepository,
    private eventDispatcher: EventDispatcher
  ) {}

  async executar(pedidoId: string): Promise<Pedido> {
    const pedido = await this.pedidoRepository.buscarPorId(new Id(pedidoId));

    if (!pedido) {
      throw new Error("Pedido não encontrado");
    }

    pedido.realizar();
    await this.pedidoRepository.salvar(pedido);

    // Disparar os eventos acumulados
    const eventos = pedido.getEventos();
    for (const evento of eventos) {
      await this.eventDispatcher.dispatch(evento);
    }
    pedido.limparEventos();

    return pedido;
  }
}
