import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  Produto,
  GeradorDeId,
  TamanhoSapato,
  Preco,
  ImagemProduto,
} from '@dropshoes/produto';
import { ProdutoRepository } from '@dropshoes/produto';

interface ProdutoData {
  id: string;
  nome: string;
  marca: string;
  preco: number;
  slug: string;
  tamanhos: { tamanho: number }[];
  imagens: { url: string; descricao: string; principal: boolean }[];
}

@Injectable()
export class PrismaProdutoRepository implements ProdutoRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapearProdutoDoDb(produtoData: ProdutoData): Produto {
    const tamanhos = produtoData.tamanhos.map((t) =>
      TamanhoSapato.criar(t.tamanho),
    );
    const preco = Preco.criar(produtoData.preco);
    const imagens = produtoData.imagens.map((i) => ({
      url: i.url,
      descricao: i.descricao,
      principal: i.principal,
    }));

    return new Produto(
      produtoData.id,
      produtoData.nome,
      produtoData.marca,
      tamanhos,
      preco,
      produtoData.slug,
      imagens,
    );
  }

  async adicionar(produto: Produto): Promise<void> {
    const produtoData = {
      id: produto.id,
      nome: produto.nome,
      marca: produto.marca,
      preco: produto.preco.valor,
      slug: produto.slug,
      tamanhos: {
        create: produto.tamanhos.map((tamanho) => ({
          tamanho: tamanho.valor,
        })),
      },
      imagens: {
        create: produto.imagens.map((imagem) => ({
          url: imagem.url,
          descricao: imagem.descricao,
          principal: imagem.principal,
        })),
      },
    };

    await this.prisma.produto.create({
      data: produtoData,
    });
  }

  async listarTodos(): Promise<Produto[]> {
    const produtos = await this.prisma.produto.findMany({
      include: {
        tamanhos: true,
        imagens: true,
      },
    });

    return produtos.map((produto) => this.mapearProdutoDoDb(produto));
  }

  async buscarPorId(id: string): Promise<Produto | null> {
    const produto = await this.prisma.produto.findUnique({
      where: { id },
      include: {
        tamanhos: true,
        imagens: true,
      },
    });

    if (!produto) {
      return null;
    }

    return this.mapearProdutoDoDb(produto);
  }

  async editar(produto: Produto): Promise<void> {
    await this.prisma.produto.update({
      where: { id: produto.id },
      data: {
        nome: produto.nome,
        marca: produto.marca,
        preco: produto.preco.valor,
        slug: produto.slug,
        tamanhos: {
          deleteMany: {},
          create: produto.tamanhos.map((tamanho) => ({
            tamanho: tamanho.valor,
          })),
        },
        imagens: {
          deleteMany: {},
          create: produto.imagens.map((imagem) => ({
            url: imagem.url,
            descricao: imagem.descricao,
            principal: imagem.principal,
          })),
        },
      },
    });
  }

  async salvar(produto: Produto): Promise<void> {
    const produtoData = {
      id: produto.id,
      nome: produto.nome,
      marca: produto.marca,
      preco: produto.preco.valor,
      slug: produto.slug,
      tamanhos: {
        create: produto.tamanhos.map((tamanho) => ({
          tamanho: tamanho.valor,
        })),
      },
      imagens: {
        create: produto.imagens.map((imagem) => ({
          url: imagem.url,
          descricao: imagem.descricao,
          principal: imagem.principal,
        })),
      },
    };

    try {
      // Primeiro tenta atualizar
      await this.prisma.produto.update({
        where: { id: produto.id },
        data: {
          nome: produto.nome,
          marca: produto.marca,
          preco: produto.preco.valor,
          slug: produto.slug,
          tamanhos: {
            deleteMany: {},
            create: produto.tamanhos.map((tamanho) => ({
              tamanho: tamanho.valor,
            })),
          },
          imagens: {
            deleteMany: {},
            create: produto.imagens.map((imagem) => ({
              url: imagem.url,
              descricao: imagem.descricao,
              principal: imagem.principal,
            })),
          },
        },
      });
    } catch (error) {
      // Se não encontrar o produto, cria um novo
      if (error.code === 'P2025') {
        await this.prisma.produto.create({
          data: produtoData,
        });
      } else {
        throw error;
      }
    }
  }

  async buscarPorSlug(slug: string): Promise<Produto | null> {
    const produtoData = await this.prisma.produto.findUnique({
      where: { slug },
      include: {
        tamanhos: true,
        imagens: true,
      },
    });

    if (!produtoData) return null;

    return this.mapearProdutoDoDb(produtoData);
  }

  async listarPorMarca(marca: string): Promise<Produto[]> {
    const produtosData = await this.prisma.produto.findMany({
      where: { marca },
      include: {
        tamanhos: true,
        imagens: true,
      },
    });

    return produtosData.map((produtoData) =>
      this.mapearProdutoDoDb(produtoData),
    );
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
      },
    });

    return produtosData.map((produtoData) =>
      this.mapearProdutoDoDb(produtoData),
    );
  }

  async remover(id: string): Promise<boolean> {
    try {
      // Primeiro excluímos as relações
      await this.prisma.$transaction([
        this.prisma.tamanhoProduto.deleteMany({
          where: { produtoId: id },
        }),
        this.prisma.imagemProduto.deleteMany({
          where: { produtoId: id },
        }),
        this.prisma.produto.delete({
          where: { id },
        }),
      ]);
      return true;
    } catch (error) {
      console.error(`Erro ao remover produto ${id}:`, error);
      return false;
    }
  }
}
