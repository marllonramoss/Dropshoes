export type ColecaoDTO = {
  id: string;
  nome: string;
  slug: string;
};

export async function getAllCollections(): Promise<ColecaoDTO[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/colecoes`, { cache: 'force-cache' });
  if (!res.ok) throw new Error('Erro ao buscar coleções');
  return res.json();
}
