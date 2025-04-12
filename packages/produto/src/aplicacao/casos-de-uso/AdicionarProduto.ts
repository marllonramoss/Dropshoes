import { Produto } from "../../dominio/entidades/Produto";
import { TamanhoSapato } from "../../dominio/objetos-valor/TamanhoSapato";
import { Preco } from "../../dominio/objetos-valor/Preco";
import {
  ImagemProduto,
  validadorImagem,
} from "../../dominio/tipos/ImagemProduto";
import { GeradorDeId } from "../../dominio/portas/GeradorDeId";
import { ProdutoRepository } from "../../dominio/repositorios/ProdutoRepository";
import { ColecaoRepository } from "../../dominio/repositorios/ColecaoRepository";

// Interface para os dados de imagem no DTO
export interface ImagemProdutoDTO {
  url: string;
  descricao: string;
  principal?: boolean;
}

// DTO para dados de entrada
export interface AdicionarProdutoDTO {
  nome: string;
  marca: string;
  tamanhos: number[];
  preco: number;
  imagens: ImagemProdutoDTO[];
  colecaoIds: string[]; // Agora aceita múltiplas coleções
}

export class AdicionarProduto {
  constructor(
    private readonly produtoRepository: ProdutoRepository,
    private readonly colecaoRepository: ColecaoRepository,
    private readonly geradorDeId: GeradorDeId
  ) {}

  async executar(dados: AdicionarProdutoDTO): Promise<string> {
    // Verificar se as coleções existem
    const colecoes = await Promise.all(
      dados.colecaoIds.map((id) => this.colecaoRepository.buscarPorId(id))
    );

    // Verificar se todas as coleções foram encontradas
    const colecoesNaoEncontradas = colecoes.filter((c) => !c);
    if (colecoesNaoEncontradas.length > 0) {
      throw new Error("Uma ou mais coleções não foram encontradas");
    }

    // Criar a nova entidade de produto usando o método de fábrica
    const produto = Produto.criar(
      dados.nome,
      dados.marca,
      dados.tamanhos,
      dados.preco,
      this.geradorDeId,
      dados.imagens,
      colecoes.filter((c): c is NonNullable<typeof c> => c !== null) // TypeScript type guard para remover nulls
    );

    // Verificar se já existe um produto com o mesmo slug
    const produtoExistente = await this.produtoRepository.buscarPorSlug(
      produto.slug
    );

    if (produtoExistente) {
      throw new Error(`Já existe um produto com o slug "${produto.slug}"`);
    }

    // Persistir o produto
    await this.produtoRepository.salvar(produto);

    // Retornar o ID do produto criado
    return produto.id;
  }
}
