import { Evento } from "../eventos/Evento";
import { ColecaoCriada } from "../eventos/ColecaoCriada";
import { GeradorDeId } from "../portas/GeradorDeId";

export class Colecao {
  private readonly _id: string;
  private _nome: string;
  private _slug: string;
  private _eventos: Evento[] = [];

  constructor(id: string, nome: string) {
    if (!nome) throw new Error("Nome da coleção é obrigatório");

    this._id = id;
    this._nome = nome;
    this._slug = Colecao.gerarSlug(nome);

    this._eventos.push(new ColecaoCriada(this._id, this._nome, this._slug));
  }

  // Getters
  get id(): string {
    return this._id;
  }

  get nome(): string {
    return this._nome;
  }

  get slug(): string {
    return this._slug;
  }

  get eventos(): Evento[] {
    return [...this._eventos];
  }

  // Factory method
  static criar(nome: string, geradorDeId: GeradorDeId): Colecao {
    const id = geradorDeId.gerar();
    return new Colecao(id, nome);
  }

  // Método privado para gerar slug
  private static gerarSlug(nome: string): string {
    return nome
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
}
