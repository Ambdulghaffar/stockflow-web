import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/auth";
import CheckoutForm from "@/features/orders/components/checkout-form";
import { getCurrentUser } from "@/features/users/services/user.services";
import { ROUTES } from "@/constants/route";

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect(ROUTES.LOGIN);

  const user = await getCurrentUser();

  return <CheckoutForm defaultAddress={user.address ?? ""} />;
}
