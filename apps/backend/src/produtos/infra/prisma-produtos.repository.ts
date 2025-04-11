import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProdutoRepository } from '@dropshoes/produto';
import { Produto } from '@dropshoes/produto';
import { TamanhoSapato } from '@dropshoes/produto';
import { Preco } from '@dropshoes/produto';
import { ImagemProduto } from '@dropshoes/produto';
import {
  Produto as PrismaProduto,
  TamanhoProduto as PrismaTamanhoProduto,
  ImagemProduto as PrismaImagemProduto,
} from '@prisma/client';

type ProdutoCompleto = PrismaProduto & {
  tamanhos: PrismaTamanhoProduto[];
  imagens: PrismaImagemProduto[];
};

@Injectable()
export class PrismaProdutosRepository implements ProdutoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async salvar(produto: Produto): Promise<void> {
    await this.prisma.produto.upsert({
      where: { id: produto.id },
      update: {
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
      create: {
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
      },
    });
  }

  async buscarPorId(id: string): Promise<Produto | null> {
    const produtoData = await this.prisma.produto.findUnique({
      where: { id },
      include: {
        tamanhos: true,
        imagens: true,
      },
    });

    if (!produtoData) return null;

    return this.mapearProdutoDoDb(produtoData as ProdutoCompleto);
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

    return this.mapearProdutoDoDb(produtoData as ProdutoCompleto);
  }

  async listarTodos(): Promise<Produto[]> {
    const produtosData = await this.prisma.produto.findMany({
      include: {
        tamanhos: true,
        imagens: true,
      },
    });

    return produtosData.map((produtoData) =>
      this.mapearProdutoDoDb(produtoData as ProdutoCompleto),
    );
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
      this.mapearProdutoDoDb(produtoData as ProdutoCompleto),
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
      this.mapearProdutoDoDb(produtoData as ProdutoCompleto),
    );
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

  private mapearProdutoDoDb(produtoData: ProdutoCompleto): Produto {
    const tamanhos = produtoData.tamanhos.map((t) =>
      TamanhoSapato.criar(t.tamanho),
    );

    const preco = Preco.criar(produtoData.preco);

    const imagens = produtoData.imagens.map((i) => ({
      url: i.url,
      descricao: i.descricao,
      principal: i.principal,
    })) as ImagemProduto[];

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
}
