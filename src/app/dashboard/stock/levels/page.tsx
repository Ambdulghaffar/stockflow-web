import DashboardPageContainer from "@/components/dashboard/dashboard-page-container";
import StockLevelsList from "@/features/stock/components/stock-levels-list";
import { getAllProducts } from "@/features/products/services/product.services";

export default async function StockLevelsPage() {
  const products = await getAllProducts(0, 50, "stock", "asc");

  return (
    <DashboardPageContainer>
      <StockLevelsList initialData={products} />
    </DashboardPageContainer>
  );
}
