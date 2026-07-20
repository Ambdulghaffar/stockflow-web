import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Loading() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Chargement...</h2>
            <p className="text-gray-600">Récupération des informations de la catégorie</p>
          </div>

          <Card>
            <CardHeader className="bg-gradient-to-r from-pink-500 to-pink-600 text-white">
              <CardTitle>
                <Skeleton className="h-6 w-3/4 bg-pink-300" />
              </CardTitle>
              <CardDescription className="text-pink-100">
                <Skeleton className="h-4 w-1/2 bg-pink-200" />
              </CardDescription>
            </CardHeader>

            <CardContent className="p-8 space-y-6">
              {/* Skeleton pour les champs du formulaire */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>

              {/* Skeleton pour les boutons */}
              <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-36" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
