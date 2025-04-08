export interface Evento {
  readonly nome: string;
  readonly dataOcorrencia: Date;
  readonly dados: Record<string, unknown>;
}
