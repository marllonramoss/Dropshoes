import { ProdutoRepository } from "../../dominio/repositorios/ProdutoRepository";
import { Produto } from "../../dominio/entidades/Produto";

export class ListarProdutos {
  constructor(private readonly produtoRepository: ProdutoRepository) {}

  async executar(): Promise<Produto[]> {
    return this.produtoRepository.listarTodos();
  }
}
