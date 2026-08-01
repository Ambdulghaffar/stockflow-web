import DashboardPageContainer from "@/components/dashboard/dashboard-page-container";
import { StatCard } from "@/components/dashboard/stat-card";
import DateRangeFilter from "@/features/reports/components/date-range-filter";
import { Badge } from "@/components/ui/badge";
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
import { AlertTriangle, Package, PackageX, Wallet } from "lucide-react";
import { ROUTES } from "@/constants/route";
import { getStockReport } from "@/features/reports/services/report.services";
import { getStockBadgeClasses } from "@/features/products/utils/stock-badge";
import {
  STOCK_MOVEMENT_TYPE_BADGE_CLASSES,
  STOCK_MOVEMENT_TYPE_LABELS,
} from "@/features/stock/constants/stock-movement-badge";

interface ReportsStockPageProps {
  searchParams: Promise<{ startDate?: string; endDate?: string }>;
}

export const dynamic = "force-dynamic";

export default async function ReportsStockPage({
  searchParams,
}: ReportsStockPageProps) {
  const { startDate, endDate } = await searchParams;
  const report = await getStockReport(startDate, endDate);

  return (
    <DashboardPageContainer>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Rapports de stocks
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            La période sélectionnée n&apos;affecte que les mouvements de
            stock ci-dessous — le reste du rapport est un instantané de
            l&apos;état actuel du catalogue.
          </p>
        </div>
        <DateRangeFilter basePath={ROUTES.DASHBOARD_REPORTS_STOCK} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Valeur totale du stock"
          value={`${report.totalStockValue.toFixed(2)} €`}
          icon={Wallet}
          iconBgColor="bg-green-100 text-green-600"
        />
        <StatCard
          title="Produits actifs"
          value={report.totalProducts}
          icon={Package}
          iconBgColor="bg-blue-100 text-blue-600"
        />
        <StatCard
          title="Stock bas"
          value={report.lowStockCount}
          icon={AlertTriangle}
          iconBgColor="bg-orange-100 text-orange-600"
        />
        <StatCard
          title="Rupture de stock"
          value={report.outOfStockCount}
          icon={PackageX}
          iconBgColor="bg-red-100 text-red-600"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Produits en stock bas</CardTitle>
            <CardDescription>
              Produits nécessitant une attention particulière.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Stock</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {report.lowStockProducts.length > 0 ? (
                  report.lowStockProducts.map((product) => (
                    <TableRow key={product.productId}>
                      <TableCell className="font-medium">
                        {product.productName}
                      </TableCell>
                      <TableCell>{product.categoryName}</TableCell>
                      <TableCell>
                        <Badge className={getStockBadgeClasses(product.stock)}>
                          {product.stock}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="h-24 text-center text-muted-foreground"
                    >
                      Aucun produit en stock bas.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mouvements sur la période</CardTitle>
            <CardDescription>
              Répartition des mouvements de stock par type.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {report.movementsSummary.length > 0 ? (
                report.movementsSummary.map((entry) => (
                  <div
                    key={entry.type}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <Badge
                      className={STOCK_MOVEMENT_TYPE_BADGE_CLASSES[entry.type]}
                    >
                      {STOCK_MOVEMENT_TYPE_LABELS[entry.type]}
                    </Badge>
                    <div className="text-right text-sm">
                      <p className="font-medium text-gray-900">
                        {entry.count} mouvement{entry.count > 1 ? "s" : ""}
                      </p>
                      <p className="text-muted-foreground">
                        {entry.totalQuantity} unités
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  Aucun mouvement sur cette période.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardPageContainer>
  );
}
