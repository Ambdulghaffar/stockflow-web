import SidebarBreadcrumb from '@/components/dashboard/sidebar-breadcrumb'
import CategoryForm from '@/features/categories/components/category-form'
import React from 'react'

export default function CreateCategoryPage() {
  return (
    <div>
      <SidebarBreadcrumb />
      <CategoryForm mode="create" />
    </div>
  )
}
