import { ProdutoRepository } from "../../dominio/repositorios/ProdutoRepository";

export class RemoverProduto {
  constructor(private readonly produtoRepository: ProdutoRepository) {}

  async executar(id: string): Promise<boolean> {
    if (!id) {
      throw new Error("ID do produto é obrigatório");
    }

    // Verificar se o produto existe
    const produto = await this.produtoRepository.buscarPorId(id);

    if (!produto) {
      throw new Error(`Produto com ID ${id} não encontrado`);
    }

    // Remover o produto
    const removido = await this.produtoRepository.remover(id);

    if (!removido) {
      throw new Error(`Não foi possível remover o produto com ID ${id}`);
    }

    return true;
  }
}
