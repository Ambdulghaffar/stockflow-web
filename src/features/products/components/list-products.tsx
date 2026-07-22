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
import { ProductResDto, ProductStatus } from "../types/product.types";
import { ROUTES } from "@/constants/route";
import { truncateText } from "@/utils/truncate-text";
import { formatDate } from "@/utils/format-date";
import { PageResponse } from "@/types/pagination.types";
import { usePaginatedList } from "@/hooks/use-paginated-list";
import { Input } from "@/components/ui/input";
import DataTablePagination from "@/components/dashboard/data-table-pagination";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { toast } from "react-toastify";
import { deleteProductAction } from "../actions/product.actions";

interface ListProductsProps {
  initialData: PageResponse<ProductResDto>;
  currentPage: number;
  currentSearch: string;
}

const STATUS_LABELS: Record<ProductStatus, string> = {
  ACTIVE: "Actif",
  INACTIVE: "Inactif",
  OUT_OF_STOCK: "Rupture de stock",
};

const getStatusBadgeClasses = (status: ProductStatus): string => {
  switch (status) {
    case "ACTIVE":
      return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300";
    case "OUT_OF_STOCK":
      return "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300";
    case "INACTIVE":
    default:
      return "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
  }
};

const getStockBadgeClasses = (stock: number): string => {
  if (stock === 0) {
    return "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300";
  }
  if (stock <= 10) {
    return "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300";
  }
  return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300";
};

export default function ListProducts({
  initialData,
  currentPage,
  currentSearch,
}: ListProductsProps) {
  const [products, setProducts] =
    useState<PageResponse<ProductResDto>>(initialData);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const { searchValue, setSearchValue, buildPageUrl, getPageNumbers } =
    usePaginatedList({
      currentSearch,
      currentPage,
      totalPages: products.totalPages,
    });

  // Sync le state quand initialData change (navigation pagination/filtre)
  useEffect(() => {
    setProducts(initialData);
  }, [initialData]);

  const handleDeleteProduct = (productId: number) => {
    setDeletingId(productId);
    startTransition(async () => {
      try {
        const result = await deleteProductAction(productId);
        if (result.success) {
          toast.success("Produit supprimé avec succès !");
          setProducts((prev) => ({
            ...prev,
            content: prev.content.filter((p) => p.id !== productId),
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
        <CardTitle>Produits</CardTitle>
        <CardDescription>Gérez le catalogue de produits.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filtres + bouton ajout */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher par nom de produit..."
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
            <Link href={ROUTES.DASHBOARD_CREATE_PRODUCTS}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Ajouter un produit
              </span>
            </Link>
          </Button>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="hidden md:table-cell">
                Date de création
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.content.length > 0 ? (
              products.content.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    {truncateText(product.name, 40)}
                  </TableCell>
                  <TableCell>{product.categoryName}</TableCell>
                  <TableCell>{product.price.toFixed(2)} €</TableCell>
                  <TableCell>
                    <Badge className={getStockBadgeClasses(product.stock)}>
                      {product.stock}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeClasses(product.status)}>
                      {STATUS_LABELS[product.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {formatDate(product.createdAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Link
                        href={`${ROUTES.DASHBOARD_UPDATE_PRODUCTS}/${product.id}`}
                      >
                        <Pen color="blue" size={16} />
                      </Link>
                      <ConfirmationDialog
                        onConfirm={() => handleDeleteProduct(product.id)}
                        disabled={isPending && deletingId === product.id}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-muted-foreground"
                >
                  Aucun produit trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <DataTablePagination
          totalPages={products.totalPages}
          totalElements={products.totalElements}
          currentPage={currentPage}
          first={products.first}
          last={products.last}
          buildPageUrl={buildPageUrl}
          getPageNumbers={getPageNumbers}
          itemLabelSingular="produit"
          itemLabelPlural="produits"
        />
      </CardContent>
    </Card>
  );
}
