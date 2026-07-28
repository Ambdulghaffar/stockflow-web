import DashboardPageContainer from '@/components/dashboard/dashboard-page-container'
import UserForm from '@/features/users/components/user-form'
import React from 'react'

export default async function CreateUserpage() {
  return (
    <DashboardPageContainer>
      <UserForm mode="create" />
    </DashboardPageContainer>
  )
}
