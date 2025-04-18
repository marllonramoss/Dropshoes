export type ColecaoDTO = {
  id: string;
  nome: string;
  slug: string;
};

export type ColecoesAgrupadas = Record<string, ColecaoDTO[]>;

export async function getAllCollections(): Promise<ColecaoDTO[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/colecoes`, { cache: 'force-cache' });
  if (!res.ok) throw new Error('Erro ao buscar coleções');
  return res.json();
}

export async function getAllCollectionsGrouped(): Promise<ColecoesAgrupadas> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/colecoes/agrupadas`, { cache: 'force-cache' });
  if (!res.ok) throw new Error('Erro ao buscar coleções agrupadas');
  return res.json();
}
