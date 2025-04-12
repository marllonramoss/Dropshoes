import { ColecaoRepository } from "../../dominio/repositorios/ColecaoRepository";

export class RemoverColecao {
  constructor(private readonly colecaoRepository: ColecaoRepository) {}

  async executar(id: string): Promise<boolean> {
    return await this.colecaoRepository.remover(id);
  }
}
