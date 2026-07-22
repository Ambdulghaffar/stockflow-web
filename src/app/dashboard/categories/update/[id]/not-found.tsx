import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/route";
import { AlertCircleIcon, ArrowLeft, Tags, Shield } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Catégorie introuvable - Administration",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <AlertCircleIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Catégorie introuvable</h1>
            <p className="text-gray-600">Erreur d&apos;administration - Catégorie non trouvée</p>
          </div>

          <Card className="border-pink-100 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-pink-500 to-pink-600 text-white">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6" />
                <CardTitle className="text-xl">Accès administrateur requis</CardTitle>
              </div>
              <CardDescription className="text-pink-100">
                Gestion des catégories - Interface d&apos;administration
              </CardDescription>
            </CardHeader>

            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Tags className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Catégorie non trouvée dans le système
                  </h3>
                  <p className="text-gray-600 mb-4">
                    La catégorie que vous tentez de modifier n&apos;existe pas dans notre base de données
                    ou a été supprimée du système d&apos;administration.
                  </p>

                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h4 className="font-medium text-gray-800 mb-3">Vérifications administrateur :</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                        Vérifiez l&apos;identifiant unique dans l&apos;URL d&apos;administration
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                        Confirmez que la catégorie n&apos;a pas été supprimée récemment
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                        Vérifiez les permissions d&apos;accès administrateur
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                        Consultez les logs système pour plus de détails
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      asChild
                      className="bg-pink-600 hover:bg-pink-700 flex items-center gap-2"
                    >
                      <Link href={ROUTES.DASHBOARD_CATEGORIES}>
                        <ArrowLeft className="w-4 h-4" />
                        Retour à la gestion des catégories
                      </Link>
                    </Button>

                    <Button
                      variant="outline"
                      asChild
                      className="border-pink-200 hover:bg-pink-50"
                    >
                      <Link href={ROUTES.DASHBOARD}>
                        <Shield className="w-4 h-4 mr-2" />
                        Tableau de bord admin
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
