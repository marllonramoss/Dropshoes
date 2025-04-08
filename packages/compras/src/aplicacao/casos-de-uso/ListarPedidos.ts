import { Pedido } from "../../dominio/entidades/Pedido";
import { PedidoRepository } from "../../dominio/repositories/PedidoRepository";

export class ListarPedidos {
  constructor(private pedidoRepository: PedidoRepository) {}

  async executar(): Promise<Pedido[]> {
    return this.pedidoRepository.listarTodos();
  }
}
