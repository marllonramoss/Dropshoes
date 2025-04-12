import { ProdutoRepository } from "../../dominio/repositorios/ProdutoRepository";
import { ColecaoRepository } from "../../dominio/repositorios/ColecaoRepository";

interface AdicionarColecaoAoProdutoDTO {
  produtoId: string;
  colecaoId: string;
}

export class AdicionarColecaoAoProdutoUseCase {
  constructor(
    private readonly produtoRepository: ProdutoRepository,
    private readonly colecaoRepository: ColecaoRepository
  ) {}

  async executar({
    produtoId,
    colecaoId,
  }: AdicionarColecaoAoProdutoDTO): Promise<void> {
    // 1. Buscar o produto
    const produto = await this.produtoRepository.buscarPorId(produtoId);
    if (!produto) {
      throw new Error("Produto não encontrado");
    }

    // 2. Buscar a coleção
    const colecao = await this.colecaoRepository.buscarPorId(colecaoId);
    if (!colecao) {
      throw new Error("Coleção não encontrada");
    }

    try {
      // 3. Adicionar a coleção ao produto
      produto.adicionarColecao(colecao);

      // 4. Persistir as mudanças
      await this.produtoRepository.salvar(produto);
    } catch (error) {
      // 5. Tratar erros específicos do domínio
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Erro ao adicionar coleção ao produto");
    }
  }
}
