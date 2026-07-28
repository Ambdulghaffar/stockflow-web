import DashboardPageContainer from "@/components/dashboard/dashboard-page-container";
import StockMovementsList from "@/features/stock/components/stock-movements-list";
import { getStockMovements } from "@/features/stock/services/stock-movement.services";
import { getAllProducts } from "@/features/products/services/product.services";
import { StockMovementType } from "@/features/stock/types/stock-movement.types";

interface StockMovementsPageProps {
  searchParams: Promise<{ page?: string; type?: string }>;
}

export default async function StockMovementsPage({
  searchParams,
}: StockMovementsPageProps) {
  const { page, type } = await searchParams;
  const currentPage = Number(page) || 0;

  const [movements, products] = await Promise.all([
    getStockMovements(
      currentPage,
      10,
      undefined,
      type as StockMovementType | undefined,
    ),
    getAllProducts(0, 100, "name", "asc"),
  ]);

  return (
    <DashboardPageContainer>
      <StockMovementsList
        initialData={movements}
        currentPage={currentPage}
        currentType={type || ""}
        products={products.content}
      />
    </DashboardPageContainer>
  );
}
