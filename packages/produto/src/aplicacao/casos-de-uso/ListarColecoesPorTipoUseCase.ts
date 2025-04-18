import { ColecaoRepository } from "../../dominio/repositorios/ColecaoRepository";
import { ColecaoDTO } from "../dtos/ColecaoDTO";
import { TipoColecao } from "../../dominio/entidades/Colecao";

export class ListarColecoesPorTipoUseCase {
  constructor(private readonly colecaoRepository: ColecaoRepository) {}

  async executar(tipo: TipoColecao): Promise<ColecaoDTO[]> {
    const colecoes = await this.colecaoRepository.listarPorTipo(tipo);
    return colecoes.map((colecao) => ({
      id: colecao.id,
      nome: colecao.nome,
      slug: colecao.slug,
      tipo: colecao.tipo,
    }));
  }
}
