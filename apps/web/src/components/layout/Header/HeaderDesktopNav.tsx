import { HeaderCollectionsDropdown } from "./HeaderCollectionsDropdown";
import Link from "next/link";

export function HeaderDesktopNav() {
  return (
    <nav className="hidden lg:flex gap-x-2 items-center">
      {/* Produtos com dropdown de marcas */}
      <div className="relative group">
        <a
          href="#"
          className="h-16 flex items-center px-4 text-sm font-medium text-gray-700 "
        >
          Produtos
        </a>
        <div className="absolute left-0 top-full min-w-full bg-white shadow-lg rounded-b-md py-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-20">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Marca A
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Marca B
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Marca C
          </a>
        </div>
      </div>
      {/* Coleções com dropdown dinâmico */}
      <div className="relative group">
        <a
          href="#"
          className="h-16 flex items-center px-4 text-sm font-medium text-gray-700"
        >
          Coleções
        </a>
        <HeaderCollectionsDropdown />
      </div>
      {/* Night Shoes (exemplo de link fixo) */}
      <Link href="/night-shoes" className="relative h-16 flex items-center px-4 text-sm font-medium text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-900 hover:to-black hover:shadow-lg" style={{ minWidth: "120px" }}>
        <span className="absolute top-2 right-2 text-[10px] bg-pink-600 text-white px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wide shadow-md">
          new
        </span>
        Night Shoes
      </Link>
      <Link href="/ofertas" className="h-16 flex items-center px-4 text-sm font-bold text-red-600 hover:text-red-800">
        Ofertas
      </Link>
    </nav>
  );
}
