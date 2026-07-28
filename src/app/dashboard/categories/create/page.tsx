import DashboardPageContainer from '@/components/dashboard/dashboard-page-container'
import CategoryForm from '@/features/categories/components/category-form'
import React from 'react'

export default function CreateCategoryPage() {
  return (
    <DashboardPageContainer>
      <CategoryForm mode="create" />
    </DashboardPageContainer>
  )
}
