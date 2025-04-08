export class Id {
  private readonly valor: string;

  constructor(valor: string) {
    this.validarId(valor);
    this.valor = valor;
  }

  private validarId(valor: string): void {
    if (!valor || valor.trim().length === 0) {
      throw new Error("Id não pode ser vazio");
    }
  }

  public getValor(): string {
    return this.valor;
  }

  public equals(outro: Id): boolean {
    return this.valor === outro.valor;
  }

  public toString(): string {
    return this.valor;
  }

  public toJSON(): string {
    return this.valor;
  }
}
