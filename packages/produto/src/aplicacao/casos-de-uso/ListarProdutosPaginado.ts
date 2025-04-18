import { ProdutoRepository } from "../../dominio/repositorios/ProdutoRepository";
import { ProdutoDTO } from "../dtos/ProdutoDTO";

export class ListarProdutosPaginado {
  constructor(private readonly produtoRepository: ProdutoRepository) {}

  async executar(page: number, pageSize: number) {
    const { items, total } = await this.produtoRepository.listarPaginado(page, pageSize);

    return {
      items: items.map((produto) => ({
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
      } as ProdutoDTO)),
      total,
      page,
      pageSize,
    };
  }
}
