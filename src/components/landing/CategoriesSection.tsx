import Link from "next/link";
import { Button } from "@/components/ui/button";
import CategoryCard from "@/components/shop/category-card";
import { ROUTES } from "@/constants/route";
import { getAllCategories } from "@/features/categories/services/category.services";

export default async function CategoriesSection() {
  const categories = await getAllCategories(0, 6, "name", "asc", undefined, true);

  return (
    <section className="py-16 bg-black text-white sm:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Découvrez nos catégories
          </h2>
          <Button
            asChild
            variant="outline"
            className="bg-white text-black hover:bg-gray-200"
          >
            <Link href={ROUTES.CATEGORIES_LIST}>Toutes les catégories</Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {categories.content.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              imageUrl={category.imageUrl}
              productCount={category.productCount}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
