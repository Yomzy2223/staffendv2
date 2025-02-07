import { Skeleton } from "@/components/ui/skeleton";

const CountryCardSkeleton = () => (
  <div className="flex flex-col justify-center gap-4 w-full max-w-[400px] border border-muted rounded-md p-4 animate-pulse">
    <div className="flex justify-between pb-4">
      <Skeleton className="w-10 h-4 max-w-full" />
      <Skeleton className="w-10 max-w-full" />
    </div>
    <div className="flex flex-col gap-4">
      <Skeleton className="w-16 h-4 max-w-full" />
      <Skeleton className="w-20 h-4 max-w-full" />
      <Skeleton className="w-16 h-4 max-w-full" />
    </div>
  </div>
);

export default CountryCardSkeleton;
