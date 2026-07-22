import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface DataTablePaginationProps {
  totalPages: number;
  totalElements: number;
  currentPage: number;
  first: boolean;
  last: boolean;
  buildPageUrl: (page: number) => string;
  getPageNumbers: () => (number | "ellipsis")[];
  itemLabelSingular: string;
  itemLabelPlural: string;
}

export default function DataTablePagination({
  totalPages,
  totalElements,
  currentPage,
  first,
  last,
  buildPageUrl,
  getPageNumbers,
  itemLabelSingular,
  itemLabelPlural,
}: DataTablePaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-6">
      <p className="text-sm text-muted-foreground">
        {totalElements}{" "}
        {totalElements > 1 ? itemLabelPlural : itemLabelSingular} au total
      </p>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={first ? "#" : buildPageUrl(currentPage - 1)}
              aria-disabled={first}
              className={first ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

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

          <PaginationItem>
            <PaginationNext
              href={last ? "#" : buildPageUrl(currentPage + 1)}
              aria-disabled={last}
              className={last ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
