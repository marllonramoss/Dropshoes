import { Pedido } from "../entidades/Pedido";
import { Id } from "../value-objects/Id";

export interface PedidoRepository {
  salvar(pedido: Pedido): Promise<void>;
  buscarPorId(id: Id): Promise<Pedido | null>;
  listarTodos(): Promise<Pedido[]>;
}
