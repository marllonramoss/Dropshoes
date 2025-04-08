import { Pedido } from "../../dominio/entidades/Pedido";
import { Id } from "../../dominio/value-objects/Id";
import { ItemPedido } from "../../dominio/value-objects/ItemPedido";
import { PedidoRepository } from "../../dominio/repositories/PedidoRepository";

export interface AdicionarItemAoPedidoDTO {
  pedidoId: string;
  produtoId: string;
  quantidade: number;
  valorUnitario: number;
}

export class AdicionarItemAoPedido {
  constructor(private pedidoRepository: PedidoRepository) {}

  async executar(dto: AdicionarItemAoPedidoDTO): Promise<Pedido> {
    const pedido = await this.pedidoRepository.buscarPorId(
      new Id(dto.pedidoId)
    );

    if (!pedido) {
      throw new Error("Pedido não encontrado");
    }

    const novoItem = new ItemPedido(
      new Id(dto.produtoId),
      dto.quantidade,
      dto.valorUnitario
    );

    // A regra de negócio (só adicionar se status === CRIADO)
    // está encapsulada dentro da entidade Pedido.
    pedido.adicionarItem(novoItem);

    await this.pedidoRepository.salvar(pedido);

    return pedido;
  }
}
