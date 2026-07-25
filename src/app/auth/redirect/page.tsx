import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { ROUTES } from "@/constants/route";
import { authOptions } from "@/lib/auth/auth";

export default async function AuthRedirectPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect(ROUTES.LOGIN);

  const role = session.user.roles?.[0];
  if (role === "CLIENT") redirect(ROUTES.DASHBOARD_ACCOUNT_ORDERS);
  redirect(ROUTES.DASHBOARD); // ADMIN et MANAGER
}
