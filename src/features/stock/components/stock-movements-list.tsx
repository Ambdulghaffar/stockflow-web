"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PlusCircle } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DataTablePagination from "@/components/dashboard/data-table-pagination";
import StockAdjustmentDialog from "@/features/stock/components/stock-adjustment-dialog";
import {
  STOCK_MOVEMENT_TYPE_BADGE_CLASSES,
  STOCK_MOVEMENT_TYPE_LABELS,
  isPositiveMovement,
} from "@/features/stock/constants/stock-movement-badge";
import { StockMovementDto } from "@/features/stock/types/stock-movement.types";
import { ProductResDto } from "@/features/products/types/product.types";
import { PageResponse } from "@/types/pagination.types";
import { ROUTES } from "@/constants/route";
import { formatDate } from "@/utils/format-date";
import { truncateText } from "@/utils/truncate-text";
import { getPageNumbers } from "@/utils/pagination";

interface StockMovementsListProps {
  initialData: PageResponse<StockMovementDto>;
  currentPage: number;
  currentType: string;
  products: Pick<ProductResDto, "id" | "name" | "stock">[];
}

const TYPE_FILTER_OPTIONS: { value: string; label: string }[] = [
  { value: "ALL", label: "Tous" },
  { value: "SALE", label: "Ventes" },
  { value: "CANCELLATION", label: "Annulations" },
  { value: "RESTOCK", label: "Réassorts" },
  { value: "DAMAGE", label: "Casse/Perte" },
];

export default function StockMovementsList({
  initialData,
  currentPage,
  currentType,
  products,
}: StockMovementsListProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const buildPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    return `${pathname}?${params.toString()}`;
  };

  const handleTypeChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "0");
    if (value === "ALL") {
      params.delete("type");
    } else {
      params.set("type", value);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Historique des mouvements de stock</CardTitle>
          <CardDescription>
            Historique complet des entrées et sorties de stock.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex items-center justify-between gap-4">
            <Select
              value={currentType || "ALL"}
              onValueChange={handleTypeChange}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrer par type" />
              </SelectTrigger>
              <SelectContent>
                {TYPE_FILTER_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <StockAdjustmentDialog
              products={products}
              trigger={
                <Button
                  size="sm"
                  className="gap-1 bg-pink-600 hover:bg-pink-700"
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  Nouvel ajustement
                </Button>
              }
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Produit</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Quantité</TableHead>
                <TableHead>Motif</TableHead>
                <TableHead>Commande liée</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialData.content.length > 0 ? (
                initialData.content.map((movement) => {
                  const isPositive = isPositiveMovement(movement.type);
                  return (
                    <TableRow key={movement.id}>
                      <TableCell>{formatDate(movement.createdAt)}</TableCell>
                      <TableCell className="font-medium">
                        {movement.productName}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            STOCK_MOVEMENT_TYPE_BADGE_CLASSES[movement.type]
                          }
                        >
                          {STOCK_MOVEMENT_TYPE_LABELS[movement.type]}
                        </Badge>
                      </TableCell>
                      <TableCell
                        className={
                          isPositive
                            ? "font-medium text-emerald-600"
                            : "font-medium text-red-600"
                        }
                      >
                        {isPositive ? "+" : "-"}
                        {movement.quantity}
                      </TableCell>
                      <TableCell title={movement.reason}>
                        {truncateText(movement.reason, 40)}
                      </TableCell>
                      <TableCell>
                        {movement.orderId ? (
                          <Link
                            href={ROUTES.DASHBOARD_SALES_ORDERS}
                            className="text-blue-600 hover:underline"
                          >
                            #{movement.orderId}
                          </Link>
                        ) : (
                          "—"
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-muted-foreground"
                  >
                    Aucun mouvement trouvé.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <DataTablePagination
            totalPages={initialData.totalPages}
            totalElements={initialData.totalElements}
            currentPage={currentPage}
            first={initialData.first}
            last={initialData.last}
            buildPageUrl={buildPageUrl}
            getPageNumbers={() =>
              getPageNumbers(initialData.totalPages, currentPage)
            }
            itemLabelSingular="mouvement"
            itemLabelPlural="mouvements"
          />
        </CardContent>
      </Card>
    </>
  );
}
