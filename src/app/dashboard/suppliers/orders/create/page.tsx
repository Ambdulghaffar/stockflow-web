import DashboardPageContainer from "@/components/dashboard/dashboard-page-container";
import SupplierOrderForm from "@/features/suppliers/components/supplier-order-form";
import { getAllProducts } from "@/features/products/services/product.services";
import { getAllSuppliers } from "@/features/suppliers/services/supplier.services";

export const dynamic = "force-dynamic";

export default async function CreateSupplierOrderPage() {
  const [suppliers, products] = await Promise.all([
    getAllSuppliers(0, 100),
    getAllProducts(0, 200),
  ]);

  return (
    <DashboardPageContainer>
      <SupplierOrderForm suppliers={suppliers.content} products={products.content} />
    </DashboardPageContainer>
  );
}