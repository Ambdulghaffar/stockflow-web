import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getPageNumbers } from "@/utils/pagination";

interface PublicPaginationProps {
  currentPage: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  buildPageUrl: (page: number) => string;
}

export default function PublicPagination({
  currentPage,
  totalPages,
  first,
  last,
  buildPageUrl,
}: PublicPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={first ? "#" : buildPageUrl(currentPage - 1)}
            aria-disabled={first}
            className={first ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {getPageNumbers(totalPages, currentPage).map((item, index) =>
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
  );
}
