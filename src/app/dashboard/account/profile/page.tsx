import DashboardPageContainer from "@/components/dashboard/dashboard-page-container";
import ProfileForm from "@/features/users/components/profile-form";
import ProfileAccountHub from "@/features/users/components/profile-account-hub";
import { getCurrentUser } from "@/features/users/services/user.services";

export const dynamic = "force-dynamic";

export default async function AccountProfilePage() {
  const user = await getCurrentUser();

  return (
    <DashboardPageContainer>
      <ProfileForm user={user} />
      <ProfileAccountHub />
    </DashboardPageContainer>
  );
}
