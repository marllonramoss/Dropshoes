import { Evento } from "./Evento";

/**
 * Evento disparado quando a imagem principal de um produto é alterada
 */
export class ImagemPrincipalAlterada implements Evento {
  readonly nome = "ImagemPrincipalAlterada";
  readonly ocorridoEm: Date;
  readonly dados: {
    produtoId: string;
    urlAnterior: string | null;
    urlNova: string;
  };

  constructor(produtoId: string, urlAnterior: string | null, urlNova: string) {
    this.ocorridoEm = new Date();
    this.dados = {
      produtoId,
      urlAnterior,
      urlNova,
    };
  }
}
