import { getServerSession } from "next-auth";

import DashboardPageContainer from "@/components/dashboard/dashboard-page-container";
import ProfileForm from "@/features/users/components/profile-form";
import ProfileRoleSummary from "@/features/users/components/profile-role-summary";
import { getCurrentUser } from "@/features/users/services/user.services";
import { authOptions } from "@/lib/auth/auth";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const role = session?.user.roles?.[0] === "MANAGER" ? "MANAGER" : "ADMIN";
  const user = await getCurrentUser();

  return (
    <DashboardPageContainer>
      <ProfileForm user={user} />
      <ProfileRoleSummary role={role} />
    </DashboardPageContainer>
  );
}
