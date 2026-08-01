import CategoryCard from "@/components/shop/category-card";
import { getAllCategories } from "@/features/categories/services/category.services";

export const revalidate = 60;

export default async function CategoriesCatalogPage() {
  const categories = await getAllCategories(0, 50, "name", "asc", undefined, true);

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <h1 className="mb-10 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Toutes nos catégories
      </h1>

      {categories.content.length === 0 ? (
        <p className="text-gray-600">Aucune catégorie disponible pour le moment.</p>
      ) : (
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
      )}
    </div>
  );
}
