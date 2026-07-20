"use client";
import React, { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { PlusCircle, Pen, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CategoryResDto } from "../types/category.types";
import { ROUTES } from "@/constants/route";
import { truncateText } from "@/utils/truncate-text";
import { formatDate } from "@/utils/format-date";
import { PageResponse } from "@/types/pagination.types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { toast } from "react-toastify";
import { deleteCategoryAction } from "../actions/category.actions";

interface ListCategoriesProps {
  initialData: PageResponse<CategoryResDto>;
  currentPage: number;
  currentSearch: string;
}

export default function ListCategories({
  initialData,
  currentPage,
  currentSearch,
}: ListCategoriesProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [categories, setCategories] =
    useState<PageResponse<CategoryResDto>>(initialData);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(currentSearch);
  // Attend 500ms après la dernière frappe avant de mettre à jour l'URL
  const debouncedSearch = useDebounce(searchValue, 500);

  // Sync le state quand initialData change (navigation pagination/filtre)
  useEffect(() => {
    setCategories(initialData);
  }, [initialData]);

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

  const getPageNumbers = () => {
    const total = categories.totalPages;
    const current = currentPage;
    const pages: (number | "ellipsis")[] = [];

    if (total <= 5) {
      // Moins de 5 pages → on affiche tout
      return Array.from({ length: total }, (_, i) => i);
    }

    // Toujours afficher la première page
    pages.push(0);

    if (current > 2) pages.push("ellipsis");

    // Pages autour de la page courante
    const start = Math.max(1, current - 1);
    const end = Math.min(total - 2, current + 1);
    for (let i = start; i <= end; i++) pages.push(i);

    if (current < total - 3) pages.push("ellipsis");

    // Toujours afficher la dernière page
    pages.push(total - 1);

    return pages;
  };

  const handleDeleteCategory = (categoryId: number) => {
    setDeletingId(categoryId);
    startTransition(async () => {
      try {
        const result = await deleteCategoryAction(categoryId);
        if (result.success) {
          toast.success("Catégorie supprimée avec succès !");
          setCategories((prev) => ({
            ...prev,
            content: prev.content.filter((u) => u.id !== categoryId),
            totalElements: prev.totalElements - 1,
          }));
        } else {
          toast.error(result.error || "Erreur lors de la suppression");
        }
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Une erreur est survenue lors de la suppression",
        );
      } finally {
        setDeletingId(null);
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Catégories</CardTitle>
        <CardDescription>Gérez les catégories de produits.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filtres + bouton ajout */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher par nom de catégorie..."
                className="pl-8 w-full"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>
          <Button
            asChild
            size="sm"
            className="gap-1 bg-pink-600 hover:bg-pink-700"
          >
            <Link href={ROUTES.DASHBOARD_CREATE_CATEGORIES}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Ajouter une catégorie
              </span>
            </Link>
          </Button>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Nombre de produits</TableHead>
              <TableHead>Image</TableHead>
              <TableHead className="hidden md:table-cell">
                Date de création
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.content.length > 0 ? (
              categories.content.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell title={category.description}>
                    {truncateText(category.description, 40)}
                  </TableCell>
                  <TableCell className="text-center text-pink-600">
                    {category.productCount}
                  </TableCell>
                  <TableCell>
                    {category.imageUrl ? (
                      <Badge variant="secondary" className="text-xs">
                        Image présente
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">
                        Pas d&apos;image
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {formatDate(category.createdAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Link
                        href={`${ROUTES.DASHBOARD_UPDATE_CATEGORIES}/${category.id}`}
                      >
                        <Pen color="blue" size={16} />
                      </Link>
                      <ConfirmationDialog
                        onConfirm={() => handleDeleteCategory(category.id)}
                        disabled={isPending && deletingId === category.id}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground"
                >
                  Aucune catégorie trouvée.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {categories.totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-muted-foreground">
              {categories.totalElements} catégorie
              {categories.totalElements > 1 ? "s" : ""} au total
            </p>
            <Pagination>
              <PaginationContent>
                {/* Précédent */}
                <PaginationItem>
                  <PaginationPrevious
                    href={
                      categories.first ? "#" : buildPageUrl(currentPage - 1)
                    }
                    aria-disabled={categories.first}
                    className={
                      categories.first ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {/* Numéros de pages */}
                {getPageNumbers().map((item, index) =>
                  item === "ellipsis" ? (
                    <PaginationItem key={`ellipsis-${index}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={item}>
                      <PaginationLink
                        href={buildPageUrl(item)}
                        isActive={item === currentPage}
                      >
                        {item + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}

                {/* Suivant */}
                <PaginationItem>
                  <PaginationNext
                    href={categories.last ? "#" : buildPageUrl(currentPage + 1)}
                    aria-disabled={categories.last}
                    className={
                      categories.last ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
