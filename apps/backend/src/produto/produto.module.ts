import { Module } from '@nestjs/common';
import { ProdutoController } from './produto.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaProdutoRepository } from './infra/prisma-produto.repository';
import {
  AdicionarProduto,
  BuscarProdutoPorId,
  EditarProduto,
  ListarProdutos,
  ProdutoRepository,
  GeradorDeId,
} from '@dropshoes/produto';
import { v4 as uuidv4 } from 'uuid';

const PRODUTO_REPOSITORY = 'PRODUTO_REPOSITORY';
const GERADOR_DE_ID = 'GERADOR_DE_ID';

@Module({
  imports: [PrismaModule],
  controllers: [ProdutoController],
  providers: [
    {
      provide: PRODUTO_REPOSITORY,
      useClass: PrismaProdutoRepository,
    },
    {
      provide: GERADOR_DE_ID,
      useValue: {
        gerar: () => uuidv4(),
      },
    },
    {
      provide: AdicionarProduto,
      useFactory: (
        produtoRepository: ProdutoRepository,
        geradorDeId: GeradorDeId,
      ) => {
        return new AdicionarProduto(produtoRepository, geradorDeId);
      },
      inject: [PRODUTO_REPOSITORY, GERADOR_DE_ID],
    },
    {
      provide: ListarProdutos,
      useFactory: (produtoRepository: ProdutoRepository) => {
        return new ListarProdutos(produtoRepository);
      },
      inject: [PRODUTO_REPOSITORY],
    },
    {
      provide: BuscarProdutoPorId,
      useFactory: (produtoRepository: ProdutoRepository) => {
        return new BuscarProdutoPorId(produtoRepository);
      },
      inject: [PRODUTO_REPOSITORY],
    },
    {
      provide: EditarProduto,
      useFactory: (produtoRepository: ProdutoRepository) => {
        return new EditarProduto(produtoRepository);
      },
      inject: [PRODUTO_REPOSITORY],
    },
  ],
})
export class ProdutoModule {}
