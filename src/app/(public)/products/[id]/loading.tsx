import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 pb-28 md:px-6 lg:pb-8">
      <Skeleton className="mb-8 h-5 w-80" />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <Skeleton className="aspect-square w-full rounded-2xl" />

        <div className="flex flex-col">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-2 h-8 w-3/4" />
          <Skeleton className="mt-4 h-7 w-32" />
          <div className="mt-6 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <Skeleton className="mt-8 h-11 w-full" />
        </div>
      </div>
    </div>
  );
}
