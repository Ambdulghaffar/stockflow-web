import SidebarBreadcrumb from '@/components/dashboard/sidebar-breadcrumb'
import { StatCard } from '@/components/dashboard/stat-card'
import { UsersRound } from 'lucide-react'
import React from 'react'

export default function ProductsPage() {
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
                      Gestion des produits
                    </h1>
                    <p className="text-gray-600">
                      Administration et supervision des produits
                    </p>
                  </div>
                </div>
        
                {/* Statistiques */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <StatCard
                    title="Total des produits "
                    value="1,234"
                    icon={UsersRound}
                    iconBgColor="bg-pink-100 text-pink-600"
                    description="Tous les produits "
                  />
                </div>
              </div>
    
            </div>
  )
}
