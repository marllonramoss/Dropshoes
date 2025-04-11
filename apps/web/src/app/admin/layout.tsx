import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Administração - DropShoes",
  description: "Área administrativa DropShoes",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`min-h-screen bg-gray-100 ${inter.className}`}>
      <Toaster position="top-right" />
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="text-xl font-bold text-gray-800">
                DropShoes Admin
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/admin" className="text-gray-600 hover:text-gray-800">
                Dashboard
              </a>
              <a
                href="/admin/produtos"
                className="text-gray-600 hover:text-gray-800"
              >
                Produtos
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      </div>
    </div>
  );
}
