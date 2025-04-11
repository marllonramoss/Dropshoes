import { Module } from '@nestjs/common';
import { ProdutosController } from './produtos.controller';
import {
  AdicionarProduto,
  ListarProdutos,
  BuscarProdutoPorId,
  EditarProduto,
  RemoverProduto,
  GeradorDeId,
} from '@dropshoes/produto';
import { PrismaProdutosRepository } from './infra/prisma-produtos.repository';
import { UuidGeradorDeId } from './infra/uuid-gerador-de-id';

export const PRODUTO_REPOSITORY = 'PRODUTO_REPOSITORY';
export const GERADOR_DE_ID = 'GERADOR_DE_ID';

@Module({
  controllers: [ProdutosController],
  providers: [
    {
      provide: PRODUTO_REPOSITORY,
      useClass: PrismaProdutosRepository,
    },
    {
      provide: GERADOR_DE_ID,
      useClass: UuidGeradorDeId,
    },
    {
      provide: ListarProdutos,
      useFactory: (produtoRepository) => new ListarProdutos(produtoRepository),
      inject: [PRODUTO_REPOSITORY],
    },
    {
      provide: AdicionarProduto,
      useFactory: (produtoRepository, geradorDeId) =>
        new AdicionarProduto(produtoRepository, geradorDeId),
      inject: [PRODUTO_REPOSITORY, GERADOR_DE_ID],
    },
    {
      provide: BuscarProdutoPorId,
      useFactory: (produtoRepository) =>
        new BuscarProdutoPorId(produtoRepository),
      inject: [PRODUTO_REPOSITORY],
    },
    {
      provide: EditarProduto,
      useFactory: (produtoRepository) => new EditarProduto(produtoRepository),
      inject: [PRODUTO_REPOSITORY],
    },
    {
      provide: RemoverProduto,
      useFactory: (produtoRepository) => new RemoverProduto(produtoRepository),
      inject: [PRODUTO_REPOSITORY],
    },
  ],
})
export class ProdutosModule {}
