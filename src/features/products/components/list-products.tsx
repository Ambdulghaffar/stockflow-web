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
import { ProductResDto, ProductStatus } from "../types/product.types";
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
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] =
    useState<PageResponse<ProductResDto>>(initialData);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(currentSearch);
  // Attend 500ms après la dernière frappe avant de mettre à jour l'URL
  const debouncedSearch = useDebounce(searchValue, 500);

  // Sync le state quand initialData change (navigation pagination/filtre)
  useEffect(() => {
    setProducts(initialData);
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
    const total = products.totalPages;
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
        {products.totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-muted-foreground">
              {products.totalElements} produit
              {products.totalElements > 1 ? "s" : ""} au total
            </p>
            <Pagination>
              <PaginationContent>
                {/* Précédent */}
                <PaginationItem>
                  <PaginationPrevious
                    href={products.first ? "#" : buildPageUrl(currentPage - 1)}
                    aria-disabled={products.first}
                    className={
                      products.first ? "pointer-events-none opacity-50" : ""
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
                    href={products.last ? "#" : buildPageUrl(currentPage + 1)}
                    aria-disabled={products.last}
                    className={
                      products.last ? "pointer-events-none opacity-50" : ""
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
