import { Evento } from "./Evento";

/**
 * Evento disparado quando o preço de um produto é atualizado
 * Os valores do preço são representados como números,
 * embora internamente sejam manipulados como objetos Preco
 */
export class PrecoAtualizado implements Evento {
  readonly nome = "PrecoAtualizado";
  readonly ocorridoEm: Date;
  readonly dados: {
    produtoId: string;
    precoAntigo: number;
    precoNovo: number;
  };

  constructor(produtoId: string, precoAntigo: number, precoNovo: number) {
    this.ocorridoEm = new Date();
    this.dados = {
      produtoId,
      precoAntigo,
      precoNovo,
    };
  }
}
