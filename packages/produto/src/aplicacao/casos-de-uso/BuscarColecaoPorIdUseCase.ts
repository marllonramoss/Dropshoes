import { ColecaoRepository } from "../../dominio/repositorios/ColecaoRepository";
import { ColecaoDTO } from "../dtos/ColecaoDTO";

export class BuscarColecaoPorId {
  constructor(private readonly colecaoRepository: ColecaoRepository) {}

  async executar(id: string): Promise<ColecaoDTO | null> {
    const colecao = await this.colecaoRepository.buscarPorId(id);

    if (!colecao) return null;

    return {
      id: colecao.id,
      nome: colecao.nome,
      slug: colecao.slug,
    };
  }
}
