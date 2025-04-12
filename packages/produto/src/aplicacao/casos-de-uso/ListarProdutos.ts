import { ProdutoRepository } from "../../dominio/repositorios/ProdutoRepository";
import { ProdutoDTO } from "../dtos/ProdutoDTO";

export class ListarProdutos {
  constructor(private readonly produtoRepository: ProdutoRepository) {}

  async executar(): Promise<ProdutoDTO[]> {
    const produtos = await this.produtoRepository.listarTodos();

    return produtos.map((produto) => ({
      id: produto.id,
      nome: produto.nome,
      marca: produto.marca,
      tamanhos: produto.tamanhosNumericos,
      preco: produto.precoNumerico,
      slug: produto.slug,
      imagens: produto.imagens,
      colecoes: produto.colecoes.map((c) => ({
        id: c.id,
        nome: c.nome,
        slug: c.slug,
      })),
    }));
  }
}
