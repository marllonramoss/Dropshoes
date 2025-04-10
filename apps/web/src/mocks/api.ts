// Tipos para tipagem forte
export type Size =
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45
  | 46;

export type ProductColor = {
  name: string;
  hex: string;
};

export type Collection = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  featured: boolean;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discount?: number;
  images: string[];
  colors: ProductColor[];
  sizes: Size[];
  brand: string;
  category: string;
  collectionId: string;
  tags: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
  createdAt: string;
  featured: boolean;
};

// Mock de coleções
export const collections: Collection[] = [
  {
    id: "c1",
    name: "Essentials",
    slug: "essentials",
    description: "Nossa coleção básica com designs clássicos para o dia a dia.",
    image: "/images/collections/essentials.jpg",
    featured: true,
  },
  {
    id: "c2",
    name: "Street Runner",
    slug: "street-runner",
    description: "Tênis urbanos inspirados na cultura street e skateboard.",
    image: "/images/collections/street-runner.jpg",
    featured: true,
  },
  {
    id: "c3",
    name: "Performance Elite",
    slug: "performance-elite",
    description: "Tênis de alta performance para atletas profissionais.",
    image: "/images/collections/performance-elite.jpg",
    featured: true,
  },
  {
    id: "c4",
    name: "Vintage Icons",
    slug: "vintage-icons",
    description:
      "Modelos clássicos que definiram gerações, de volta em novas cores.",
    image: "/images/collections/vintage-icons.jpg",
    featured: false,
  },
  {
    id: "c5",
    name: "Future Tech",
    slug: "future-tech",
    description:
      "Inovações tecnológicas que definem o futuro do calçado esportivo.",
    image: "/images/collections/future-tech.jpg",
    featured: true,
  },
  {
    id: "c6",
    name: "Eco Friendly",
    slug: "eco-friendly",
    description:
      "Tênis sustentáveis feitos com materiais reciclados e processos eco-friendly.",
    image: "/images/collections/eco-friendly.jpg",
    featured: false,
  },
];

// Mock de produtos
export const products: Product[] = [
  {
    id: "p1",
    name: "Air Flow 90",
    slug: "air-flow-90",
    description:
      "O tênis ideal para corridas urbanas e uso diário. Tecnologia de amortecimento avançada e design leve.",
    price: 599.9,
    images: [
      "/images/products/air-flow-90-1.jpg",
      "/images/products/air-flow-90-2.jpg",
      "/images/products/air-flow-90-3.jpg",
    ],
    colors: [
      { name: "Preto", hex: "#000000" },
      { name: "Branco", hex: "#FFFFFF" },
      { name: "Azul", hex: "#0066CC" },
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44],
    brand: "DropShoes",
    category: "running",
    collectionId: "c3", // Performance Elite
    tags: ["corrida", "leve", "amortecimento"],
    inStock: true,
    rating: 4.8,
    reviews: 124,
    createdAt: "2023-04-15T10:00:00Z",
    featured: true,
  },
  {
    id: "p2",
    name: "Urban Street 2.0",
    slug: "urban-street-2",
    description:
      "Design inspirado na cultura urbana com conforto premium. Perfeito para skatistas e entusiastas do street style.",
    price: 459.9,
    discount: 399.9,
    images: [
      "/images/products/urban-street-2-1.jpg",
      "/images/products/urban-street-2-2.jpg",
    ],
    colors: [
      { name: "Preto", hex: "#000000" },
      { name: "Cinza", hex: "#888888" },
      { name: "Verde Oliva", hex: "#556B2F" },
    ],
    sizes: [37, 38, 39, 40, 41, 42, 43],
    brand: "DropShoes",
    category: "casual",
    collectionId: "c2", // Street Runner
    tags: ["street", "skate", "casual"],
    inStock: true,
    rating: 4.5,
    reviews: 89,
    createdAt: "2023-05-20T14:30:00Z",
    featured: true,
  },
  {
    id: "p3",
    name: "Classic Retro",
    slug: "classic-retro",
    description:
      "Um clássico dos anos 90 de volta em novas cores. Design vintage com toques modernos.",
    price: 379.9,
    images: [
      "/images/products/classic-retro-1.jpg",
      "/images/products/classic-retro-2.jpg",
      "/images/products/classic-retro-3.jpg",
    ],
    colors: [
      { name: "Branco/Vermelho", hex: "#FFFFFF" },
      { name: "Branco/Azul", hex: "#FFFFFF" },
      { name: "Bege", hex: "#F5F5DC" },
    ],
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44],
    brand: "DropShoes",
    category: "lifestyle",
    collectionId: "c4", // Vintage Icons
    tags: ["vintage", "retrô", "clássico"],
    inStock: true,
    rating: 4.7,
    reviews: 215,
    createdAt: "2023-03-10T09:15:00Z",
    featured: false,
  },
  {
    id: "p4",
    name: "EcoFlex Runner",
    slug: "ecoflex-runner",
    description:
      "Tênis sustentável feito com materiais reciclados. Cada par reutiliza o equivalente a 12 garrafas plásticas.",
    price: 499.9,
    images: [
      "/images/products/ecoflex-runner-1.jpg",
      "/images/products/ecoflex-runner-2.jpg",
    ],
    colors: [
      { name: "Verde Sage", hex: "#9CAF88" },
      { name: "Azul Oceano", hex: "#1B4B73" },
      { name: "Areia", hex: "#D2B48C" },
    ],
    sizes: [38, 39, 40, 41, 42, 43],
    brand: "DropShoes",
    category: "running",
    collectionId: "c6", // Eco Friendly
    tags: ["sustentável", "eco", "reciclado", "corrida"],
    inStock: true,
    rating: 4.6,
    reviews: 78,
    createdAt: "2023-08-22T11:20:00Z",
    featured: true,
  },
  {
    id: "p5",
    name: "Future Boost",
    slug: "future-boost",
    description:
      "Tecnologia de ponta com solado responsivo e design futurista. Absorção de impacto superiores e retorno de energia.",
    price: 799.9,
    discount: 699.9,
    images: [
      "/images/products/future-boost-1.jpg",
      "/images/products/future-boost-2.jpg",
      "/images/products/future-boost-3.jpg",
    ],
    colors: [
      { name: "Preto/Neon", hex: "#000000" },
      { name: "Branco/Prata", hex: "#FFFFFF" },
    ],
    sizes: [39, 40, 41, 42, 43, 44],
    brand: "DropShoes",
    category: "performance",
    collectionId: "c5", // Future Tech
    tags: ["tecnologia", "performance", "boost"],
    inStock: true,
    rating: 4.9,
    reviews: 56,
    createdAt: "2024-01-05T15:45:00Z",
    featured: true,
  },
  {
    id: "p6",
    name: "Daily Walk",
    slug: "daily-walk",
    description:
      "O tênis perfeito para o uso diário. Confortável, versátil e durável.",
    price: 329.9,
    images: [
      "/images/products/daily-walk-1.jpg",
      "/images/products/daily-walk-2.jpg",
    ],
    colors: [
      { name: "Preto", hex: "#000000" },
      { name: "Cinza", hex: "#888888" },
      { name: "Azul Marinho", hex: "#000080" },
      { name: "Branco", hex: "#FFFFFF" },
    ],
    sizes: [34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
    brand: "DropShoes",
    category: "casual",
    collectionId: "c1", // Essentials
    tags: ["casual", "dia a dia", "confortável"],
    inStock: true,
    rating: 4.4,
    reviews: 312,
    createdAt: "2023-02-18T08:30:00Z",
    featured: false,
  },
  {
    id: "p7",
    name: "Pro Court",
    slug: "pro-court",
    description:
      "Desenvolvido para quadras de tênis profissionais. Estabilidade lateral e aderência superiores.",
    price: 689.9,
    images: [
      "/images/products/pro-court-1.jpg",
      "/images/products/pro-court-2.jpg",
    ],
    colors: [
      { name: "Branco/Verde", hex: "#FFFFFF" },
      { name: "Branco/Azul", hex: "#FFFFFF" },
    ],
    sizes: [39, 40, 41, 42, 43, 44, 45],
    brand: "DropShoes",
    category: "tennis",
    collectionId: "c3", // Performance Elite
    tags: ["tênis", "esporte", "quadra", "profissional"],
    inStock: true,
    rating: 4.7,
    reviews: 64,
    createdAt: "2023-06-30T13:10:00Z",
    featured: false,
  },
  {
    id: "p8",
    name: "SK8 Legend",
    slug: "sk8-legend",
    description:
      "O tênis de skate de referência para profissionais e amadores. Durabilidade extrema e sensibilidade tátil para o shape.",
    price: 399.9,
    images: [
      "/images/products/sk8-legend-1.jpg",
      "/images/products/sk8-legend-2.jpg",
      "/images/products/sk8-legend-3.jpg",
    ],
    colors: [
      { name: "Preto", hex: "#000000" },
      { name: "Vermelho", hex: "#CC0000" },
      { name: "Azul Marinho", hex: "#000080" },
    ],
    sizes: [37, 38, 39, 40, 41, 42, 43, 44],
    brand: "DropShoes",
    category: "skate",
    collectionId: "c2", // Street Runner
    tags: ["skate", "street", "durável"],
    inStock: true,
    rating: 4.8,
    reviews: 186,
    createdAt: "2023-04-12T10:20:00Z",
    featured: true,
  },
  {
    id: "p9",
    name: "Eco Walk",
    slug: "eco-walk",
    description:
      "Tênis casual sustentável com solado de borracha reciclada e cabedal de lona orgânica.",
    price: 299.9,
    images: [
      "/images/products/eco-walk-1.jpg",
      "/images/products/eco-walk-2.jpg",
    ],
    colors: [
      { name: "Creme", hex: "#FFFDD0" },
      { name: "Verde Oliva", hex: "#556B2F" },
      { name: "Azul Claro", hex: "#ADD8E6" },
    ],
    sizes: [35, 36, 37, 38, 39, 40, 41, 42, 43],
    brand: "DropShoes",
    category: "casual",
    collectionId: "c6", // Eco Friendly
    tags: ["sustentável", "eco", "casual", "lona"],
    inStock: true,
    rating: 4.3,
    reviews: 97,
    createdAt: "2023-09-05T16:40:00Z",
    featured: false,
  },
  {
    id: "p10",
    name: "Retro Bounce 80",
    slug: "retro-bounce-80",
    description:
      "Inspirado nos modelos dos anos 80, este tênis combina estilo vintage com conforto moderno.",
    price: 429.9,
    discount: 359.9,
    images: [
      "/images/products/retro-bounce-80-1.jpg",
      "/images/products/retro-bounce-80-2.jpg",
    ],
    colors: [
      { name: "Branco/Azul/Vermelho", hex: "#FFFFFF" },
      { name: "Branco/Verde/Amarelo", hex: "#FFFFFF" },
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44],
    brand: "DropShoes",
    category: "lifestyle",
    collectionId: "c4", // Vintage Icons
    tags: ["retrô", "vintage", "anos 80", "lifestyle"],
    inStock: true,
    rating: 4.6,
    reviews: 142,
    createdAt: "2023-07-18T09:30:00Z",
    featured: true,
  },
  {
    id: "p11",
    name: "Basic Everyday",
    slug: "basic-everyday",
    description:
      "O tênis básico que combina com tudo. Simplicidade e conforto para qualquer ocasião.",
    price: 259.9,
    images: [
      "/images/products/basic-everyday-1.jpg",
      "/images/products/basic-everyday-2.jpg",
    ],
    colors: [
      { name: "Preto", hex: "#000000" },
      { name: "Branco", hex: "#FFFFFF" },
      { name: "Cinza", hex: "#888888" },
    ],
    sizes: [34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    brand: "DropShoes",
    category: "casual",
    collectionId: "c1", // Essentials
    tags: ["básico", "casual", "dia a dia"],
    inStock: true,
    rating: 4.2,
    reviews: 276,
    createdAt: "2023-01-20T11:15:00Z",
    featured: false,
  },
  {
    id: "p12",
    name: "Quantum Leap",
    slug: "quantum-leap",
    description:
      "Tênis de alto desempenho com tecnologia de amortecimento quântico. Ideal para corredores de longas distâncias.",
    price: 899.9,
    images: [
      "/images/products/quantum-leap-1.jpg",
      "/images/products/quantum-leap-2.jpg",
      "/images/products/quantum-leap-3.jpg",
    ],
    colors: [
      { name: "Preto/Verde Neon", hex: "#000000" },
      { name: "Azul/Laranja", hex: "#0066CC" },
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    brand: "DropShoes",
    category: "running",
    collectionId: "c5", // Future Tech
    tags: ["corrida", "tecnologia", "performance", "maratona"],
    inStock: true,
    rating: 4.9,
    reviews: 48,
    createdAt: "2024-02-15T14:20:00Z",
    featured: true,
  },
];

// Mock de funções da API

// Função para obter todas as coleções
export const getCollections = () => {
  return collections;
};

// Função para obter coleções em destaque
export const getFeaturedCollections = () => {
  return collections.filter((collection) => collection.featured);
};

// Função para obter uma coleção pelo slug
export const getCollectionBySlug = (slug: string) => {
  return collections.find((collection) => collection.slug === slug);
};

// Função para obter todos os produtos
export const getProducts = () => {
  return products;
};

// Função para obter produtos em destaque
export const getFeaturedProducts = () => {
  return products.filter((product) => product.featured);
};

// Função para obter produtos em promoção
export const getDiscountedProducts = () => {
  return products.filter((product) => product.discount !== undefined);
};

// Função para obter um produto pelo slug
export const getProductBySlug = (slug: string) => {
  return products.find((product) => product.slug === slug);
};

// Função para obter produtos de uma coleção específica
export const getProductsByCollection = (collectionId: string) => {
  return products.filter((product) => product.collectionId === collectionId);
};

// Função para obter produtos de uma categoria específica
export const getProductsByCategory = (category: string) => {
  return products.filter((product) => product.category === category);
};

// Função para pesquisar produtos
export const searchProducts = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  );
};
