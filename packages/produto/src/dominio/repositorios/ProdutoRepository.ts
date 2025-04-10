import { Produto } from "../entidades/Produto";

export interface ProdutoRepository {
  salvar(produto: Produto): Promise<void>;
  buscarPorId(id: string): Promise<Produto | null>;
  buscarPorSlug(slug: string): Promise<Produto | null>;
  listarTodos(): Promise<Produto[]>;
  listarPorMarca(marca: string): Promise<Produto[]>;
  listarComTamanho(tamanho: number): Promise<Produto[]>;
  remover(id: string): Promise<boolean>;
}
