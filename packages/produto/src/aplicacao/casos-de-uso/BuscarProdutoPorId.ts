import { Produto } from "../../dominio/entidades/Produto";
import { ProdutoRepository } from "../../dominio/repositorios/ProdutoRepository";

export class BuscarProdutoPorId {
  constructor(private readonly produtoRepository: ProdutoRepository) {}

  async executar(id: string): Promise<Produto> {
    if (!id) {
      throw new Error("ID do produto é obrigatório");
    }

    const produto = await this.produtoRepository.buscarPorId(id);

    if (!produto) {
      throw new Error(`Produto com ID ${id} não encontrado`);
    }

    return produto;
  }
}
