import Link from "next/link";

export function HeaderLogo() {
  return (
    <Link href="/" className="ml-4 lg:ml-0">
      <span className="sr-only">DropShoes</span>
      <div className="h-8 w-auto text-xl font-bold text-zinc-950">
        DropShoes
      </div>
    </Link>
  );
}
