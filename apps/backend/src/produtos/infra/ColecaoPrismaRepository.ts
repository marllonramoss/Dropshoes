import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Colecao, ColecaoRepository, TipoColecao } from '@dropshoes/produto';
import { Prisma, Colecao as PrismaColecao } from '@prisma/client';

@Injectable()
export class ColecaoPrismaRepository implements ColecaoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async salvar(colecao: Colecao): Promise<void> {
    const data: Prisma.ColecaoCreateInput = {
      id: colecao.id,
      nome: colecao.nome,
      slug: colecao.slug,
    };

    await this.prisma.colecao.upsert({
      where: { id: colecao.id },
      update: data,
      create: data,
    });
  }

  async buscarPorId(id: string): Promise<Colecao | null> {
    const colecaoData = await this.prisma.colecao.findUnique({
      where: { id },
    });

    if (!colecaoData) return null;

    return this.mapToDomain(colecaoData);
  }

  async buscarPorSlug(slug: string): Promise<Colecao | null> {
    const colecaoData = await this.prisma.colecao.findUnique({
      where: { slug },
    });

    if (!colecaoData) return null;

    return this.mapToDomain(colecaoData);
  }

  async listarTodas(): Promise<Colecao[]> {
    const colecoes = await this.prisma.colecao.findMany();
    return colecoes.map(this.mapToDomain);
  }

  async listarPorTipo(tipo: TipoColecao): Promise<Colecao[]> {
    const colecoes = await this.prisma.colecao.findMany({ where: { tipo } });
    return colecoes.map(this.mapToDomain);
  }

  async remover(id: string): Promise<boolean> {
    try {
      await this.prisma.colecao.delete({
        where: { id },
      });
      return true;
    } catch {
      return false;
    }
  }

  private mapToDomain(colecaoData: PrismaColecao): Colecao {
    return new Colecao(colecaoData.id, colecaoData.nome, colecaoData.tipo as TipoColecao);
  }
}
