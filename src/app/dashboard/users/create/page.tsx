import SidebarBreadcrumb from '@/components/dashboard/sidebar-breadcrumb'
import UserForm from '@/features/users/components/user-form'
import React from 'react'

export default async function CreateUserpage() {
  return (
    <div>
      <SidebarBreadcrumb />
      <UserForm mode="create" />
    </div>
  )
}
