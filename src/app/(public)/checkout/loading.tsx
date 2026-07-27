import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <Skeleton className="mb-8 h-9 w-56" />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border bg-gray-50 p-6">
            <Skeleton className="mb-4 h-6 w-48" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-2xl border bg-gray-50 p-6">
            <Skeleton className="h-6 w-32" />
            <div className="mt-4 space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Skeleton className="h-12 w-12 rounded-lg" />
                  <Skeleton className="h-4 flex-1" />
                </div>
              ))}
            </div>
            <Skeleton className="mt-4 h-6 w-full" />
            <Skeleton className="mt-6 h-11 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
