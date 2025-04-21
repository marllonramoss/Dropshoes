import { ProdutoRepository } from "../../dominio/repositorios/ProdutoRepository";
import { ProdutoDTO } from "../dtos/ProdutoDTO";

export class ListarProdutosPaginado {
  constructor(private readonly produtoRepository: ProdutoRepository) {}

  /**
   * Lista produtos paginados, com filtro opcional por múltiplas marcas.
   * @param page Página
   * @param pageSize Tamanho da página
   * @param marcas Filtro de marcas (array)
   */
  async executar(page: number, pageSize: number, marcas?: string[], precoMax?: number) {
    const { items, total } = await this.produtoRepository.listarPaginado(page, pageSize, marcas, precoMax);

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
