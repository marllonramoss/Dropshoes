import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/colecoes/agrupadas`, { next: { revalidate: 60 } });
  if (!res.ok) {
    return NextResponse.json({ error: 'Erro ao buscar coleções agrupadas' }, { status: 500 });
  }
  const data = await res.json();
  return NextResponse.json(data);
}
