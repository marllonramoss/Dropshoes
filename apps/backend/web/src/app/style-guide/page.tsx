"use client";

import Link from "next/link";
import { ShoppingCart, Heart, ChevronRight } from "lucide-react";
import { colors } from "@/styles/theme";

export default function StyleGuidePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">DropShoes Style Guide</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
          Paleta de Cores Zinc
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(colors.zinc).map(([key, value]) => (
            <div key={key} className="flex items-center">
              <div
                className="w-16 h-16 rounded-md mr-4"
                style={{ backgroundColor: value }}
              />
              <div>
                <div className="font-medium">Zinc-{key}</div>
                <div className="text-zinc-500 text-sm">{value}</div>
                <div className="text-zinc-400 text-sm">bg-zinc-{key}</div>
              </div>
            </div>
          ))}
          <div className="flex items-center">
            <div
              className="w-16 h-16 rounded-md mr-4 border border-zinc-200"
              style={{ backgroundColor: colors.white }}
            />
            <div>
              <div className="font-medium">White</div>
              <div className="text-zinc-500 text-sm">{colors.white}</div>
              <div className="text-zinc-400 text-sm">bg-white</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
          Cores de Ação
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(colors).map(([colorName, colorObj]) => {
            if (
              colorName !== "zinc" &&
              colorName !== "white" &&
              typeof colorObj === "object"
            ) {
              return (
                <div key={colorName} className="space-y-2">
                  {Object.entries(colorObj).map(([shade, value]) => (
                    <div
                      key={`${colorName}-${shade}`}
                      className="flex items-center"
                    >
                      <div
                        className="w-12 h-12 rounded-md mr-3"
                        style={{ backgroundColor: value }}
                      />
                      <div>
                        <div className="font-medium capitalize">
                          {colorName}-{shade}
                        </div>
                        <div className="text-zinc-500 text-sm">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            }
            return null;
          })}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
          Tipografia
        </h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-zinc-900 mb-2">
            Pesos de Fonte
          </h3>
          <div className="space-y-3">
            <div className="font-normal text-lg">
              Font Normal - A rápida raposa marrom pulou sobre o cachorro
              preguiçoso.
            </div>
            <div className="font-medium text-lg">
              Font Medium - A rápida raposa marrom pulou sobre o cachorro
              preguiçoso.
            </div>
            <div className="font-semibold text-lg">
              Font Semibold - A rápida raposa marrom pulou sobre o cachorro
              preguiçoso.
            </div>
            <div className="font-bold text-lg">
              Font Bold - A rápida raposa marrom pulou sobre o cachorro
              preguiçoso.
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-zinc-900 mb-2">
            Tamanhos de Fonte
          </h3>
          <div className="space-y-3">
            <div className="text-xs">Text XS - 12px</div>
            <div className="text-sm">Text SM - 14px</div>
            <div className="text-base">Text Base - 16px</div>
            <div className="text-lg">Text LG - 18px</div>
            <div className="text-xl">Text XL - 20px</div>
            <div className="text-2xl">Text 2XL - 24px</div>
            <div className="text-3xl">Text 3XL - 30px</div>
            <div className="text-4xl">Text 4XL - 36px</div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-zinc-900 mb-4">Botões</h2>

        <div className="flex flex-wrap gap-4 mb-6">
          <button className="bg-zinc-950 text-white px-4 py-2 rounded-md hover:bg-zinc-900 transition-colors">
            Botão Primário
          </button>

          <button className="bg-white text-zinc-950 border border-zinc-200 px-4 py-2 rounded-md hover:bg-zinc-50 transition-colors">
            Botão Secundário
          </button>

          <button className="text-zinc-700 hover:text-zinc-950 font-medium transition-colors">
            Botão de Texto
          </button>
        </div>

        <div className="flex flex-wrap gap-4">
          <button className="bg-zinc-950 text-white px-4 py-2 rounded-md hover:bg-zinc-900 transition-colors flex items-center">
            <ShoppingCart size={18} className="mr-2" />
            Adicionar ao Carrinho
          </button>

          <button className="bg-zinc-950 text-white p-2 rounded-md hover:bg-zinc-900 transition-colors">
            <Heart size={18} />
          </button>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-zinc-900 mb-4">Inputs</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-zinc-700 mb-1"
            >
              Nome Completo
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
              placeholder="Digite seu nome"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="size"
              className="block text-sm font-medium text-zinc-700 mb-1"
            >
              Tamanho
            </label>
            <select
              id="size"
              className="w-full px-3 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
            >
              <option value="">Selecione o tamanho</option>
              <option value="38">38</option>
              <option value="39">39</option>
              <option value="40">40</option>
              <option value="41">41</option>
              <option value="42">42</option>
            </select>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
          Cards de Produto
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-square mb-4 bg-zinc-100 rounded-md">
                {/* Placeholder para imagem */}
                <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
                  Imagem {item}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-zinc-950">
                Tênis Esportivo
              </h3>
              <p className="text-zinc-600 mt-1">Confortável para o dia a dia</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-lg font-bold text-zinc-950">
                  R$ 299,90
                </span>
                <button className="bg-zinc-950 text-white p-2 rounded-md">
                  <ShoppingCart size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-zinc-900 mb-4">Navegação</h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-zinc-900 mb-2">Links</h3>
          <div className="space-y-2">
            <div>
              <Link
                href="#"
                className="text-zinc-900 hover:text-zinc-600 font-medium"
              >
                Link Padrão
              </Link>
            </div>
            <div>
              <Link
                href="#"
                className="text-zinc-900 hover:text-zinc-600 font-medium flex items-center"
              >
                Link com ícone
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            <div>
              <Link
                href="#"
                className="text-blue-500 hover:text-blue-700 font-medium"
              >
                Link destacado
              </Link>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-zinc-900 mb-2">
            Breadcrumbs
          </h3>
          <div className="flex items-center space-x-2 text-sm">
            <Link href="#" className="text-zinc-500 hover:text-zinc-700">
              Home
            </Link>
            <span className="text-zinc-400">/</span>
            <Link href="#" className="text-zinc-500 hover:text-zinc-700">
              Calçados
            </Link>
            <span className="text-zinc-400">/</span>
            <span className="text-zinc-900">Tênis Esportivo</span>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-zinc-900 mb-4">Alertas</h2>

        <div className="space-y-4">
          <div className="bg-green-50 border-l-4 border-green-500 p-4 text-green-700">
            <div className="font-medium">Sucesso!</div>
            <div>Seu pedido foi realizado com sucesso.</div>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 text-amber-700">
            <div className="font-medium">Atenção!</div>
            <div>Produto com poucas unidades em estoque.</div>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
            <div className="font-medium">Erro!</div>
            <div>Não foi possível processar seu pagamento.</div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 text-blue-700">
            <div className="font-medium">Informação</div>
            <div>O prazo de entrega é de 3 a 5 dias úteis.</div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-zinc-900 mb-4">Badges</h2>

        <div className="flex flex-wrap gap-3">
          <span className="bg-zinc-100 text-zinc-800 px-2 py-1 rounded-md text-xs font-medium">
            Padrão
          </span>

          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium">
            Em Estoque
          </span>

          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-xs font-medium">
            Esgotado
          </span>

          <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-md text-xs font-medium">
            Promoção
          </span>

          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium">
            Novo
          </span>
        </div>
      </section>
    </div>
  );
}
