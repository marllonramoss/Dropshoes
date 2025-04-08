import { Pedido } from "../../dominio/entidades/Pedido";
import { PedidoRepository } from "../../dominio/repositories/PedidoRepository";
import { Id } from "../../dominio/value-objects/Id";

export class BuscarPedidoPorId {
  constructor(private pedidoRepository: PedidoRepository) {}

  async executar(id: string): Promise<Pedido | null> {
    return this.pedidoRepository.buscarPorId(new Id(id));
  }
}
