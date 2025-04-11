import { Produto } from "../../dominio/entidades/Produto";
import { TamanhoSapato } from "../../dominio/objetos-valor/TamanhoSapato";
import { Preco } from "../../dominio/objetos-valor/Preco";
import {
  ImagemProduto,
  validadorImagem,
} from "../../dominio/tipos/ImagemProduto";
import { GeradorDeId } from "../../dominio/portas/GeradorDeId";
import { ProdutoRepository } from "../../dominio/repositorios/ProdutoRepository";

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
}

export class AdicionarProduto {
  constructor(
    private readonly produtoRepository: ProdutoRepository,
    private readonly geradorDeId: GeradorDeId
  ) {}

  async executar(dados: AdicionarProdutoDTO): Promise<string> {
    this.validarDados(dados);

    // Criar a nova entidade de produto usando o método de fábrica
    const produto = Produto.criar(
      dados.nome,
      dados.marca,
      dados.tamanhos,
      dados.preco,
      this.geradorDeId,
      dados.imagens
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

  private validarDados(dados: AdicionarProdutoDTO): void {
    if (!dados.nome) {
      throw new Error("Nome do produto é obrigatório");
    }

    if (!dados.marca) {
      throw new Error("Marca do produto é obrigatória");
    }

    if (
      !dados.tamanhos ||
      !Array.isArray(dados.tamanhos) ||
      dados.tamanhos.length === 0
    ) {
      throw new Error("É necessário informar pelo menos um tamanho disponível");
    }

    // Validar se cada tamanho é válido usando o objeto de valor TamanhoSapato
    for (const tamanho of dados.tamanhos) {
      if (typeof tamanho !== "number") {
        throw new Error("Tamanhos devem ser números");
      }

      if (!TamanhoSapato.ehValido(tamanho)) {
        throw new Error(
          `Tamanho ${tamanho} não é válido. Tamanhos válidos são: ${TamanhoSapato.obterTamanhosValidos().join(", ")}`
        );
      }
    }

    // Validar se o preço é válido usando o objeto de valor Preco
    if (typeof dados.preco !== "number") {
      throw new Error("Preço deve ser um número");
    }

    try {
      // Apenas validamos se é possível criar o objeto, sem atribuir a uma variável
      Preco.criar(dados.preco);
    } catch (error: any) {
      throw new Error(`Preço inválido: ${error.message}`);
    }

    // Validar imagens
    if (
      !dados.imagens ||
      !Array.isArray(dados.imagens) ||
      dados.imagens.length === 0
    ) {
      throw new Error(
        "É necessário informar pelo menos uma imagem para o produto"
      );
    }

    // Verificar se há mais de uma imagem principal
    const imagensPrincipais = dados.imagens.filter((img) => img.principal);
    if (imagensPrincipais.length > 1) {
      throw new Error("Só pode haver uma imagem principal");
    }

    // Validar cada imagem
    for (const imagem of dados.imagens) {
      const erro = validadorImagem.validarImagem({
        url: imagem.url,
        descricao: imagem.descricao,
        principal: imagem.principal || false,
      });

      if (erro) {
        throw new Error(`Imagem inválida: ${erro}`);
      }
    }
  }
}
