import { Suspense } from "react";
import Link from "next/link";
import { PackageSearch, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ProductCard from "@/components/shop/product-card";
import PublicPagination from "@/components/shop/public-pagination";
import ProductFilters from "@/features/products/components/product-filters";
import { getAllProducts } from "@/features/products/services/product.services";
import { getAllCategories } from "@/features/categories/services/category.services";
import { ROUTES } from "@/constants/route";

interface ProductsCatalogPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    categoryId?: string;
    minPrice?: string;
    maxPrice?: string;
    sortBy?: string;
    sortDir?: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function ProductsCatalogPage({
  searchParams,
}: ProductsCatalogPageProps) {
  const {
    page,
    search,
    categoryId,
    minPrice,
    maxPrice,
    sortBy = "createdAt",
    sortDir = "desc",
  } = await searchParams;

  const currentPage = Number(page) || 0;
  const parsedCategoryId = categoryId ? Number(categoryId) : undefined;
  const parsedMinPrice = minPrice ? Number(minPrice) : undefined;
  const parsedMaxPrice = maxPrice ? Number(maxPrice) : undefined;

  const [products, categories] = await Promise.all([
    getAllProducts(
      currentPage,
      9,
      sortBy,
      sortDir,
      undefined,
      parsedCategoryId,
      search,
      parsedMinPrice,
      parsedMaxPrice,
      true,
    ),
    getAllCategories(0, 50, "name", "asc"),
  ]);

  const activeCategory = categories.content.find(
    (category) => category.id === parsedCategoryId,
  );

  const title = activeCategory
    ? `Catégorie : ${activeCategory.name}`
    : "Tous nos produits";

  const buildPageUrl = (targetPage: number) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (parsedCategoryId !== undefined)
      params.set("categoryId", String(parsedCategoryId));
    if (parsedMinPrice !== undefined)
      params.set("minPrice", String(parsedMinPrice));
    if (parsedMaxPrice !== undefined)
      params.set("maxPrice", String(parsedMaxPrice));
    params.set("sortBy", sortBy);
    params.set("sortDir", sortDir);
    params.set("page", String(targetPage));
    return `${ROUTES.PRODUCTS_LIST}?${params.toString()}`;
  };

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="mb-8 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {title}
        </h1>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2 lg:hidden">
              <SlidersHorizontal className="h-4 w-4" />
              Filtres
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filtre</SheetTitle>
            </SheetHeader>
            <div className="px-4 pb-6">
              <Suspense fallback={null}>
                <ProductFilters
                  categories={categories.content}
                  currentCategoryId={parsedCategoryId}
                  currentMinPrice={parsedMinPrice}
                  currentMaxPrice={parsedMaxPrice}
                  currentSortBy={sortBy}
                  currentSortDir={sortDir}
                />
              </Suspense>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="hidden lg:block lg:w-[280px] lg:shrink-0">
          <Suspense fallback={null}>
            <ProductFilters
              categories={categories.content}
              currentCategoryId={parsedCategoryId}
              currentMinPrice={parsedMinPrice}
              currentMaxPrice={parsedMaxPrice}
              currentSortBy={sortBy}
              currentSortDir={sortDir}
            />
          </Suspense>
        </div>

        <div className="flex-1">
          {products.content.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-gray-50 py-24 text-center">
              <PackageSearch className="h-12 w-12 text-gray-400" />
              <div>
                <p className="font-semibold text-gray-900">
                  Aucun produit ne correspond à votre recherche
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Essayez d&apos;élargir vos critères ou réinitialisez les
                  filtres.
                </p>
              </div>
              <Button asChild variant="outline">
                <Link href={ROUTES.PRODUCTS_LIST}>
                  Réinitialiser les filtres
                </Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.content.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>

              <div className="mt-10 flex justify-center">
                <PublicPagination
                  currentPage={products.page}
                  totalPages={products.totalPages}
                  first={products.first}
                  last={products.last}
                  buildPageUrl={buildPageUrl}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
