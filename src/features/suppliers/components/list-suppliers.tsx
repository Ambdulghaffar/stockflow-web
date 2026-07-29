"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { PlusCircle, Pen, Search } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
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
import { Input } from "@/components/ui/input";
import DataTablePagination from "@/components/dashboard/data-table-pagination";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { usePaginatedList } from "@/hooks/use-paginated-list";
import { PageResponse } from "@/types/pagination.types";
import { ROUTES } from "@/constants/route";
import { formatDate } from "@/utils/format-date";
import { deleteSupplierAction } from "../actions/supplier.actions";
import { SupplierDto } from "../types/supplier.types";

interface ListSuppliersProps {
  initialData: PageResponse<SupplierDto>;
  currentPage: number;
  currentSearch: string;
}

export default function ListSuppliers({
  initialData,
  currentPage,
  currentSearch,
}: ListSuppliersProps) {
  const [suppliers, setSuppliers] = useState<PageResponse<SupplierDto>>(initialData);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();
  const role = session?.user?.roles?.[0];

  const { searchValue, setSearchValue, buildPageUrl, getPageNumbers } =
    usePaginatedList({
      currentSearch,
      currentPage,
      totalPages: suppliers.totalPages,
    });

  useEffect(() => {
    setSuppliers(initialData);
  }, [initialData]);

  const handleDeleteSupplier = (supplierId: number) => {
    setDeletingId(supplierId);
    startTransition(async () => {
      try {
        const result = await deleteSupplierAction(supplierId);
        if (result.success) {
          toast.success("Fournisseur supprimé avec succès !");
          setSuppliers((prev) => ({
            ...prev,
            content: prev.content.filter((supplier) => supplier.id !== supplierId),
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
        <CardTitle>Fournisseurs</CardTitle>
        <CardDescription>Gérez la liste de vos fournisseurs.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher par nom de fournisseur..."
              className="pl-8 w-full"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <Button asChild size="sm" className="gap-1 bg-pink-600 hover:bg-pink-700">
            <Link href={ROUTES.DASHBOARD_CREATE_SUPPLIERS}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Ajouter un fournisseur
              </span>
            </Link>
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead className="hidden md:table-cell">Date de création</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers.content.length > 0 ? (
              suppliers.content.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell className="font-medium">{supplier.name}</TableCell>
                  <TableCell>{supplier.contactName ?? "-"}</TableCell>
                  <TableCell>{supplier.email ?? "-"}</TableCell>
                  <TableCell>{supplier.phone ?? "-"}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {formatDate(supplier.createdAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-3">
                      <Link href={`${ROUTES.DASHBOARD_UPDATE_SUPPLIERS}/${supplier.id}`}>
                        <Pen color="blue" size={16} />
                      </Link>
                      {role === "ADMIN" && (
                        <ConfirmationDialog
                          onConfirm={() => handleDeleteSupplier(supplier.id)}
                          disabled={isPending && deletingId === supplier.id}
                        />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  Aucun fournisseur trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <DataTablePagination
          totalPages={suppliers.totalPages}
          totalElements={suppliers.totalElements}
          currentPage={currentPage}
          first={suppliers.first}
          last={suppliers.last}
          buildPageUrl={buildPageUrl}
          getPageNumbers={getPageNumbers}
          itemLabelSingular="fournisseur"
          itemLabelPlural="fournisseurs"
        />
      </CardContent>
    </Card>
  );
}