"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";

interface UsePaginatedListParams {
  currentSearch: string;
  currentPage: number;
  totalPages: number;
}

export function usePaginatedList({
  currentSearch,
  currentPage,
  totalPages,
}: UsePaginatedListParams) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchValue, setSearchValue] = useState(currentSearch);
  // Attend 500ms après la dernière frappe avant de mettre à jour l'URL
  const debouncedSearch = useDebounce(searchValue, 500);

  // Déclenche la navigation quand debouncedSearch change
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Ignore le premier rendu — évite un push inutile au montage
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "0");

    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }

    router.push(`${pathname}?${params.toString()}`);
  }, [debouncedSearch, pathname, router, searchParams]);

  // Construit l'URL pour une page donnée
  const buildPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    return `${pathname}?${params.toString()}`;
  };

  // Génère les numéros de pages à afficher avec ellipsis
  const getPageNumbers = (): (number | "ellipsis")[] => {
    const total = totalPages;
    const current = currentPage;
    const pages: (number | "ellipsis")[] = [];

    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i);
    }

    pages.push(0);
    if (current > 2) pages.push("ellipsis");

    const start = Math.max(1, current - 1);
    const end = Math.min(total - 2, current + 1);
    for (let i = start; i <= end; i++) pages.push(i);

    if (current < total - 3) pages.push("ellipsis");
    pages.push(total - 1);

    return pages;
  };

  return {
    pathname,
    searchParams,
    router,
    searchValue,
    setSearchValue,
    buildPageUrl,
    getPageNumbers,
  };
}
