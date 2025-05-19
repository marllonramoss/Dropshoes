export async function getPaginatedProducts(
  page = 1,
  pageSize = 12,
  marcas?: string[],
  precoMax?: string,
  colecaoSlug?: string
): Promise<PaginatedProducts> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    console.error('NEXT_PUBLIC_API_URL não está configurado');
    throw new Error("Configuração da API não encontrada");
  }

  try {
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
    });
    if (marcas && marcas.length > 0) {
      marcas.forEach((m) => params.append("marca", m));
    }
    if (precoMax) {
      params.append("precoMax", precoMax);
    }
    if (colecaoSlug) {
      params.append("colecaoSlug", colecaoSlug);
    }
    
    const url = `${apiUrl}/produtos?${params.toString()}`;
    console.log('Fazendo requisição para:', url);
    
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.text();
      console.error('Erro ao carregar produtos:', {
        status: response.status,
        statusText: response.statusText,
        data: errorData
      });
      throw new Error(`Falha ao carregar produtos: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw new Error("Falha ao carregar produtos. Por favor, tente novamente mais tarde.");
  }
} 