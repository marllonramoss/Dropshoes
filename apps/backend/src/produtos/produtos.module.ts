import { Module } from '@nestjs/common';
import { ProdutosController } from './produtos.controller';
import { ColecoesController } from './colecoes.controller';
import { ListarColecoesPorTipoUseCase, ListarColecoesAgrupadasPorTipoUseCase } from '@dropshoes/produto';
import {
  AdicionarProduto,
  ListarProdutos,
  BuscarProdutoPorId,
  EditarProduto,
  RemoverProduto,
  GeradorDeId,
  AdicionarColecao,
  ListarColecoes,
  BuscarColecaoPorId,
  EditarColecao,
  RemoverColecao,
  ColecaoRepository,
  AdicionarColecaoAoProdutoUseCase,
  ListarProdutosPorColecao,
} from '@dropshoes/produto';
import { PrismaProdutosRepository } from './infra/prisma-produtos.repository';
import { ColecaoPrismaRepository } from './infra/ColecaoPrismaRepository';
import { UuidGeradorDeId } from './infra/uuid-gerador-de-id';

export const PRODUTO_REPOSITORY = 'PRODUTO_REPOSITORY';
export const COLECAO_REPOSITORY = 'COLECAO_REPOSITORY';
export const GERADOR_DE_ID = 'GERADOR_DE_ID';

@Module({
  controllers: [ProdutosController, ColecoesController],
  providers: [
    {
      provide: PRODUTO_REPOSITORY,
      useClass: PrismaProdutosRepository,
    },
    {
      provide: COLECAO_REPOSITORY,
      useClass: ColecaoPrismaRepository,
    },
    {
      provide: GERADOR_DE_ID,
      useClass: UuidGeradorDeId,
    },
    // Produtos use cases
    {
      provide: ListarProdutos,
      useFactory: (produtoRepository) => new ListarProdutos(produtoRepository),
      inject: [PRODUTO_REPOSITORY],
    },
    {
      provide: ListarProdutosPorColecao,
      useFactory: (produtoRepository) =>
        new ListarProdutosPorColecao(produtoRepository),
      inject: [PRODUTO_REPOSITORY],
    },
    {
      provide: AdicionarProduto,
      useFactory: (produtoRepository, colecaoRepository, geradorDeId) =>
        new AdicionarProduto(produtoRepository, colecaoRepository, geradorDeId),
      inject: [PRODUTO_REPOSITORY, COLECAO_REPOSITORY, GERADOR_DE_ID],
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
    // Coleções use cases
    {
      provide: ListarColecoes,
      useFactory: (colecaoRepository) => new ListarColecoes(colecaoRepository),
      inject: [COLECAO_REPOSITORY],
    },
    {
      provide: ListarColecoesPorTipoUseCase,
      useFactory: (colecaoRepository) =>
        new ListarColecoesPorTipoUseCase(colecaoRepository),
      inject: [COLECAO_REPOSITORY],
    },
    {
      provide: ListarColecoesAgrupadasPorTipoUseCase,
      useFactory: (colecaoRepository) =>
        new ListarColecoesAgrupadasPorTipoUseCase(colecaoRepository),
      inject: [COLECAO_REPOSITORY],
    },
    {
      provide: AdicionarColecao,
      useFactory: (colecaoRepository, geradorDeId) =>
        new AdicionarColecao(colecaoRepository, geradorDeId),
      inject: [COLECAO_REPOSITORY, GERADOR_DE_ID],
    },
    {
      provide: BuscarColecaoPorId,
      useFactory: (colecaoRepository) =>
        new BuscarColecaoPorId(colecaoRepository),
      inject: [COLECAO_REPOSITORY],
    },
    {
      provide: EditarColecao,
      useFactory: (colecaoRepository) => new EditarColecao(colecaoRepository),
      inject: [COLECAO_REPOSITORY],
    },
    {
      provide: RemoverColecao,
      useFactory: (colecaoRepository) => new RemoverColecao(colecaoRepository),
      inject: [COLECAO_REPOSITORY],
    },
    {
      provide: AdicionarColecaoAoProdutoUseCase,
      useFactory: (produtoRepository, colecaoRepository) =>
        new AdicionarColecaoAoProdutoUseCase(
          produtoRepository,
          colecaoRepository,
        ),
      inject: [PRODUTO_REPOSITORY, COLECAO_REPOSITORY],
    },
  ],
})
export class ProdutosModule {}
