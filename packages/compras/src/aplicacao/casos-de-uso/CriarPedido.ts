import { Pedido } from "../../dominio/entidades/Pedido";
import { Id } from "../../dominio/value-objects/Id";
import { ItemPedido } from "../../dominio/value-objects/ItemPedido";
import { PedidoRepository } from "../../dominio/repositories/PedidoRepository";

export interface CriarPedidoDTO {
  produtoId: string;
  quantidade: number;
  valorUnitario: number;
}

export class CriarPedido {
  constructor(private pedidoRepository: PedidoRepository) {}

  async executar(dto: CriarPedidoDTO): Promise<Pedido> {
    const pedido = new Pedido(new Id(crypto.randomUUID()));

    const item = new ItemPedido(
      new Id(dto.produtoId),
      dto.quantidade,
      dto.valorUnitario
    );

    pedido.adicionarItem(item);
    await this.pedidoRepository.salvar(pedido);

    return pedido;
  }
}
