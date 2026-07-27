"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronRight, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryResDto } from "@/features/categories/types/category.types";

interface ProductFiltersProps {
  categories: CategoryResDto[];
  currentCategoryId?: number;
  currentMinPrice?: number;
  currentMaxPrice?: number;
  currentSortBy: string;
  currentSortDir: string;
}

const SORT_OPTIONS = [
  { value: "createdAt:desc", label: "Plus récents" },
  { value: "price:asc", label: "Prix croissant" },
  { value: "price:desc", label: "Prix décroissant" },
  { value: "name:asc", label: "Nom (A-Z)" },
];

export default function ProductFilters({
  categories,
  currentCategoryId,
  currentMinPrice,
  currentMaxPrice,
  currentSortBy,
  currentSortDir,
}: ProductFiltersProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState(currentMinPrice?.toString() ?? "");
  const [maxPrice, setMaxPrice] = useState(currentMaxPrice?.toString() ?? "");

  const hasActiveFilters =
    currentCategoryId !== undefined ||
    currentMinPrice !== undefined ||
    currentMaxPrice !== undefined ||
    !!searchParams.get("search");

  const navigate = (mutate: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "0");
    mutate(params);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCategoryClick = (categoryId?: number) => {
    navigate((params) => {
      if (categoryId === undefined) {
        params.delete("categoryId");
      } else {
        params.set("categoryId", String(categoryId));
      }
    });
  };

  const handleApplyPrice = () => {
    navigate((params) => {
      if (minPrice) {
        params.set("minPrice", minPrice);
      } else {
        params.delete("minPrice");
      }
      if (maxPrice) {
        params.set("maxPrice", maxPrice);
      } else {
        params.delete("maxPrice");
      }
    });
  };

  const handleSortChange = (value: string) => {
    const [sortBy, sortDir] = value.split(":");
    navigate((params) => {
      params.set("sortBy", sortBy);
      params.set("sortDir", sortDir);
    });
  };

  const handleReset = () => {
    router.push(pathname);
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filtre</h2>
          <SlidersHorizontal className="h-5 w-5 text-gray-500" />
        </div>
        <ul className="divide-y">
          <li>
            <button
              type="button"
              onClick={() => handleCategoryClick(undefined)}
              className={`flex w-full items-center justify-between py-3 text-left text-sm ${
                currentCategoryId === undefined
                  ? "font-semibold text-pink-600"
                  : "text-gray-700"
              }`}
            >
              Toutes les catégories
              <ChevronRight className="h-4 w-4" />
            </button>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <button
                type="button"
                onClick={() => handleCategoryClick(category.id)}
                className={`flex w-full items-center justify-between py-3 text-left text-sm ${
                  currentCategoryId === category.id
                    ? "font-semibold text-pink-600"
                    : "text-gray-700"
                }`}
              >
                {category.name}
                <ChevronRight className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold">Prix</h2>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            min={0}
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <span className="text-gray-400">-</span>
          <Input
            type="number"
            min={0}
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <Button
          type="button"
          onClick={handleApplyPrice}
          size="sm"
          className="mt-3 w-full bg-pink-600 hover:bg-pink-700"
        >
          Appliquer
        </Button>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold">Trier par</h2>
        <Select
          value={`${currentSortBy}:${currentSortDir}`}
          onValueChange={handleSortChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleReset}
        >
          Réinitialiser les filtres
        </Button>
      )}
    </div>
  );
}
