import { ColecaoRepository } from "../../dominio/repositorios/ColecaoRepository";
import { ColecaoDTO } from "../dtos/ColecaoDTO";

export class ListarColecoes {
  constructor(private readonly colecaoRepository: ColecaoRepository) {}

  async executar(): Promise<ColecaoDTO[]> {
    const colecoes = await this.colecaoRepository.listarTodas();

    return colecoes.map((colecao) => ({
      id: colecao.id,
      nome: colecao.nome,
      slug: colecao.slug,
    }));
  }
}
