"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ListFilter } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { OrderRespDto, OrderStatus } from "../types/order.types";
import { PageResponse } from "@/types/pagination.types";
import { ROUTES } from "@/constants/route";
import { formatDate } from "@/utils/format-date";
import { usePaginatedList } from "@/hooks/use-paginated-list";
import DataTablePagination from "@/components/dashboard/data-table-pagination";
import {
  ORDER_STATUS_BADGE_CLASSES,
  ORDER_STATUS_LABELS,
} from "../constants/order-status";

interface ListOrdersProps {
  initialData: PageResponse<OrderRespDto>;
  currentPage: number;
  currentStatus: string;
}

const STATUS_OPTIONS = Object.keys(ORDER_STATUS_LABELS) as OrderStatus[];

export default function ListOrders({
  initialData,
  currentPage,
  currentStatus,
}: ListOrdersProps) {
  const [orders, setOrders] = useState<PageResponse<OrderRespDto>>(initialData);

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
        <CardTitle>Commandes</CardTitle>
        <CardDescription>Gérez les commandes de vos clients.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex items-center justify-between gap-4">
          <Select
            value={currentStatus || "all"}
            onValueChange={handleStatusChange}
          >
            <SelectTrigger className="w-[200px]">
              <ListFilter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              {STATUS_OPTIONS.map((status) => (
                <SelectItem key={status} value={status}>
                  {ORDER_STATUS_LABELS[status]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>N° commande</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Articles</TableHead>
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
                  <TableCell>{order.customerUsername}</TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell>{order.items.length}</TableCell>
                  <TableCell>{order.totalAmount.toFixed(2)} €</TableCell>
                  <TableCell>
                    <Badge className={ORDER_STATUS_BADGE_CLASSES[order.status]}>
                      {ORDER_STATUS_LABELS[order.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={ROUTES.DASHBOARD_SALES_ORDER_DETAIL(order.id)}
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
                  Aucune commande trouvée.
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
