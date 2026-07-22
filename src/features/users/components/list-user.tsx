"use client";

import React, { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PlusCircle, Search, ListFilter, Pen } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { UserDto } from "@/features/users/types/user.types";
import { PageResponse } from "@/types/pagination.types";
import { ROUTES } from "@/constants/route";
import { formatDate } from "@/utils/format-date";
import { truncateText } from "@/utils/truncate-text";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { deleteUserAction } from "../actions/user.actions";
import { toast } from "react-toastify";
import { ApiError } from "@/types/api.types";
import { useDebounce } from "@/hooks/use-debounce";

interface ListUsersProps {
  initialData: PageResponse<UserDto>;
  currentPage: number;
  currentRole: string;
  currentSearch: string;
}

export default function ListUser({
  initialData,
  currentPage,
  currentRole,
  currentSearch,
}: ListUsersProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [data, setData] = useState<PageResponse<UserDto>>(initialData);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(currentSearch);
  // Attend 500ms après la dernière frappe avant de mettre à jour l'URL
  const debouncedSearch = useDebounce(searchValue, 500);

  // Sync le state quand initialData change (navigation pagination/filtre)
  useEffect(() => {
    setData(initialData);
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

  const getBadgeClasses = (role: string) => {
    switch (role.toUpperCase()) {
      case "ADMIN":
        return "bg-pink-50 text-pink-700 dark:bg-pink-950 dark:text-pink-300";
      case "MANAGER":
        return "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300";
      default:
        return "bg-gray-200 text-gray-700 dark:bg-gray-950 dark:text-gray-300";
    }
  };

  // Quand le rôle change → reset page à 0 + update URL
  const handleRoleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "0"); // reset à la 1ère page

    if (value === "all") {
      params.delete("role"); // supprime le param si "all"
    } else {
      params.set("role", value);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  // Construit l'URL pour une page donnée
  const buildPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    return `${pathname}?${params.toString()}`;
  };

  // Génère les numéros de pages à afficher avec ellipsis
  const getPageNumbers = () => {
    const total = data.totalPages;
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

  const handleDeleteUser = (userId: number) => {
    setDeletingId(userId);
    startTransition(async () => {
      try {
        const result = await deleteUserAction(userId);
        if (result.success) {
          toast.success("Utilisateur supprimé avec succès !");
          setData((prev) => ({
            ...prev,
            content: prev.content.filter((u) => u.id !== userId),
            totalElements: prev.totalElements - 1,
          }));
        } else {
          toast.error(result.error || "Erreur lors de la suppression");
        }
      } catch (error) {
        toast.error(
          error instanceof ApiError
            ? error.message
            : "Erreur lors de la suppression",
        );
      } finally {
        setDeletingId(null);
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Utilisateurs</CardTitle>
        <CardDescription>
          Gérez les utilisateurs et leurs accès.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filtres + bouton ajout */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher par nom, email, téléphone..."
                className="pl-8 w-full"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            <Select value={currentRole} onValueChange={handleRoleChange}>
              <SelectTrigger className="w-[180px]">
                <ListFilter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filtrer par rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les rôles</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="MANAGER">Manager</SelectItem>
                <SelectItem value="CLIENT">Client</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            asChild
            size="sm"
            className="gap-1 bg-pink-600 hover:bg-pink-700"
          >
            <Link href={ROUTES.DASHBOARD_CREATE_USERS}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Ajouter un utilisateur
              </span>
            </Link>
          </Button>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom d&apos;utilisateur</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Adresse</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead className="hidden md:table-cell">
                Date de création
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.content.length > 0 ? (
              data.content.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.username}
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell title={user.address}>
                    {truncateText(user.address)}
                  </TableCell>
                  <TableCell>
                    <Badge className={getBadgeClasses(user.role)}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {formatDate(user.createdAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Link
                        href={`${ROUTES.DASHBOARD_UPDATE_USERS}/${user.id}`}
                      >
                        <Pen color="blue" size={16} />
                      </Link>
                      <ConfirmationDialog
                        onConfirm={() => handleDeleteUser(user.id)}
                        disabled={isPending && deletingId === user.id}
                      />
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
                  Aucun utilisateur trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {data.totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-muted-foreground">
              {data.totalElements} utilisateur
              {data.totalElements > 1 ? "s" : ""} au total
            </p>
            <Pagination>
              <PaginationContent>
                {/* Précédent */}
                <PaginationItem>
                  <PaginationPrevious
                    href={data.first ? "#" : buildPageUrl(currentPage - 1)}
                    aria-disabled={data.first}
                    className={
                      data.first ? "pointer-events-none opacity-50" : ""
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
                    href={data.last ? "#" : buildPageUrl(currentPage + 1)}
                    aria-disabled={data.last}
                    className={
                      data.last ? "pointer-events-none opacity-50" : ""
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
