import Link from "next/link";
import { PackageX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/route";

export const metadata = {
  title: "Commande introuvable",
};

export default function NotFound() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center px-4 py-24 text-center md:px-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-100">
        <PackageX className="h-8 w-8 text-pink-500" />
      </div>
      <h1 className="mt-6 text-2xl font-bold text-gray-900">
        Commande introuvable
      </h1>
      <p className="mt-2 max-w-md text-gray-600">
        Cette commande n&apos;existe pas ou ne vous appartient pas.
      </p>
      <Button asChild className="mt-6 bg-pink-600 hover:bg-pink-700">
        <Link href={ROUTES.PRODUCTS_LIST}>Continuer mes achats</Link>
      </Button>
    </div>
  );
}
