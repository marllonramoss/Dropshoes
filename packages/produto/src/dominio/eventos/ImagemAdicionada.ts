import { Evento } from "./Evento";

/**
 * Evento disparado quando uma imagem é adicionada a um produto
 */
export class ImagemAdicionada implements Evento {
  readonly nome = "ImagemAdicionada";
  readonly ocorridoEm: Date;
  readonly dados: {
    produtoId: string;
    url: string;
    descricao: string;
    principal: boolean;
  };

  constructor(
    produtoId: string,
    url: string,
    descricao: string,
    principal: boolean
  ) {
    this.ocorridoEm = new Date();
    this.dados = {
      produtoId,
      url,
      descricao,
      principal,
    };
  }
}
