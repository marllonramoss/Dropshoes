import { ProdutoRepository } from '../../dominio/repositorios/ProdutoRepository';

export class BuscarProdutosPorTermoUseCase {
  constructor(private readonly produtoRepository: ProdutoRepository) {}

  async executar(termo: string) {
    if (!termo || termo.trim().length < 2) {
      return [];
    }
    // Busca por nome, marca ou descrição contendo o termo (case-insensitive)
    return this.produtoRepository.buscarPorTermo(termo);
  }
}
