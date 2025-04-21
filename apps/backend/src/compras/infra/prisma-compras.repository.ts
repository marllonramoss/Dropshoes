import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PedidoRepository } from '@dropshoes/compras';
import { Pedido } from '@dropshoes/compras';
import { Id } from '@dropshoes/compras';
import { ItemPedido } from '@dropshoes/compras';
import {
  Pedido as PrismaPedido,
  ItemPedido as PrismaItemPedido,
} from '@prisma/client';

type PedidoComItens = PrismaPedido & {
  itens: PrismaItemPedido[];
};

@Injectable()
export class PrismaComprasRepository implements PedidoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async salvar(pedido: Pedido): Promise<void> {
    await this.prisma.pedido.upsert({
      where: { id: pedido.getId().getValor() },
      update: {
        status: pedido.getStatus(),
        realizadoEm: pedido.getRealizadoEm(),
        itens: {
          deleteMany: {},
          create: pedido.getItens().map((item) => ({
            produtoId: item.getProdutoId().getValor(),
            quantidade: item.getQuantidade(),
            valorUnitario: item.getValorUnitario(),
          })),
        },
      },
      create: {
        id: pedido.getId().getValor(),
        dataCriacao: pedido.getDataCriacao(),
        status: pedido.getStatus(),
        realizadoEm: pedido.getRealizadoEm(),
        itens: {
          create: pedido.getItens().map((item) => ({
            produtoId: item.getProdutoId().getValor(),
            quantidade: item.getQuantidade(),
            valorUnitario: item.getValorUnitario(),
          })),
        },
      },
    });
  }

  async buscarPorId(id: Id): Promise<Pedido | null> {
    const pedidoData = await this.prisma.pedido.findUnique({
      where: { id: id.getValor() },
      include: { itens: true },
    });

    if (!pedidoData) return null;

    const pedido = this.mapearPedidoDoDb(pedidoData as PedidoComItens);

    return pedido;
  }

  async listarTodos(): Promise<Pedido[]> {
    const pedidosData = await this.prisma.pedido.findMany({
      include: { itens: true },
    });

    return pedidosData.map((pedidoData) =>
      this.mapearPedidoDoDb(pedidoData as PedidoComItens),
    );
  }

  private mapearPedidoDoDb(pedidoData: PedidoComItens): Pedido {
    const pedido = new Pedido(new Id(pedidoData.id));

    for (const item of pedidoData.itens) {
      if (item.produtoId === null) {
        throw new Error('Item de pedido sem produtoId');
      }

      try {
        pedido.adicionarItem(
          new ItemPedido(
            new Id(item.produtoId),
            item.quantidade,
            item.valorUnitario,
          ),
        );
      } catch (error) {
        console.error('Erro ao adicionar item:', error);
      }
    }

    try {
      if (pedidoData.status === 'EM_PROCESSAMENTO') {
        try {
          pedido.realizar();
        } catch (e) {
          console.error('Erro ao realizar pedido:', e);
        }
      } else if (pedidoData.status === 'APROVADO') {
        try {
          pedido.realizar();
          pedido.aprovar();
        } catch (e) {
          console.error('Erro ao aprovar pedido:', e);
        }
      } else if (pedidoData.status === 'REJEITADO') {
        try {
          pedido.realizar();
          pedido.rejeitar();
        } catch (e) {
          console.error('Erro ao rejeitar pedido:', e);
        }
      }
    } catch (error) {
      console.error('Erro ao restaurar estado do pedido:', error);
    }

    return pedido;
  }
}
