"use client";
import { SignedIn, SignedOut, useUser, useClerk } from '@clerk/nextjs';
import Link from "next/link";
import { User, Check, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export function HeaderUserMenu() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: PointerEvent) {
      const dropdown = dropdownRef.current;
      const button = btnRef.current;
      const target = event.target as Node;
      // DEBUG: veja se aparece ao clicar na hero
      console.log("Pointer event detected", { target });
      if (
        dropdown && !dropdown.contains(target) &&
        button && !button.contains(target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", handleClickOutside, true);
    return () => document.removeEventListener("pointerdown", handleClickOutside, true);
  }, [open]);

  // Handler para fechar dropdown ao clicar fora
  function handleBlur(e: React.FocusEvent<HTMLButtonElement>) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setOpen(false);
    }
  }

  return (
    <div className="relative">
      <SignedIn>
        <button
          ref={btnRef}
          type="button"
          className="p-2 text-gray-400 hover:text-gray-500 relative"
          aria-label="Menu do usuário"
          onClick={() => setOpen((v) => !v)}
        >
          <User className="h-5 w-5" aria-hidden="true" />
          <span className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5 flex items-center justify-center">
            <Check className="w-3 h-3 text-white" aria-label="Logado" />
          </span>
        </button>
        {open && (
          <div ref={dropdownRef} className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-50">
            <button
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-gray-700 rounded-t-md"
              onClick={() => {
                setOpen(false);
                router.push("/minha-conta");
              }}
            >
              Minha conta
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-gray-700 rounded-b-md"
              onClick={() => { setOpen(false); signOut(); }}
            >
              Sair
            </button>
          </div>
        )}
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in" prefetch={false}>
          <button
            type="button"
            className="p-2 text-gray-400 hover:text-gray-500 relative"
            aria-label="Entrar"
          >
            <User className="h-5 w-5" aria-hidden="true" />
            <span className="absolute -top-1 -right-1 bg-gray-200/80 rounded-full flex items-center justify-center" style={{ width: 18, height: 18 }}>
              <X className="w-3.5 h-3.5 text-gray-400" aria-label="Não logado" />
            </span>
          </button>
        </Link>
      </SignedOut>
    </div>
  );
}
