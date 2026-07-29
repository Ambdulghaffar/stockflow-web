import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white p-8 pt-6">
      <div className="mx-auto max-w-5xl space-y-4">
        <div className="text-center space-y-3">
          <Skeleton className="mx-auto h-10 w-80 bg-pink-100" />
          <Skeleton className="mx-auto h-5 w-96 bg-pink-100" />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-60" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-4 w-80" />
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <div className="flex items-center justify-between gap-4">
              <Skeleton className="h-12 w-40" />
              <Skeleton className="h-12 w-44" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}