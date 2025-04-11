// Entidades
export { Produto } from "./dominio/entidades/Produto";

// Objetos de valor
export { TamanhoSapato } from "./dominio/objetos-valor/TamanhoSapato";
export { Preco } from "./dominio/objetos-valor/Preco";

// Tipos e validadores
export {
  ImagemProduto,
  validadorImagem,
  TIPOS_IMAGEM_VALIDOS,
} from "./dominio/tipos/ImagemProduto";

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
