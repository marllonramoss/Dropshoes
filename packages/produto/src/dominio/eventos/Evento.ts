export interface Evento {
  nome: string;
  ocorridoEm: Date;
  dados: Record<string, any>;
}
