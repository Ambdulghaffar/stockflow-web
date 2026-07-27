import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="mb-8 flex items-center justify-between gap-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-9 w-24 lg:hidden" />
      </div>

      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="hidden w-full space-y-8 lg:block lg:w-[280px] lg:shrink-0">
          <div>
            <Skeleton className="mb-4 h-6 w-20" />
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-5 w-full" />
              ))}
            </div>
          </div>
          <div>
            <Skeleton className="mb-4 h-6 w-16" />
            <Skeleton className="h-9 w-full" />
          </div>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, index) => (
              <div key={index} className="overflow-hidden rounded-2xl bg-gray-50">
                <Skeleton className="aspect-square w-full rounded-none" />
                <div className="space-y-2 p-4">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-6 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
