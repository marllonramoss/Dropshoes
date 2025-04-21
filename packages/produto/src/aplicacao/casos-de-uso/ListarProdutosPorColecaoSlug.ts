import { ProdutoRepository } from "../../dominio/repositorios/ProdutoRepository";
import { ColecaoRepository } from "../../dominio/repositorios/ColecaoRepository";
import { ProdutoDTO } from "../dtos/ProdutoDTO";

export class ListarProdutosPorColecaoSlug {
  constructor(
    private readonly produtoRepository: ProdutoRepository,
    private readonly colecaoRepository: ColecaoRepository
  ) {}

  async executar(colecaoSlug: string, page = 1, pageSize = 12): Promise<{
    items: ProdutoDTO[];
    total: number;
    page: number;
    pageSize: number;
  }> {
    const colecao = await this.colecaoRepository.buscarPorSlug(colecaoSlug);
    if (!colecao) {
      return { items: [], total: 0, page, pageSize };
    }
    const allProdutos = await this.produtoRepository.listarPorColecao(colecao.id);
    const total = allProdutos.length;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginated = allProdutos.slice(start, end).map((produto) => ({
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
    return { items: paginated, total, page, pageSize };
  }
}
