import { ImagemProduto } from "../../dominio/tipos/ImagemProduto";
import { ColecaoDTO } from "./ColecaoDTO";

export interface ProdutoDTO {
  id: string;
  nome: string;
  marca: string;
  tamanhos: number[];
  preco: number;
  slug: string;
  imagens: ImagemProduto[];
  colecoes: ColecaoDTO[];
}
