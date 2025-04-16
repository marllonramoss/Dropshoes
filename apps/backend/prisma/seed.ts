import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Limpar o banco de dados
  console.log('Limpando banco de dados...');
  await prisma.produtoColecao.deleteMany();
  await prisma.imagemProduto.deleteMany();
  await prisma.tamanhoProduto.deleteMany();
  await prisma.produto.deleteMany();
  await prisma.colecao.deleteMany();
  console.log('Banco de dados limpo!');

  // Criar coleções
  const colecoes = [
    { nome: "Destaques", slug: "destaques" },
    { nome: "Lançamentos", slug: "lancamentos" },
    { nome: "Masculino", slug: "masculino" },
    { nome: "Feminino", slug: "feminino" },
    { nome: "Esportivo", slug: "esportivo" },
    { nome: "Casual", slug: "casual" },
    { nome: "Corrida", slug: "corrida" },
    { nome: "Skateboard", slug: "skateboard" },
    { nome: "Basquete", slug: "basquete" },
    { nome: "Lifestyle", slug: "lifestyle" },
  ];

  for (const colecao of colecoes) {
    await prisma.colecao.create({
      data: colecao
    });
  }

  // Buscar ID da coleção Destaques
  const colecaoDestaques = await prisma.colecao.findFirst({
    where: { slug: "destaques" }
  });

  // Produtos exemplo
  const produtos = [
    {
      nome: "Nike Air Force 1",
      marca: "Nike",
      slug: "nike-air-force-1",
      preco: 799.90,
      tamanhos: [38, 39, 40, 41, 42],
      imagens: [
        {
          url: "https://imgnike-a.akamaihd.net/768x768/02195351.jpg",
          descricao: "Nike Air Force 1 - Vista frontal",
          principal: true
        }
      ],
      colecoes: [colecaoDestaques?.id]
    },
    {
      nome: "Adidas Ultraboost",
      marca: "Adidas",
      slug: "adidas-ultraboost",
      preco: 999.90,
      tamanhos: [39, 40, 41, 42, 43],
      imagens: [
        {
          url: "https://loremflickr.com/800/800/sneakers",
          descricao: "Adidas Ultraboost - Vista lateral",
          principal: true
        }
      ],
      colecoes: [colecaoDestaques?.id]
    },
    {
      nome: "Nike Air Max 90",
      marca: "Nike",
      slug: "nike-air-max-90",
      preco: 849.90,
      tamanhos: [38, 39, 40, 41, 42, 43],
      imagens: [
        {
          url: "https://maze.cdn.plataformaneo.com.br/produto/multifotos/hd/20220427162347_4306805075_DZ.jpg",
          descricao: "Nike Air Max 90 - Vista superior",
          principal: true
        }
      ],
      colecoes: [colecaoDestaques?.id]
    },
    {
      nome: "Puma RS-X",
      marca: "Puma",
      slug: "puma-rs-x",
      preco: 699.90,
      tamanhos: [37, 38, 39, 40, 41],
      imagens: [
        {
          url: "https://loremflickr.com/800/800/sneakers",
          descricao: "Puma RS-X - Vista completa",
          principal: true
        }
      ],
      colecoes: [colecaoDestaques?.id]
    },
    {
      nome: "Vans Old Skool",
      marca: "Vans",
      slug: "vans-old-skool",
      preco: 399.90,
      tamanhos: [34, 35, 36, 37, 38, 39, 40],
      imagens: [
        {
          url: "https://secure-static.vans.com.br/medias/sys_master/vans/vans/h19/h69/h00/h00/11353027715102/1002001070091U-01-BASEIMAGE-Midres.jpg",
          descricao: "Vans Old Skool - Vista lateral",
          principal: true
        }
      ],
      colecoes: [colecaoDestaques?.id]
    },
    {
      nome: "New Balance 574",
      marca: "New Balance",
      slug: "new-balance-574",
      preco: 599.90,
      tamanhos: [38, 39, 40, 41, 42],
      imagens: [
        {
          url: "https://loremflickr.com/800/800/sneakers",
          descricao: "New Balance 574 - Vista frontal",
          principal: true
        }
      ],
      colecoes: [colecaoDestaques?.id]
    },
    {
      nome: "Adidas Forum Low",
      marca: "Adidas",
      slug: "adidas-forum-low",
      preco: 699.90,
      tamanhos: [36, 37, 38, 39, 40, 41],
      imagens: [
        {
          url: "https://loremflickr.com/800/800/sneakers",
          descricao: "Adidas Forum Low - Vista completa",
          principal: true
        }
      ],
      colecoes: [colecaoDestaques?.id]
    },
    {
      nome: "Nike Dunk Low",
      marca: "Nike",
      slug: "nike-dunk-low",
      preco: 899.90,
      tamanhos: [38, 39, 40, 41, 42],
      imagens: [
        {
          url: "https://imgnike-a.akamaihd.net/768x768/011832ID.jpg",
          descricao: "Nike Dunk Low - Vista lateral",
          principal: true
        }
      ],
      colecoes: [colecaoDestaques?.id]
    },
    {
      nome: "Converse Chuck 70",
      marca: "Converse",
      slug: "converse-chuck-70",
      preco: 499.90,
      tamanhos: [34, 35, 36, 37, 38, 39, 40, 41, 42],
      imagens: [
        {
          url: "https://maze.cdn.plataformaneo.com.br/produto/multifotos/hd/20230419090842_4337205075_DZ.jpg",
          descricao: "Converse Chuck 70 - Vista lateral",
          principal: true
        }
      ],
      colecoes: [colecaoDestaques?.id]
    },
    {
      nome: "Jordan 1 Low",
      marca: "Nike",
      slug: "jordan-1-low",
      preco: 999.90,
      tamanhos: [38, 39, 40, 41, 42],
      imagens: [
        {
          url: "https://maze.cdn.plataformaneo.com.br/produto/multifotos/hd/20230907084015_4347705075_DZ.jpg",
          descricao: "Jordan 1 Low - Vista completa",
          principal: true
        }
      ],
      colecoes: [colecaoDestaques?.id]
    },
    {
      nome: "Adidas Superstar",
      marca: "Adidas",
      slug: "adidas-superstar",
      preco: 599.90,
      tamanhos: [36, 37, 38, 39, 40, 41],
      imagens: [
        {
          url: "https://loremflickr.com/800/800/sneakers",
          descricao: "Adidas Superstar - Vista frontal",
          principal: true
        }
      ],
      colecoes: [colecaoDestaques?.id]
    },
    {
      nome: "Nike Air Max 97",
      marca: "Nike",
      slug: "nike-air-max-97",
      preco: 899.90,
      tamanhos: [38, 39, 40, 41, 42],
      imagens: [
        {
          url: "https://loremflickr.com/800/800/sneakers",
          descricao: "Nike Air Max 97 - Vista lateral",
          principal: true
        }
      ],
      colecoes: [colecaoDestaques?.id]
    },
    {
      nome: "Puma Suede",
      marca: "Puma",
      slug: "puma-suede",
      preco: 449.90,
      tamanhos: [37, 38, 39, 40, 41],
      imagens: [
        {
          url: "https://loremflickr.com/800/800/sneakers",
          descricao: "Puma Suede - Vista completa",
          principal: true
        }
      ],
      colecoes: [colecaoDestaques?.id]
    },
    {
      nome: "Reebok Classic",
      marca: "Reebok",
      slug: "reebok-classic",
      preco: 399.90,
      tamanhos: [36, 37, 38, 39, 40],
      imagens: [
        {
          url: "https://loremflickr.com/800/800/sneakers",
          descricao: "Reebok Classic - Vista lateral",
          principal: true
        }
      ],
      colecoes: [colecaoDestaques?.id]
    },
    {
      nome: "New Balance 550",
      marca: "New Balance",
      slug: "new-balance-550",
      preco: 799.90,
      tamanhos: [38, 39, 40, 41, 42],
      imagens: [
        {
          url: "https://loremflickr.com/800/800/sneakers",
          descricao: "New Balance 550 - Vista frontal",
          principal: true
        }
      ],
      colecoes: [colecaoDestaques?.id]
    },
    {
      nome: "Vans Sk8-Hi",
      marca: "Vans",
      slug: "vans-sk8-hi",
      preco: 499.90,
      tamanhos: [36, 37, 38, 39, 40, 41],
      imagens: [
        {
          url: "https://loremflickr.com/800/800/sneakers",
          descricao: "Vans Sk8-Hi - Vista lateral",
          principal: true
        }
      ],
      colecoes: [colecaoDestaques?.id]
    },
    {
      nome: "Nike SB Janoski",
      marca: "Nike",
      slug: "nike-sb-janoski",
      preco: 549.90,
      tamanhos: [38, 39, 40, 41, 42],
      imagens: [
        {
          url: "https://loremflickr.com/800/800/sneakers",
          descricao: "Nike SB Janoski - Vista superior",
          principal: true
        }
      ],
      colecoes: [colecaoDestaques?.id]
    },
    {
      nome: "Adidas NMD",
      marca: "Adidas",
      slug: "adidas-nmd",
      preco: 899.90,
      tamanhos: [38, 39, 40, 41, 42],
      imagens: [
        {
          url: "https://loremflickr.com/800/800/sneakers",
          descricao: "Adidas NMD - Vista completa",
          principal: true
        }
      ],
      colecoes: [colecaoDestaques?.id]
    },
    {
      nome: "Converse One Star",
      marca: "Converse",
      slug: "converse-one-star",
      preco: 449.90,
      tamanhos: [36, 37, 38, 39, 40],
      imagens: [
        {
          url: "https://loremflickr.com/800/800/sneakers",
          descricao: "Converse One Star - Vista lateral",
          principal: true
        }
      ],
      colecoes: [colecaoDestaques?.id]
    },
    {
      nome: "Jordan 4 Retro",
      marca: "Nike",
      slug: "jordan-4-retro",
      preco: 1999.90,
      tamanhos: [38, 39, 40, 41, 42],
      imagens: [
        {
          url: "https://loremflickr.com/800/800/sneakers",
          descricao: "Jordan 4 Retro - Vista completa",
          principal: true
        }
      ],
      colecoes: [colecaoDestaques?.id]
    }
  ];

  // Criar produtos
  for (const produto of produtos) {
    await prisma.produto.create({
      data: {
        nome: produto.nome,
        marca: produto.marca,
        slug: produto.slug,
        preco: produto.preco,
        tamanhos: {
          create: produto.tamanhos.map(tamanho => ({
            tamanho
          }))
        },
        imagens: {
          create: produto.imagens
        },
        colecoes: {
          create: produto.colecoes.map(colecaoId => ({
            colecaoId: colecaoId!
          }))
        }
      }
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
