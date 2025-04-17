import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";
import { CollectionsProvider } from "@/components/layout/CollectionsProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DropShoes | A melhor loja de calçados online",
  description:
    "Compre os melhores calçados com entrega rápida direto para sua casa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className={`${inter.className} flex min-h-full flex-col`}>
        <CollectionsProvider>
          <Providers>
            <main className="flex-grow">{children}</main>
          </Providers>
        </CollectionsProvider>
      </body>
    </html>
  );
}
