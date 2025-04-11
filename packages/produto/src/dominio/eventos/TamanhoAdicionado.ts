import { Evento } from "./Evento";

/**
 * Evento disparado quando um novo tamanho é adicionado a um produto
 * O tamanho é representado como um número que corresponde a um TamanhoSapato válido
 */
export class TamanhoAdicionado implements Evento {
  readonly nome = "TamanhoAdicionado";
  readonly ocorridoEm: Date;
  readonly dados: {
    produtoId: string;
    tamanho: number;
  };

  constructor(produtoId: string, tamanho: number) {
    this.ocorridoEm = new Date();
    this.dados = {
      produtoId,
      tamanho,
    };
  }
}
