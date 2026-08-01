import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/auth";

export const getAuthHeaders = async (): Promise<Record<string, string>> => {
  // getServerSession lit cookies()/headers(), indisponibles lors d'une génération
  // statique/ISR (build ou revalidation en arrière-plan, hors requête réelle) —
  // on traite ce cas comme un visiteur anonyme plutôt que de laisser planter le build.
  let session;
  try {
    session = await getServerSession(authOptions);
  } catch {
    return {};
  }

  if (!session?.accessToken || session.error === "RefreshAccessTokenError") {
    return {};
  }

  return {
    Authorization: `Bearer ${session.accessToken}`,
  };
};