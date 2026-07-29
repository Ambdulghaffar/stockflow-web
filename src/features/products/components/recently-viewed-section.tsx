"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/shop/product-card";
import { useRecentlyViewed } from "../context/recently-viewed-context";
import { getProductsByIdsAction } from "../actions/product.actions";
import { ProductResDto } from "../types/product.types";

export default function RecentlyViewedSection({
  excludeProductId,
}: {
  excludeProductId?: number;
}) {
  const { recentlyViewed, hasHydrated } = useRecentlyViewed();
  const [products, setProducts] = useState<ProductResDto[]>([]);

  const ids = recentlyViewed
    .map((item) => item.productId)
    .filter((id) => id !== excludeProductId);

  useEffect(() => {
    if (!hasHydrated || ids.length === 0) {
      setProducts([]);
      return;
    }

    let cancelled = false;
    getProductsByIdsAction(ids).then((fetched) => {
      if (!cancelled) setProducts(fetched);
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasHydrated, ids.join(",")]);

  if (!hasHydrated || products.length === 0) return null;

  return (
    <section className="mt-16 border-t pt-10">
      <h2 className="text-2xl font-bold text-gray-900">Vus récemment</h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
