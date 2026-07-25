import { getServerSession } from "next-auth";

import { StatCard } from "@/components/dashboard/stat-card";
import { SalesChart } from "@/components/dashboard/sales-chart";
import SidebarBreadcrumb from "@/components/dashboard/sidebar-breadcrumb";
import ClientDashboardOverview from "@/components/dashboard/client-dashboard-overview";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DollarSign,
  Users,
  CreditCard,
  Activity,
  Package,
  PackageOpen,
  UserPlus,
  Truck,
} from "lucide-react";
import { authOptions } from "@/lib/auth/auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const role = session?.user.roles?.[0];

  if (role === "CLIENT") {
    return (
      <>
        <SidebarBreadcrumb />
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ClientDashboardOverview
            username={session?.user.name ?? "vous"}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <SidebarBreadcrumb />
      <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Tableau de bord</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Ventes totales"
          value="45,231.89 €"
          icon={DollarSign}
          iconBgColor="bg-green-100 text-green-600"
        />
        <StatCard
          title="Abonnements"
          value="+2350"
          icon={Users}
          iconBgColor="bg-blue-100 text-blue-600"
        />
        <StatCard
          title="Commandes"
          value="+12,234"
          icon={CreditCard}
          iconBgColor="bg-yellow-100 text-yellow-600"
        />
        <StatCard
          title="Taux de conversion"
          value="+573"
          icon={Activity}
          iconBgColor="bg-pink-100 text-pink-600"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Vue d&apos;ensemble des ventes</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <SalesChart />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Aperçu des stocks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-center">
                <Package className="h-8 w-8 mr-4 text-blue-500" />
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Produits en stock
                  </p>
                  <p className="text-sm text-muted-foreground">
                    1,204 articles
                  </p>
                </div>
                <div className="ml-auto font-medium">1.2k</div>
              </div>
              <div className="flex items-center">
                <PackageOpen className="h-8 w-8 mr-4 text-yellow-500" />
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Produits en rupture
                  </p>
                  <p className="text-sm text-muted-foreground">
                    12 articles
                  </p>
                </div>
                <div className="ml-auto font-medium">12</div>
              </div>
              <div className="flex items-center">
                <UserPlus className="h-8 w-8 mr-4 text-green-500" />
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Nouveaux clients
                  </p>
                  <p className="text-sm text-muted-foreground">
                    24 ce mois-ci
                  </p>
                </div>
                <div className="ml-auto font-medium">+24</div>
              </div>
              <div className="flex items-center">
                <Truck className="h-8 w-8 mr-4 text-purple-500" />
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Fournisseurs actifs
                  </p>
                  <p className="text-sm text-muted-foreground">
                    15 fournisseurs
                  </p>
                </div>
                <div className="ml-auto font-medium">15</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
}
