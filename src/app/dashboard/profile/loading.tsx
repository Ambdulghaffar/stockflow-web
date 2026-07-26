import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-16 w-full" />

      <Card className="overflow-hidden border-pink-100 shadow-sm">
        <CardHeader className="bg-gradient-to-r from-pink-500 to-pink-600 text-white">
          <CardTitle>
            <Skeleton className="h-6 w-1/3 bg-pink-300" />
          </CardTitle>
          <CardDescription className="text-pink-100">
            <Skeleton className="h-4 w-1/2 bg-pink-200" />
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8 p-8">
          <div className="flex items-center gap-6">
            <Skeleton className="h-20 w-20 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-12 w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-12 w-full" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-12 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-gray-100">
            <Skeleton className="h-10 w-48" />
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-pink-100 shadow-sm">
        <CardHeader className="bg-gradient-to-r from-pink-500 to-pink-600 text-white">
          <CardTitle>
            <Skeleton className="h-6 w-1/4 bg-pink-300" />
          </CardTitle>
          <CardDescription className="text-pink-100">
            <Skeleton className="h-4 w-1/2 bg-pink-200" />
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 p-8">
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-12 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-12 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-12 w-full" />
          </div>

          <div className="flex justify-end pt-6 border-t border-gray-100">
            <Skeleton className="h-10 w-48" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-100 shadow-sm">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-5 w-1/3" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </CardContent>
      </Card>
    </div>
  );
}
