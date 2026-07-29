import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-4 p-8 pt-6">
      <div className="rounded-2xl border border-pink-100 bg-gradient-to-br from-white via-pink-50/60 to-white p-6 shadow-sm">
        <div className="space-y-3">
          <Skeleton className="h-8 w-80 bg-pink-100" />
          <Skeleton className="h-5 w-96 bg-pink-100" />
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-52" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-72" />
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-[220px]" />
          <Skeleton className="h-72 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}