import Link from "next/link";
import { ArrowRight, Box } from "lucide-react";
import { ROUTES } from "@/constants/route";

interface CategoryCardProps {
  id: number;
  name: string;
  imageUrl: string | null;
  productCount: number;
}

export default function CategoryCard({
  id,
  name,
  imageUrl,
  productCount,
}: CategoryCardProps) {
  return (
    <Link href={`${ROUTES.PRODUCTS_LIST}?categoryId=${id}`} className="group block">
      <div className="aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-pink-200 to-pink-100">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Box className="h-12 w-12 text-pink-400" />
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-gray-500">{productCount} produits</p>
        </div>
        <ArrowRight className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
