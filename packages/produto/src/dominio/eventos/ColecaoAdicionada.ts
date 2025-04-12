import { Evento } from "./Evento";

export class ColecaoAdicionada implements Evento {
  public readonly nome = "ColecaoAdicionada";
  public readonly ocorridoEm: Date;

  constructor(
    public readonly produtoId: string,
    public readonly colecaoId: string,
    public readonly nomeColecao: string
  ) {
    this.ocorridoEm = new Date();
  }

  get dados(): object {
    return {
      produtoId: this.produtoId,
      colecaoId: this.colecaoId,
      nomeColecao: this.nomeColecao,
      ocorridoEm: this.ocorridoEm,
    };
  }
}
