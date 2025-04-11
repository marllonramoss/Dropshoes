import { Evento } from "./Evento";

/**
 * Evento disparado quando os dados básicos (nome, marca) de um produto são atualizados
 */
export class DadosBasicosAtualizados implements Evento {
  readonly nome = "DadosBasicosAtualizados";
  readonly ocorridoEm: Date;
  readonly dados: {
    produtoId: string;
    nomeAntigo: string;
    marcaAntiga: string;
    slugAntigo: string;
    nomeNovo: string;
    marcaNova: string;
    slugNovo: string;
  };

  constructor(
    produtoId: string,
    nomeAntigo: string,
    marcaAntiga: string,
    slugAntigo: string,
    nomeNovo: string,
    marcaNova: string,
    slugNovo: string
  ) {
    this.ocorridoEm = new Date();
    this.dados = {
      produtoId,
      nomeAntigo,
      marcaAntiga,
      slugAntigo,
      nomeNovo,
      marcaNova,
      slugNovo,
    };
  }
}
