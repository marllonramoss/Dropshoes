

const products = [
  {
    name: "Nebula Runner",
    image: "/night-shoes/jordan night.png",
  },
  {
    name: "Stellar Boost",
    image: "/night-shoes/nike sport night.png",
  },
  {
    name: "Lunar Flow",
    image: "/night-shoes/jordan night.png",
  },
  {
    name: "Galaxy Flex",
    image: "/night-shoes/nike sport night.png",
  },
  {
    name: "Eclipse Pro",
    image: "/night-shoes/jordan night.png",
  },
  {
    name: "Cosmic Light",
    image: "/night-shoes/nike sport night.png",
  },
];

export function NightProductsSection() {
  return (
    <section
      className="w-screen h-screen min-h-[600px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-6 md:grid-rows-2 gap-[1px] bg-zinc-900"
      style={{ boxShadow: "0 0 0 100vmax #18181b inset" }}
    >
      {products.map((product, idx) => (
        <div
          key={product.name}
          className="relative group flex items-end justify-center overflow-hidden bg-zinc-900 cursor-pointer transition-all duration-300"
        >
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-700"
            draggable={false}
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-500"
          />
          <div
            className="relative z-10 w-full flex flex-col items-center justify-center pb-8 px-4"
          >
            <span
              className="block text-white text-2xl md:text-3xl font-semibold tracking-wide opacity-0 group-hover:opacity-100 translate-y-8 group-hover:translate-y-0 transition-all duration-500 text-center drop-shadow-xl"
            >
              {product.name}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}
