import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-16 w-full" />

      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-7 w-40" />
          <Skeleton className="mt-2 h-4 w-32" />
        </div>
        <Skeleton className="h-9 w-48" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border bg-gray-50 p-6">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="mt-2 h-4 w-40" />
        </div>
        <div className="rounded-2xl border bg-gray-50 p-6">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="mt-2 h-4 w-64" />
        </div>
      </div>

      <div className="space-y-4 rounded-2xl border bg-gray-50 p-6">
        <Skeleton className="h-6 w-24" />
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center justify-between">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}
