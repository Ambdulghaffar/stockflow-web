import Link from "next/link";
import { PackageX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/route";

export const metadata = {
  title: "Commande introuvable",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-pink-100 bg-gradient-to-br from-white via-pink-50/60 to-white px-4 py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 shadow-lg shadow-pink-500/30 ring-4 ring-white">
        <PackageX className="h-8 w-8 text-white" strokeWidth={2} />
      </div>
      <h1 className="mt-6 text-2xl font-bold text-gray-900">
        Commande introuvable
      </h1>
      <p className="mt-2 max-w-md text-sm text-gray-500">
        Cette commande n&apos;existe pas ou a été supprimée.
      </p>
      <Button asChild className="mt-6 bg-pink-600 hover:bg-pink-700">
        <Link href={ROUTES.DASHBOARD_SALES_ORDERS}>
          Retour aux commandes
        </Link>
      </Button>
    </div>
  );
}
