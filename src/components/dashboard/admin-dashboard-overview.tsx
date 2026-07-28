import Link from "next/link";
import {
  AlertTriangle,
  Clock,
  CreditCard,
  DollarSign,
  PackageOpen,
  Wallet,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { SalesChart } from "@/components/dashboard/sales-chart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/constants/route";
import {
  SalesReportDto,
  StockReportDto,
} from "@/features/reports/types/report.types";

interface AdminDashboardOverviewProps {
  salesReport: SalesReportDto;
  stockReport: StockReportDto;
}

export default function AdminDashboardOverview({
  salesReport,
  stockReport,
}: AdminDashboardOverviewProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Chiffre d'affaires (30j)"
          value={`${salesReport.totalRevenue.toFixed(2)} €`}
          icon={DollarSign}
          iconBgColor="bg-green-100 text-green-600"
        />
        <StatCard
          title="Commandes"
          value={salesReport.totalOrders}
          icon={CreditCard}
          iconBgColor="bg-blue-100 text-blue-600"
        />
        <StatCard
          title="Panier moyen"
          value={`${salesReport.averageOrderValue.toFixed(2)} €`}
          icon={Wallet}
          iconBgColor="bg-purple-100 text-purple-600"
        />
        <StatCard
          title="Commandes en attente"
          value={salesReport.pendingOrdersCount}
          icon={Clock}
          iconBgColor="bg-orange-100 text-orange-600"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Vue d&apos;ensemble des ventes</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <SalesChart data={salesReport.revenueByDay} />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Aperçu des stocks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-center">
                <PackageOpen className="mr-4 h-8 w-8 text-blue-500" />
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Valeur totale du stock
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  {stockReport.totalStockValue.toFixed(2)} €
                </div>
              </div>
              <div className="flex items-center">
                <AlertTriangle className="mr-4 h-8 w-8 text-orange-500" />
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Produits en stock bas
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  {stockReport.lowStockCount}
                </div>
              </div>
              <div className="flex items-center">
                <PackageOpen className="mr-4 h-8 w-8 text-red-500" />
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Produits en rupture
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  {stockReport.outOfStockCount}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button asChild variant="outline">
          <Link href={ROUTES.DASHBOARD_REPORTS_SALES}>
            Voir tous les rapports
          </Link>
        </Button>
      </div>
    </div>
  );
}
