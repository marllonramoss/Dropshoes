import { Evento } from "./Evento";

/**
 * Evento disparado quando um novo produto é criado
 * O preço é representado como número, embora internamente
 * seja manipulado como objeto Preco
 */
export class ProdutoCriado implements Evento {
  readonly nome = "ProdutoCriado";
  readonly ocorridoEm: Date;
  readonly dados: {
    produtoId: string;
    nome: string;
    marca: string;
    preco: number;
    imagemPrincipalUrl?: string;
  };

  constructor(
    produtoId: string,
    nome: string,
    marca: string,
    preco: number,
    imagemPrincipalUrl?: string
  ) {
    this.ocorridoEm = new Date();
    this.dados = {
      produtoId,
      nome,
      marca,
      preco,
      imagemPrincipalUrl,
    };
  }
}
