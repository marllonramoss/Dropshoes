import { TipoColecao } from "../../dominio/entidades/Colecao";

export interface AdicionarColecaoDTO {
  nome: string;
  tipo: TipoColecao;
}

export interface EditarColecaoDTO {
  nome: string;
  tipo: TipoColecao;
}

export interface ColecaoDTO {
  id: string;
  nome: string;
  slug: string;
  tipo: TipoColecao;
}
