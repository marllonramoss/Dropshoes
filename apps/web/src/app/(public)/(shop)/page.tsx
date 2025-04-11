import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { FeaturedCollection } from "@/components/home/FeaturedCollection";

// Mock para produtos em destaque
const featuredProducts = [
  {
    id: "1",
    name: "Nike Air Max 270",
    price: 1299.99,
    image: "/images/products/nike-air-max-270.jpg",
    slug: "nike-air-max-270",
    discount: 20,
    categoryName: "Esportivo",
  },
  {
    id: "2",
    name: "Adidas Ultraboost 21",
    price: 999.99,
    image: "/images/products/adidas-ultraboost-21.jpg",
    slug: "adidas-ultraboost-21",
    categoryName: "Corrida",
  },
  {
    id: "3",
    name: "Puma RS-X",
    price: 799.99,
    image: "/images/products/puma-rsx.jpg",
    slug: "puma-rsx",
    categoryName: "Casual",
  },
  {
    id: "4",
    name: "Vans Old Skool",
    price: 449.99,
    image: "/images/products/vans-old-skool.jpg",
    slug: "vans-old-skool",
    categoryName: "Skateboard",
  },
];

// Mock para coleções em destaque
const collections = [
  {
    id: "1",
    title: "Coleção Masculina",
    description: "Tênis modernos para o dia a dia",
    image: "/images/collections/mens.jpg",
    href: "/category/men",
  },
  {
    id: "2",
    title: "Coleção Feminina",
    description: "Estilo e conforto para todas as ocasiões",
    image: "/images/collections/womens.jpg",
    href: "/category/women",
  },
  {
    id: "3",
    title: "Coleção Esportiva",
    description: "Desempenho e tecnologia para seus treinos",
    image: "/images/collections/sports.jpg",
    href: "/category/sport",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-[550px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="relative h-full w-full bg-gray-900">
            {/* Placeholder para a imagem real do banner */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent" />
          </div>
        </div>
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 text-white sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Coleção Verão 2025
          </h1>
          <p className="mt-6 max-w-lg text-xl">
            Descubra os últimos lançamentos e estilos da estação com descontos
            incríveis.
          </p>
          <div className="mt-8">
            <Link
              href="/category/summer"
              className="inline-block rounded-md bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
            >
              Ver coleção
            </Link>
          </div>
        </div>
      </section>

      {/* Produtos em destaque */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Produtos em destaque
          </h2>
          <Link
            href="/products"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Ver todos
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Banner promocional */}
      <section className="bg-indigo-700">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:flex lg:items-center lg:py-16 lg:px-8">
          <div className="lg:w-0 lg:flex-1">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Frete grátis em compras acima de R$ 299
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-indigo-100">
              Aproveite nossa promoção especial e receba seu pedido em casa sem
              custo adicional.
            </p>
          </div>
          <div className="mt-8 lg:ml-8 lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600 hover:bg-indigo-50"
              >
                Comprar agora
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Coleções em destaque */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Nossas coleções
        </h2>
        <div className="mt-8 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
          {collections.map((collection) => (
            <FeaturedCollection key={collection.id} collection={collection} />
          ))}
        </div>
      </section>

      {/* Depoimentos */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              O que nossos clientes dizem
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Milhares de clientes satisfeitos com seus novos calçados
            </p>
          </div>
          <div className="mt-12 space-y-8 md:grid md:grid-cols-3 md:gap-x-6 md:gap-y-8 md:space-y-0">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg bg-gray-50 p-6 shadow-sm">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500">
                      <span className="text-lg font-medium leading-none text-white">
                        {String.fromCharCode(64 + i)}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Cliente {i}
                    </h3>
                    <div className="mt-1 flex items-center">
                      {[...Array(5)].map((_, j) => (
                        <svg
                          key={j}
                          className={`h-5 w-5 ${j < 5 ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 15.585l-7.07 3.686 1.35-7.865-5.72-5.57 7.892-1.15L10 0l3.548 7.686 7.892 1.15-5.72 5.57 1.35 7.865z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                    <p className="mt-2 text-base text-gray-600">
                      Produto de excelente qualidade e entrega super rápida!
                      Recomendo a todos.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
