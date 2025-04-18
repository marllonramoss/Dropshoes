import { Produto } from "../../dominio/entidades/Produto";
import { ProdutoRepository } from "../../dominio/repositorios/ProdutoRepository";
import { ProdutoDTO } from "../dtos/ProdutoDTO";

export class ListarProdutosPorColecao {
  constructor(private readonly produtoRepository: ProdutoRepository) {}

  async executar(colecaoId: string): Promise<ProdutoDTO[]> {
    const produtos = await this.produtoRepository.listarPorColecao(colecaoId);

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
        tipo: c.tipo,
      })),
    }));
  }
}
