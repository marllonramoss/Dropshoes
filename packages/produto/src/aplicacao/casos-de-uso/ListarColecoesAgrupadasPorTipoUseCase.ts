import { ColecaoRepository } from '../../dominio/repositorios/ColecaoRepository';
import { ColecaoDTO } from '../dtos/ColecaoDTO';
import { TipoColecao } from '../../dominio/entidades/Colecao';

export class ListarColecoesAgrupadasPorTipoUseCase {
  constructor(private readonly colecaoRepository: ColecaoRepository) {}

  async executar(): Promise<Record<TipoColecao, ColecaoDTO[]>> {
    const colecoes = await this.colecaoRepository.listarTodas();
    const agrupadas: Record<TipoColecao, ColecaoDTO[]> = {
      marca: [],
      genero: [],
      'faixa-etaria': [],
      geral: [],
    };
    function isTipoColecao(tipo: string): tipo is TipoColecao {
      return ["marca", "genero", "faixa-etaria", "geral"].includes(tipo);
    }
    for (const colecao of colecoes) {
      if (isTipoColecao(colecao.tipo)) {
        agrupadas[colecao.tipo].push({
          id: colecao.id,
          nome: colecao.nome,
          slug: colecao.slug,
          tipo: colecao.tipo,
        });
      }
    }
    return agrupadas;
  }
}
