import { Colecao } from "../entidades/Colecao";

export interface ColecaoRepository {
  salvar(colecao: Colecao): Promise<void>;
  buscarPorId(id: string): Promise<Colecao | null>;
  buscarPorSlug(slug: string): Promise<Colecao | null>;
  listarTodas(): Promise<Colecao[]>;
  remover(id: string): Promise<boolean>;
}
