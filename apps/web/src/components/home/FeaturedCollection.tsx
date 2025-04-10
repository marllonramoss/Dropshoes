import Link from "next/link";
import Image from "next/image";

type FeaturedCollectionProps = {
  collection: {
    id: string;
    title: string;
    description: string;
    image: string;
    href: string;
  };
};

export function FeaturedCollection({ collection }: FeaturedCollectionProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg">
      <div className="relative h-80 w-full overflow-hidden bg-gray-200 sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 sm:h-64">
        {/* Placeholder - em produção use a imagem real */}
        <div className="absolute inset-0 bg-gray-400" />

        {/* Gradiente para melhorar a legibilidade do texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-60" />
      </div>

      <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-white">
          <Link href={collection.href}>
            <span className="absolute inset-0" />
            {collection.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-gray-200">{collection.description}</p>
      </div>
    </div>
  );
}
