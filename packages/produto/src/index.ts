// Entidades
export { Produto } from "./dominio/entidades/Produto";
export { Colecao } from "./dominio/entidades/Colecao";

// Objetos de valor
export { TamanhoSapato } from "./dominio/objetos-valor/TamanhoSapato";
export { Preco } from "./dominio/objetos-valor/Preco";

// Tipos e validadores
export { ImagemProduto, validadorImagem } from "./dominio/tipos/ImagemProduto";

// Eventos
export { ProdutoCriado } from "./dominio/eventos/ProdutoCriado";
export { PrecoAtualizado } from "./dominio/eventos/PrecoAtualizado";
export { TamanhoAdicionado } from "./dominio/eventos/TamanhoAdicionado";
export { TamanhoRemovido } from "./dominio/eventos/TamanhoRemovido";
export { ImagemAdicionada } from "./dominio/eventos/ImagemAdicionada";
export { ImagemRemovida } from "./dominio/eventos/ImagemRemovida";
export { ImagemPrincipalAlterada } from "./dominio/eventos/ImagemPrincipalAlterada";
export { DadosBasicosAtualizados } from "./dominio/eventos/DadosBasicosAtualizados";

// Portas
export { GeradorDeId } from "./dominio/portas/GeradorDeId";
export { ProdutoRepository } from "./dominio/repositorios/ProdutoRepository";
export { ColecaoRepository } from "./dominio/repositorios/ColecaoRepository";

// Casos de uso
export {
  AdicionarProduto,
  AdicionarProdutoDTO,
  ImagemProdutoDTO,
} from "./aplicacao/casos-de-uso/AdicionarProduto";

export {
  EditarProduto,
  EditarProdutoDTO,
} from "./aplicacao/casos-de-uso/EditarProduto";

export { BuscarProdutoPorId } from "./aplicacao/casos-de-uso/BuscarProdutoPorId";

export { RemoverProduto } from "./aplicacao/casos-de-uso/RemoverProduto";

export { ListarProdutos } from "./aplicacao/casos-de-uso/ListarProdutos";

export { ListarProdutosPorColecao } from "./aplicacao/casos-de-uso/ListarProdutosPorColecao";

// Casos de uso de Coleções
export * from "./aplicacao/casos-de-uso/AdicionarColecaoUseCase";
export * from "./aplicacao/casos-de-uso/ListarColecoesUseCase";
export * from "./aplicacao/casos-de-uso/BuscarColecaoPorIdUseCase";
export * from "./aplicacao/casos-de-uso/EditarColecaoUseCase";
export * from "./aplicacao/casos-de-uso/RemoverColecaoUseCase";
export * from "./aplicacao/casos-de-uso/AdicionarColecaoAoProdutoUseCase";

// DTOs de Coleções
export * from "./aplicacao/dtos/ColecaoDTO";
export * from "./aplicacao/dtos/ProdutoDTO";
