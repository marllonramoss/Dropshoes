export async function getAllCollections(): Promise<ColecaoDTO[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    console.error('NEXT_PUBLIC_API_URL não está configurado');
    throw new Error("Configuração da API não encontrada");
  }

  try {
    console.log('Buscando coleções em:', `${apiUrl}/colecoes`);
    const res = await fetch(`${apiUrl}/colecoes`, { cache: 'force-cache' });
    
    if (!res.ok) {
      const errorData = await res.text();
      console.error('Erro ao buscar coleções:', {
        status: res.status,
        statusText: res.statusText,
        data: errorData
      });
      throw new Error(`Erro ao buscar coleções: ${res.status} ${res.statusText}`);
    }
    
    return res.json();
  } catch (error) {
    console.error('Erro ao buscar coleções:', error);
    throw new Error("Erro ao buscar coleções. Por favor, tente novamente mais tarde.");
  }
}

export async function getAllCollectionsGrouped(): Promise<ColecoesAgrupadas> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    console.error('NEXT_PUBLIC_API_URL não está configurado');
    throw new Error("Configuração da API não encontrada");
  }

  try {
    console.log('Buscando coleções agrupadas em:', `${apiUrl}/colecoes/agrupadas`);
    const res = await fetch(`${apiUrl}/colecoes/agrupadas`, { cache: 'force-cache' });
    
    if (!res.ok) {
      const errorData = await res.text();
      console.error('Erro ao buscar coleções agrupadas:', {
        status: res.status,
        statusText: res.statusText,
        data: errorData
      });
      throw new Error(`Erro ao buscar coleções agrupadas: ${res.status} ${res.statusText}`);
    }
    
    return res.json();
  } catch (error) {
    console.error('Erro ao buscar coleções agrupadas:', error);
    throw new Error("Erro ao buscar coleções agrupadas. Por favor, tente novamente mais tarde.");
  }
} 