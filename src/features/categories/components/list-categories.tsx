"use client";
import React, { useEffect, useState, useTransition } from "react";
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
import { usePaginatedList } from "@/hooks/use-paginated-list";
import { Input } from "@/components/ui/input";
import DataTablePagination from "@/components/dashboard/data-table-pagination";
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
  const [categories, setCategories] =
    useState<PageResponse<CategoryResDto>>(initialData);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const { searchValue, setSearchValue, buildPageUrl, getPageNumbers } =
    usePaginatedList({
      currentSearch,
      currentPage,
      totalPages: categories.totalPages,
    });

  // Sync le state quand initialData change (navigation pagination/filtre)
  useEffect(() => {
    setCategories(initialData);
  }, [initialData]);

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
        <DataTablePagination
          totalPages={categories.totalPages}
          totalElements={categories.totalElements}
          currentPage={currentPage}
          first={categories.first}
          last={categories.last}
          buildPageUrl={buildPageUrl}
          getPageNumbers={getPageNumbers}
          itemLabelSingular="catégorie"
          itemLabelPlural="catégories"
        />
      </CardContent>
    </Card>
  );
}
