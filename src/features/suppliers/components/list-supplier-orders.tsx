"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ListFilter, PlusCircle } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageResponse } from "@/types/pagination.types";
import { usePaginatedList } from "@/hooks/use-paginated-list";
import DataTablePagination from "@/components/dashboard/data-table-pagination";
import { ROUTES } from "@/constants/route";
import { formatDate } from "@/utils/format-date";
import {
  SUPPLIER_ORDER_STATUS_BADGE_CLASSES,
  SUPPLIER_ORDER_STATUS_LABELS,
} from "../utils/supplier-order-status";
import {
  SupplierOrderRespDto,
  SupplierOrderStatus,
} from "../types/supplier-order.types";

interface ListSupplierOrdersProps {
  initialData: PageResponse<SupplierOrderRespDto>;
  currentPage: number;
  currentStatus: string;
}

const STATUS_OPTIONS = Object.keys(SUPPLIER_ORDER_STATUS_LABELS) as SupplierOrderStatus[];

export default function ListSupplierOrders({
  initialData,
  currentPage,
  currentStatus,
}: ListSupplierOrdersProps) {
  const [orders, setOrders] = useState<PageResponse<SupplierOrderRespDto>>(initialData);

  const { pathname, searchParams, router, buildPageUrl, getPageNumbers } =
    usePaginatedList({
      currentSearch: "",
      currentPage,
      totalPages: orders.totalPages,
    });

  useEffect(() => {
    setOrders(initialData);
  }, [initialData]);

  const handleStatusChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "0");

    if (value === "all") {
      params.delete("status");
    } else {
      params.set("status", value);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Commandes fournisseurs</CardTitle>
        <CardDescription>Suivez les achats passés auprès des fournisseurs.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex items-center justify-between gap-4">
          <Select value={currentStatus || "all"} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[220px]">
              <ListFilter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              {STATUS_OPTIONS.map((status) => (
                <SelectItem key={status} value={status}>
                  {SUPPLIER_ORDER_STATUS_LABELS[status]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button asChild size="sm" className="gap-1 bg-pink-600 hover:bg-pink-700">
            <Link href={ROUTES.DASHBOARD_CREATE_SUPPLIERS_ORDER}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Créer une commande
              </span>
            </Link>
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>N° commande</TableHead>
              <TableHead>Fournisseur</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Nb articles</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.content.length > 0 ? (
              orders.content.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>{order.supplierName}</TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell>{order.items.length}</TableCell>
                  <TableCell>{order.totalAmount.toFixed(2)} €</TableCell>
                  <TableCell>
                    <Badge className={SUPPLIER_ORDER_STATUS_BADGE_CLASSES[order.status]}>
                      {SUPPLIER_ORDER_STATUS_LABELS[order.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={ROUTES.DASHBOARD_SUPPLIERS_ORDER_DETAIL(order.id)}
                      className="text-blue-600 hover:underline"
                    >
                      Voir
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-muted-foreground"
                >
                  Aucune commande fournisseur trouvée.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <DataTablePagination
          totalPages={orders.totalPages}
          totalElements={orders.totalElements}
          currentPage={currentPage}
          first={orders.first}
          last={orders.last}
          buildPageUrl={buildPageUrl}
          getPageNumbers={getPageNumbers}
          itemLabelSingular="commande"
          itemLabelPlural="commandes"
        />
      </CardContent>
    </Card>
  );
}