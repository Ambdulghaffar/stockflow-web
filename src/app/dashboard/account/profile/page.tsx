import SidebarBreadcrumb from "@/components/dashboard/sidebar-breadcrumb";
import ProfileForm from "@/features/users/components/profile-form";
import ProfileAccountHub from "@/features/users/components/profile-account-hub";
import { getCurrentUser } from "@/features/users/services/user.services";

export default async function AccountProfilePage() {
  const user = await getCurrentUser();

  return (
    <div className="space-y-8">
      <SidebarBreadcrumb />
      <ProfileForm user={user} />
      <ProfileAccountHub />
    </div>
  );
}
