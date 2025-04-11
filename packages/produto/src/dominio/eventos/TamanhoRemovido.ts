import { Evento } from "./Evento";

/**
 * Evento disparado quando um tamanho é removido de um produto
 * O tamanho é representado como um número que corresponde a um TamanhoSapato válido
 */
export class TamanhoRemovido implements Evento {
  readonly nome = "TamanhoRemovido";
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
