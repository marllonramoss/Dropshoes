import { Inject, Injectable } from '@nestjs/common';
import { ListarColecoesPorTipoUseCase, TipoColecao } from '@dropshoes/produto';

@Injectable()
export class ListarColecoesPorTipoNestUseCase {
  constructor(
    @Inject(ListarColecoesPorTipoUseCase)
    private readonly useCase: ListarColecoesPorTipoUseCase
  ) {}

  async executar(tipo: TipoColecao) {
    return this.useCase.executar(tipo);
  }
}
