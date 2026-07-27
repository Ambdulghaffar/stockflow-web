import Link from "next/link";
import { notFound } from "next/navigation";
import { Package } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import WishlistButton from "@/components/shop/wishlist-button";
import ProductDetailActions from "@/features/products/components/product-detail-actions";
import { getProductById } from "@/features/products/services/product.services";
import { ROUTES } from "@/constants/route";
import { ProductStatus } from "@/features/products/types/product.types";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

const STATUS_LABELS: Record<ProductStatus, string> = {
  ACTIVE: "Disponible",
  INACTIVE: "Indisponible",
  OUT_OF_STOCK: "Rupture de stock",
};

const STATUS_BADGE_CLASSES: Record<ProductStatus, string> = {
  ACTIVE: "bg-emerald-50 text-emerald-700",
  INACTIVE: "bg-gray-200 text-gray-700",
  OUT_OF_STOCK: "bg-red-50 text-red-700",
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) notFound();

  const product = await getProductById(numericId);
  if (!product) notFound();

  const isOutOfStock = product.status === "OUT_OF_STOCK";

  return (
    <div className="container mx-auto px-4 py-8 pb-28 md:px-6 lg:pb-8">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={ROUTES.HOME}>Accueil</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={ROUTES.PRODUCTS_LIST}>Produits</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href={`${ROUTES.PRODUCTS_LIST}?categoryId=${product.categoryId}`}
              >
                {product.categoryName}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-50">
          {product.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.imageUrl}
              alt={product.name}
              className={`h-full w-full object-cover ${
                isOutOfStock ? "opacity-70" : ""
              }`}
            />
          ) : (
            <div
              className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-200 to-pink-100 ${
                isOutOfStock ? "opacity-70" : ""
              }`}
            >
              <Package className="h-20 w-20 text-pink-400" />
            </div>
          )}

          {isOutOfStock && (
            <span className="absolute left-4 top-4 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
              Rupture de stock
            </span>
          )}

          <WishlistButton className="absolute right-4 top-4 h-10 w-10" />
        </div>

        <div className="flex flex-col">
          <p className="text-sm text-gray-500">{product.categoryName}</p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            {product.name}
          </h1>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl font-bold text-gray-900">
              {product.price.toFixed(2)} €
            </span>
            <Badge className={STATUS_BADGE_CLASSES[product.status]}>
              {STATUS_LABELS[product.status]}
            </Badge>
          </div>

          <p className="mt-6 whitespace-pre-line text-gray-600">
            {product.description}
          </p>

          <div className="mt-8 hidden lg:block">
            <ProductDetailActions
              status={product.status}
              productId={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
              stock={product.stock}
            />
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t bg-white p-4 lg:hidden">
        <ProductDetailActions
          status={product.status}
          productId={product.id}
          name={product.name}
          price={product.price}
          imageUrl={product.imageUrl}
          stock={product.stock}
        />
      </div>
    </div>
  );
}
