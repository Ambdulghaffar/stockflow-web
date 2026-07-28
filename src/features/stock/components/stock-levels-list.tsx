"use client";

import { Boxes } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StockAdjustmentDialog from "@/features/stock/components/stock-adjustment-dialog";
import { getStockBadgeClasses } from "@/features/products/utils/stock-badge";
import {
  ProductResDto,
  ProductStatus,
} from "@/features/products/types/product.types";
import { PageResponse } from "@/types/pagination.types";

interface StockLevelsListProps {
  initialData: PageResponse<ProductResDto>;
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

export default function StockLevelsList({
  initialData,
}: StockLevelsListProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>État des stocks</CardTitle>
          <CardDescription>
            Vue d&apos;ensemble des niveaux de stock, triée du plus critique au
            moins critique.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialData.content.length > 0 ? (
                initialData.content.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 rounded-md">
                          <AvatarImage
                            src={product.imageUrl ?? ""}
                            alt={product.name}
                            className="object-cover"
                          />
                          <AvatarFallback className="rounded-md text-xs">
                            {product.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span>{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{product.categoryName}</TableCell>
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
                    <TableCell>
                      <StockAdjustmentDialog
                        productId={product.id}
                        productName={product.name}
                        currentStock={product.stock}
                        trigger={
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-1.5"
                          >
                            <Boxes className="h-3.5 w-3.5" />
                            Ajuster
                          </Button>
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-24 text-center text-muted-foreground"
                  >
                    Aucun produit trouvé.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
