import { Produto } from "../entidades/Produto";

export interface ProdutoRepository {
  salvar(produto: Produto): Promise<void>;
  buscarPorId(id: string): Promise<Produto | null>;
  buscarPorSlug(slug: string): Promise<Produto | null>;
  listarTodos(): Promise<Produto[]>;
  listarPorMarca(marca: string): Promise<Produto[]>;
  listarComTamanho(tamanho: number): Promise<Produto[]>;
  listarPorColecao(colecaoId: string): Promise<Produto[]>;
  remover(id: string): Promise<boolean>;
  listarPaginado(page: number, pageSize: number, marcas?: string[], precoMax?: number): Promise<{ items: Produto[]; total: number }>;
}
