import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16 md:px-6">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <Skeleton className="h-16 w-16 rounded-full" />
        <Skeleton className="mt-6 h-8 w-64" />
        <Skeleton className="mt-2 h-4 w-48" />
      </div>

      <div className="mx-auto mt-10 max-w-2xl space-y-3 rounded-2xl border bg-gray-50 p-6">
        <Skeleton className="h-6 w-48" />
        {Array.from({ length: 2 }).map((_, index) => (
          <Skeleton key={index} className="h-10 w-full" />
        ))}
        <Skeleton className="h-6 w-full" />
      </div>
    </div>
  );
}
