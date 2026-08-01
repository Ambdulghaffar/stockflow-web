import { getServerSession } from "next-auth";

import SidebarBreadcrumb from "@/components/dashboard/sidebar-breadcrumb";
import ClientDashboardOverview from "@/components/dashboard/client-dashboard-overview";
import AdminDashboardOverview from "@/components/dashboard/admin-dashboard-overview";
import { authOptions } from "@/lib/auth/auth";
import {
  getSalesReport,
  getStockReport,
} from "@/features/reports/services/report.services";

export const dynamic = "force-dynamic";

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

  const [salesReport, stockReport] = await Promise.all([
    getSalesReport(),
    getStockReport(),
  ]);

  return (
    <>
      <SidebarBreadcrumb />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Tableau de bord</h2>
        </div>
        <AdminDashboardOverview
          salesReport={salesReport}
          stockReport={stockReport}
        />
      </div>
    </>
  );
}
