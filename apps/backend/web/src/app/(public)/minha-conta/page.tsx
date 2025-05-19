"use client";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function MinhaContaPage() {
  const { user, isLoaded } = useUser();

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Minha Conta</h1>
      <SignedOut>
        <div className="text-center">
          <p className="mb-4">Você precisa estar logado para acessar esta página.</p>
          <Link href="/sign-in" className="text-blue-600 hover:underline">Entrar</Link>
        </div>
      </SignedOut>
      <SignedIn>
        {isLoaded && user && (
          <div className="space-y-6">
            <div>
              <span className="block text-sm text-gray-600">Nome</span>
              <span className="block text-lg font-medium">{user.fullName || user.username || "-"}</span>
            </div>
            <div>
              <span className="block text-sm text-gray-600">E-mail</span>
              <span className="block text-lg font-medium">{user.primaryEmailAddress?.emailAddress || "-"}</span>
            </div>
            <div>
              <span className="block text-sm text-gray-600">ID do usuário</span>
              <span className="block text-xs font-mono">{user.id}</span>
            </div>

            <div className="flex gap-4 mt-6">
              <Link
                href="https://dashboard.clerk.com/user"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 border"
              >
                Gerenciar conta no Clerk
              </Link>
              {/* Futuro: adicionar opção de editar dados diretamente aqui */}
            </div>
          </div>
        )}
      </SignedIn>
    </div>
  );
}
