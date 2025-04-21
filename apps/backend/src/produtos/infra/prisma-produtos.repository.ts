import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Produto, ProdutoRepository, Colecao, TipoColecao } from '@dropshoes/produto';
import {
  Produto as PrismaProduto,
  TamanhoProduto as PrismaTamanhoProduto,
  ImagemProduto as PrismaImagemProduto,
  Colecao as PrismaColecao,
} from '@prisma/client';

type ProdutoColecao = {
  colecao: PrismaColecao;
};

type ProdutoCompleto = PrismaProduto & {
  tamanhos: PrismaTamanhoProduto[];
  imagens: PrismaImagemProduto[];
  colecoes: ProdutoColecao[];
};

@Injectable()
export class PrismaProdutosRepository implements ProdutoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async salvar(produto: Produto): Promise<void> {
    const tamanhos = produto.tamanhosNumericos.map((t) => ({
      tamanho: t,
    }));

    const imagens = produto.imagens.map((img) => ({
      url: img.url,
      descricao: img.descricao,
      principal: img.principal,
    }));

    // Obter os IDs das coleções do produto
    const colecaoIds = produto.colecoes.map((c) => c.id);

    await this.prisma.produto.upsert({
      where: { id: produto.id },
      update: {
        nome: produto.nome,
        marca: produto.marca,
        preco: produto.precoNumerico,
        slug: produto.slug,
        tamanhos: {
          deleteMany: {},
          create: tamanhos,
        },
        imagens: {
          deleteMany: {},
          create: imagens,
        },
        colecoes: {
          deleteMany: {},
          create: colecaoIds.map((colecaoId) => ({
            colecao: {
              connect: { id: colecaoId },
            },
          })),
        },
      },
      create: {
        id: produto.id,
        nome: produto.nome,
        marca: produto.marca,
        preco: produto.precoNumerico,
        slug: produto.slug,
        tamanhos: {
          create: tamanhos,
        },
        imagens: {
          create: imagens,
        },
        colecoes: {
          create: colecaoIds.map((colecaoId) => ({
            colecao: {
              connect: { id: colecaoId },
            },
          })),
        },
      },
    });
  }

  async buscarPorId(id: string): Promise<Produto | null> {
    const produtoData = await this.prisma.produto.findUnique({
      where: { id },
      include: {
        tamanhos: true,
        imagens: true,
        colecoes: {
          include: {
            colecao: true,
          },
        },
      },
    });

    if (!produtoData) return null;

    return this.mapToDomain(produtoData);
  }

  async buscarPorSlug(slug: string): Promise<Produto | null> {
    const produtoData = await this.prisma.produto.findUnique({
      where: { slug },
      include: {
        tamanhos: true,
        imagens: true,
        colecoes: {
          include: {
            colecao: true,
          },
        },
      },
    });

    if (!produtoData) return null;

    return this.mapToDomain(produtoData);
  }

  async listarTodos(): Promise<Produto[]> {
    const produtos = await this.prisma.produto.findMany({
      include: {
        tamanhos: true,
        imagens: true,
        colecoes: {
          include: {
            colecao: true,
          },
        },
      },
    });

    return produtos.map((produtoData) => this.mapToDomain(produtoData));
  }

  async listarPaginado(page: number, pageSize: number, marcas?: string[], precoMax?: number): Promise<{ items: Produto[]; total: number }> {
    let where: any = {};

    if (marcas && marcas.length > 0) {
      where.marca = { in: marcas };
    }
    if (precoMax !== undefined) {
      where.preco = { ...(where.preco || {}), lte: precoMax };
    }

    const [produtos, total] = await Promise.all([
      this.prisma.produto.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { nome: 'asc' },
        where,
        include: {
          tamanhos: true,
          imagens: true,
          colecoes: {
            include: { colecao: true },
          },
        },
      }),
      this.prisma.produto.count({ where }),
    ]);
    return {
      items: produtos.map((produtoData) => this.mapToDomain(produtoData)),
      total,
    };
  }

  async listarPorColecao(colecaoId: string): Promise<Produto[]> {
    const produtos = await this.prisma.produto.findMany({
      where: {
        colecoes: {
          some: {
            colecaoId,
          },
        },
      },
      include: {
        tamanhos: true,
        imagens: true,
        colecoes: {
          include: {
            colecao: true,
          },
        },
      },
    });

    return produtos.map((produtoData) => this.mapToDomain(produtoData));
  }

  async listarPorMarca(marca: string): Promise<Produto[]> {
    const produtosData = await this.prisma.produto.findMany({
      where: { marca },
      include: {
        tamanhos: true,
        imagens: true,
        colecoes: {
          include: {
            colecao: true,
          },
        },
      },
    });

    return produtosData.map((produtoData) => this.mapToDomain(produtoData));
  }

  async listarComTamanho(tamanho: number): Promise<Produto[]> {
    const produtosData = await this.prisma.produto.findMany({
      where: {
        tamanhos: {
          some: {
            tamanho,
          },
        },
      },
      include: {
        tamanhos: true,
        imagens: true,
        colecoes: {
          include: {
            colecao: true,
          },
        },
      },
    });

    return produtosData.map((produtoData) => this.mapToDomain(produtoData));
  }

  async remover(id: string): Promise<boolean> {
    try {
      await this.prisma.produto.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  private mapToDomain(data: ProdutoCompleto): Produto {
    return Produto.restaurar({
      id: data.id,
      nome: data.nome,
      marca: data.marca,
      preco: data.preco,
      slug: data.slug,
      tamanhos: data.tamanhos.map((t) => t.tamanho),
      imagens: data.imagens.map((img) => ({
        url: img.url,
        descricao: img.descricao,
        principal: img.principal,
      })),
      colecoes: data.colecoes.map(
        (pc) => new Colecao(pc.colecao.id, pc.colecao.nome, pc.colecao.tipo as TipoColecao),
      ),
    });
  }
}
