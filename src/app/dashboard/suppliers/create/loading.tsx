import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Skeleton className="mx-auto mb-4 h-16 w-16 rounded-full bg-pink-200" />
            <Skeleton className="mx-auto mb-2 h-10 w-72 bg-pink-100" />
            <Skeleton className="mx-auto h-5 w-96 bg-pink-100" />
          </div>
          <Card>
            <CardHeader className="bg-gradient-to-r from-pink-500 to-pink-600 text-white">
              <CardTitle>
                <Skeleton className="h-6 w-2/3 bg-pink-300" />
              </CardTitle>
              <CardDescription className="text-pink-100">
                <Skeleton className="h-4 w-1/2 bg-pink-200" />
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <Skeleton className="h-12 w-full" />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
              <Skeleton className="h-28 w-full" />
              <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-40" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}