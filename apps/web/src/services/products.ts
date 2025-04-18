type ImagemProduto = {
  url: string;
  descricao: string;
  principal: boolean;
};

type ColecaoDTO = {
  id: string;
  nome: string;
  slug: string;
};

type Product = {
  id: string;
  nome: string;
  marca: string;
  tamanhos: number[];
  preco: number;
  slug: string;
  imagens: ImagemProduto[];
  colecoes: ColecaoDTO[];
};

export type PaginatedProducts = {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
};

export async function getPaginatedProducts(page = 1, pageSize = 12, marcas?: string[]): Promise<PaginatedProducts> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });
  if (marcas && marcas.length > 0) {
    marcas.forEach((m) => params.append("marca", m));
  }
  const url = `${apiUrl}/produtos?${params.toString()}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Falha ao carregar produtos");
  return response.json();
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = `${apiUrl}/produtos?colecaoId=74214086-43c2-4af0-9f0c-7037c0ebc56d`;

  console.log("Fazendo requisição para:", url);

  const response = await fetch(url, {
    cache: "force-cache", // dados serão buscados apenas no build
  });

  if (!response.ok) {
    throw new Error("Falha ao carregar produtos em destaque");
  }

  const data = await response.json();
  console.log("Produtos recebidos:", data);
  return data;
}
