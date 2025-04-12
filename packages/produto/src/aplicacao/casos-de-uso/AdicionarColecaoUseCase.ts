import { ColecaoRepository } from "../../dominio/repositorios/ColecaoRepository";
import { GeradorDeId } from "../../dominio/portas/GeradorDeId";
import { Colecao } from "../../dominio/entidades/Colecao";
import { AdicionarColecaoDTO } from "../dtos/ColecaoDTO";

export class AdicionarColecao {
  constructor(
    private readonly colecaoRepository: ColecaoRepository,
    private readonly geradorDeId: GeradorDeId
  ) {}

  async executar(dto: AdicionarColecaoDTO) {
    const colecao = Colecao.criar(dto.nome, this.geradorDeId);
    await this.colecaoRepository.salvar(colecao);

    return {
      id: colecao.id,
      nome: colecao.nome,
      slug: colecao.slug,
    };
  }
}
