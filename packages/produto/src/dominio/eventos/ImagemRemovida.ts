import { Evento } from "./Evento";

/**
 * Evento disparado quando uma imagem é removida de um produto
 */
export class ImagemRemovida implements Evento {
  readonly nome = "ImagemRemovida";
  readonly ocorridoEm: Date;
  readonly dados: {
    produtoId: string;
    url: string;
  };

  constructor(produtoId: string, url: string) {
    this.ocorridoEm = new Date();
    this.dados = {
      produtoId,
      url,
    };
  }
}
