import { ColecaoRepository } from "../../dominio/repositorios/ColecaoRepository";
import { EditarColecaoDTO, ColecaoDTO } from "../dtos/ColecaoDTO";
import { Colecao } from "../../dominio/entidades/Colecao";

export class EditarColecao {
  constructor(private readonly colecaoRepository: ColecaoRepository) {}

  async executar(
    id: string,
    dto: EditarColecaoDTO
  ): Promise<ColecaoDTO | null> {
    const colecao = await this.colecaoRepository.buscarPorId(id);

    if (!colecao) return null;

    // Criar nova instância com os dados atualizados
    const colecaoAtualizada = new Colecao(id, dto.nome, dto.tipo);
    await this.colecaoRepository.salvar(colecaoAtualizada);

    return {
      id: colecaoAtualizada.id,
      nome: colecaoAtualizada.nome,
      slug: colecaoAtualizada.slug,
      tipo: colecaoAtualizada.tipo,
    };
  }
}
