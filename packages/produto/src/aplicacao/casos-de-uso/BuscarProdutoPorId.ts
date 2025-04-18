import { Produto } from "../../dominio/entidades/Produto";
import { ProdutoRepository } from "../../dominio/repositorios/ProdutoRepository";
import { ProdutoDTO } from "../dtos/ProdutoDTO";

export class BuscarProdutoPorId {
  constructor(private readonly produtoRepository: ProdutoRepository) {}

  async executar(id: string): Promise<ProdutoDTO | null> {
    if (!id) {
      throw new Error("ID do produto é obrigatório");
    }

    const produto = await this.produtoRepository.buscarPorId(id);

    if (!produto) {
      return null;
    }

    // Converter para DTO
    return {
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
    };
  }
}
