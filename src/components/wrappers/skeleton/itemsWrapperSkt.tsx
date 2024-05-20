import { Skeleton } from "@/components/ui/skeleton";
import React, { ReactNode } from "react";

const ItemsWrapperSkt = ({ LoadingSkt }: { LoadingSkt: ReactNode }) => {
  return (
    <div className="border border-border rounded shadow-sm my-4 px-4 lg:px-6 py-6 lg:my-6">
      <div className="flex items-center justify-between gap-6">
        <Skeleton className="w-28 h-7" />
        <div className="flex gap-6">
          <Skeleton className="w-10 lg:w-72 h-9" />
          <Skeleton className="w-28 h-9" />
        </div>
      </div>
      <Skeleton className="w-full h-[1px] my-4" />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 pt-4 sm:gap-6">
        {LoadingSkt}
      </div>
    </div>
  );
};

export default ItemsWrapperSkt;
