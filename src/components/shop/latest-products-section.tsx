import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/shop/product-card";
import { ROUTES } from "@/constants/route";
import { getAllProducts } from "@/features/products/services/product.services";

export default async function LatestProductsSection() {
  const products = await getAllProducts(
    0,
    8,
    "createdAt",
    "desc",
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    true,
    true,
  );

  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Nos derniers produits
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              Découvrez les dernières nouveautés de notre catalogue.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href={ROUTES.PRODUCTS_LIST}>Voir tout</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.content.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
