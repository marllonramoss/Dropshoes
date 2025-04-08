import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PedidoRepository } from '@dropshoes/compras';
import { Pedido } from '@dropshoes/compras';
import { Id } from '@dropshoes/compras';
import { ItemPedido } from '@dropshoes/compras';

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

    const pedido = new Pedido(new Id(pedidoData.id));
    pedidoData.itens.forEach((item) => {
      pedido.adicionarItem(
        new ItemPedido(
          new Id(item.produtoId),
          item.quantidade,
          item.valorUnitario,
        ),
      );
    });

    return pedido;
  }

  async listarTodos(): Promise<Pedido[]> {
    const pedidosData = await this.prisma.pedido.findMany({
      include: { itens: true },
    });

    return pedidosData.map((pedidoData) => {
      const pedido = new Pedido(new Id(pedidoData.id));
      pedidoData.itens.forEach((item) => {
        pedido.adicionarItem(
          new ItemPedido(
            new Id(item.produtoId),
            item.quantidade,
            item.valorUnitario,
          ),
        );
      });
      return pedido;
    });
  }
}
