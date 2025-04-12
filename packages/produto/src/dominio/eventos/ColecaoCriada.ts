import { Evento } from "./Evento";

export class ColecaoCriada implements Evento {
  public readonly nome_evento = "ColecaoCriada";
  public readonly ocorridoEm: Date;

  constructor(
    public readonly colecaoId: string,
    public readonly nome: string,
    public readonly slug: string
  ) {
    this.ocorridoEm = new Date();
  }

  get dados(): object {
    return {
      colecaoId: this.colecaoId,
      nome: this.nome,
      slug: this.slug,
      ocorridoEm: this.ocorridoEm,
    };
  }
}
