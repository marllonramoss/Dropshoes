import { Module } from '@nestjs/common';
import { ComprasController } from './compras.controller';
import { CriarPedido } from '@dropshoes/compras';
import { ListarPedidos } from '@dropshoes/compras';
import { BuscarPedidoPorId } from '@dropshoes/compras';
import { AdicionarItemAoPedido } from '@dropshoes/compras';
import { RealizarPedido } from '@dropshoes/compras';
import { PrismaComprasRepository } from './infra/prisma-compras.repository';
import { EventDispatcher } from './infra/event-dispatcher';

export const PEDIDO_REPOSITORY = 'PEDIDO_REPOSITORY';
export const EVENT_DISPATCHER = 'EVENT_DISPATCHER';

@Module({
  controllers: [ComprasController],
  providers: [
    {
      provide: PEDIDO_REPOSITORY,
      useClass: PrismaComprasRepository,
    },
    {
      provide: EVENT_DISPATCHER,
      useClass: EventDispatcher,
    },
    {
      provide: ListarPedidos,
      useFactory: (pedidoRepository) => new ListarPedidos(pedidoRepository),
      inject: [PEDIDO_REPOSITORY],
    },
    {
      provide: CriarPedido,
      useFactory: (pedidoRepository) => new CriarPedido(pedidoRepository),
      inject: [PEDIDO_REPOSITORY],
    },
    {
      provide: BuscarPedidoPorId,
      useFactory: (pedidoRepository) => new BuscarPedidoPorId(pedidoRepository),
      inject: [PEDIDO_REPOSITORY],
    },
    {
      provide: AdicionarItemAoPedido,
      useFactory: (pedidoRepository) =>
        new AdicionarItemAoPedido(pedidoRepository),
      inject: [PEDIDO_REPOSITORY],
    },
    {
      provide: RealizarPedido,
      useFactory: (pedidoRepository, eventDispatcher) =>
        new RealizarPedido(pedidoRepository, eventDispatcher),
      inject: [PEDIDO_REPOSITORY, EVENT_DISPATCHER],
    },
  ],
})
export class ComprasModule {}
