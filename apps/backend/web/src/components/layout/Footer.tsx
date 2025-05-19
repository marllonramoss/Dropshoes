import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">DropShoes</h3>
            <p className="text-zinc-400 mb-4">
              Estilo e conforto em cada passo. Nossa missão é oferecer os
              melhores calçados com design moderno e sustentabilidade.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white"
              >
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Produtos</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/category/men"
                  className="text-zinc-400 hover:text-white"
                >
                  Masculino
                </Link>
              </li>
              <li>
                <Link
                  href="/category/women"
                  className="text-zinc-400 hover:text-white"
                >
                  Feminino
                </Link>
              </li>
              <li>
                <Link
                  href="/category/kids"
                  className="text-zinc-400 hover:text-white"
                >
                  Infantil
                </Link>
              </li>
              <li>
                <Link
                  href="/category/sport"
                  className="text-zinc-400 hover:text-white"
                >
                  Esportivo
                </Link>
              </li>
              <li>
                <Link
                  href="/category/sales"
                  className="text-zinc-400 hover:text-white"
                >
                  Ofertas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Informações</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-zinc-400 hover:text-white">
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link
                  href="/sustainability"
                  className="text-zinc-400 hover:text-white"
                >
                  Sustentabilidade
                </Link>
              </li>
              <li>
                <Link href="/stores" className="text-zinc-400 hover:text-white">
                  Nossas lojas
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-zinc-400 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-zinc-400 hover:text-white"
                >
                  Trabalhe conosco
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Atendimento</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-zinc-400 hover:text-white"
                >
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-zinc-400 hover:text-white">
                  Perguntas frequentes
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-zinc-400 hover:text-white"
                >
                  Envio e entregas
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-zinc-400 hover:text-white"
                >
                  Trocas e devoluções
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-zinc-400 hover:text-white"
                >
                  Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-12 pt-8 text-center text-zinc-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} DropShoes. Todos os direitos
            reservados.
          </p>
          <p className="mt-2">
            <Link href="/terms" className="hover:text-white">
              Termos de uso
            </Link>
            {" | "}
            <Link href="/privacy" className="hover:text-white">
              Política de privacidade
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
