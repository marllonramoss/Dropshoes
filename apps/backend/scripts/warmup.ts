import axios from 'axios';

async function warmup() {
  // Liste aqui os endpoints que você quer aquecer
  const marcas = ['Nike', 'Adidas', 'Puma', 'Vans', 'New Balance'];

  // Gera todas as combinações possíveis de marcas (exceto vazio)
  function getMarcaCombinations(arr: string[]): string[][] {
    const results: string[][] = [];
    const total = Math.pow(2, arr.length);
    for (let i = 1; i < total; i++) { // começa em 1 para ignorar o conjunto vazio
      const combo: string[] = [];
      for (let j = 0; j < arr.length; j++) {
        if (i & (1 << j)) {
          combo.push(arr[j]);
        }
      }
      results.push(combo);
    }
    return results;
  }

  const endpoints = [
    'http://localhost:3000/produtos?page=1&pageSize=12',
    ...getMarcaCombinations(marcas).map(
      (combo) => {
        const marcasParams = combo.map(marca => `marca=${marca.replace(/ /g, '+')}`).join('&');
        return `http://localhost:3000/produtos?page=1&pageSize=12&${marcasParams}`;
      }
    ),
    // Adicione outros endpoints/parâmetros importantes conforme necessário
  ];

  for (const url of endpoints) {
    try {
      const start = Date.now();
      await axios.get(url);
      const ms = Date.now() - start;
      console.log(`[WARMUP] Cache populado para: ${url} (${ms}ms)`);
    } catch (err) {
      console.error(`[WARMUP] Falha ao aquecer: ${url}`);
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data);
      } else {
        console.error(err);
      }
    }
  }
}

warmup();
