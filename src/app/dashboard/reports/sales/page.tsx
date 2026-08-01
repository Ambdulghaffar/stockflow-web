import DashboardPageContainer from "@/components/dashboard/dashboard-page-container";
import { StatCard } from "@/components/dashboard/stat-card";
import { SalesChart } from "@/components/dashboard/sales-chart";
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
import { Clock, CreditCard, DollarSign, Wallet } from "lucide-react";
import { ROUTES } from "@/constants/route";
import { getSalesReport } from "@/features/reports/services/report.services";
import {
  ORDER_STATUS_BADGE_CLASSES,
  ORDER_STATUS_LABELS,
} from "@/features/orders/constants/order-status";

interface ReportsSalesPageProps {
  searchParams: Promise<{ startDate?: string; endDate?: string }>;
}

export const dynamic = "force-dynamic";

export default async function ReportsSalesPage({
  searchParams,
}: ReportsSalesPageProps) {
  const { startDate, endDate } = await searchParams;
  const report = await getSalesReport(startDate, endDate);

  return (
    <DashboardPageContainer>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Rapports de ventes
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Analyse des ventes sur la période sélectionnée.
          </p>
        </div>
        <DateRangeFilter basePath={ROUTES.DASHBOARD_REPORTS_SALES} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Chiffre d'affaires"
          value={`${report.totalRevenue.toFixed(2)} €`}
          icon={DollarSign}
          iconBgColor="bg-green-100 text-green-600"
        />
        <StatCard
          title="Commandes"
          value={report.totalOrders}
          icon={CreditCard}
          iconBgColor="bg-blue-100 text-blue-600"
        />
        <StatCard
          title="Panier moyen"
          value={`${report.averageOrderValue.toFixed(2)} €`}
          icon={Wallet}
          iconBgColor="bg-purple-100 text-purple-600"
        />
        <StatCard
          title="Commandes en attente"
          value={report.pendingOrdersCount}
          icon={Clock}
          iconBgColor="bg-orange-100 text-orange-600"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vue d&apos;ensemble des ventes</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <SalesChart data={report.revenueByDay} />
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top 5 produits</CardTitle>
            <CardDescription>
              Les produits les plus vendus sur la période.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Produit</TableHead>
                  <TableHead>Qté vendue</TableHead>
                  <TableHead>Chiffre d&apos;affaires</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {report.topProducts.length > 0 ? (
                  report.topProducts.map((product, index) => (
                    <TableRow key={product.productId}>
                      <TableCell className="font-medium text-muted-foreground">
                        {index + 1}
                      </TableCell>
                      <TableCell className="font-medium">
                        {product.productName}
                      </TableCell>
                      <TableCell>{product.quantitySold}</TableCell>
                      <TableCell>{product.revenue.toFixed(2)} €</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="h-24 text-center text-muted-foreground"
                    >
                      Aucune vente sur cette période.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Répartition par statut</CardTitle>
            <CardDescription>
              Nombre de commandes par statut sur la période.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {report.ordersByStatus.length > 0 ? (
                report.ordersByStatus.map((entry) => (
                  <div
                    key={entry.status}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <Badge className={ORDER_STATUS_BADGE_CLASSES[entry.status]}>
                      {ORDER_STATUS_LABELS[entry.status]}
                    </Badge>
                    <span className="font-medium text-gray-900">
                      {entry.count}
                    </span>
                  </div>
                ))
              ) : (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  Aucune commande sur cette période.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardPageContainer>
  );
}
