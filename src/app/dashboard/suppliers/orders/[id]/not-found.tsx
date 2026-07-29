import Link from "next/link";
import { AlertCircleIcon, ArrowLeft, Package, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/constants/route";

export const metadata = {
  title: "Commande fournisseur introuvable - Administration",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-pink-600">
              <AlertCircleIcon className="h-8 w-8 text-white" />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-gray-800">Commande fournisseur introuvable</h1>
            <p className="text-gray-600">Erreur d&apos;administration - commande non trouvée</p>
          </div>

          <Card className="border-pink-100 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-pink-500 to-pink-600 text-white">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6" />
                <CardTitle className="text-xl">Accès administrateur requis</CardTitle>
              </div>
              <CardDescription className="text-pink-100">
                Gestion des commandes fournisseurs - Interface d&apos;administration
              </CardDescription>
            </CardHeader>

            <CardContent className="p-8">
              <div className="mb-6 flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                  <Package className="h-6 w-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">
                    Commande fournisseur non trouvée dans le système
                  </h3>
                  <p className="mb-4 text-gray-600">
                    La commande que vous tentez de consulter n&apos;existe pas dans la base de données
                    ou a déjà été supprimée.
                  </p>

                  <div className="mb-6 rounded-lg bg-gray-50 p-4">
                    <h4 className="mb-3 font-medium text-gray-800">Vérifications administrateur :</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-pink-500" />
                        Vérifiez l&apos;identifiant unique dans l&apos;URL d&apos;administration
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-pink-500" />
                        Confirmez que la commande n&apos;a pas été supprimée récemment
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-pink-500" />
                        Vérifiez les permissions d&apos;accès administrateur
                      </li>
                    </ul>
                  </div>

                  <Button asChild className="bg-pink-600 hover:bg-pink-700">
                    <Link href={ROUTES.DASHBOARD_SUPPLIERS_ORDERS}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Retour aux commandes fournisseurs
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}