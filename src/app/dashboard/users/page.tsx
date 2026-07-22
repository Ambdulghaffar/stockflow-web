import SidebarBreadcrumb from "@/components/dashboard/sidebar-breadcrumb";
import { StatCard } from "@/components/dashboard/stat-card";
import ListUser from "@/features/users/components/list-user";
import {
  getAllUsers,
  getUserStats,
} from "@/features/users/services/user.services";
import { authOptions } from "@/lib/auth/auth";
import { UserCheck, Shield, Crown, UsersRound } from "lucide-react";
import { getServerSession } from "next-auth";

interface UsersPageProps {
  searchParams: Promise<{
    page?: string;
    size?: string;
    sortBy?: string;
    sortDir?: string;
    role?: string;
    search?: string;
  }>;
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const { page, size, sortBy, sortDir, role, search } = await searchParams;
  const session = await getServerSession(authOptions);

  const [data, stats] = await Promise.all([
    getAllUsers(
      Number(page) || 0,
      Number(size) || 10,
      sortBy || "id",
      sortDir || "desc",
      role,
      search,
    ),
    getUserStats(),
  ]);

  const filteredContent = data.content.filter(
    (user) => user.email !== session?.user?.email,
  );

  return (
    <div className="space-y-8">
      <SidebarBreadcrumb />

      {/* Section d'introduction avec statistiques */}
      <div className="bg-gradient-to-r from-pink-50 to-white rounded-2xl p-6 border border-pink-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
            <UsersRound className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Gestion des utilisateurs
            </h1>
            <p className="text-gray-600">
              Administration et supervision des comptes utilisateur
            </p>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Clients"
            value={stats.clients}
            icon={UserCheck}
            iconBgColor="bg-emerald-100 text-emerald-600"
            description="Utilisateurs finaux"
          />
          <StatCard
            title="Managers"
            value={stats.managers}
            icon={Shield}
            iconBgColor="bg-blue-100 text-blue-600"
            description="Gestionnaires intermédiaires"
          />
          <StatCard
            title="Administrateurs"
            value={stats.admins}
            icon={Crown}
            iconBgColor="bg-amber-100 text-amber-600"
            description="Super administrateurs"
          />
          <StatCard
            title="Total utilisateurs"
            value={stats.total}
            icon={UsersRound}
            iconBgColor="bg-pink-100 text-pink-600"
            description="Tous les comptes actifs"
          />
        </div>
      </div>

      {/* Liste des utilisateurs */}
      <ListUser
        initialData={{ ...data, content: filteredContent }}
        currentPage={Number(page) || 0}
        currentRole={role || "all"}
        currentSearch={search || ""} 
      />
    </div>
  );
}
