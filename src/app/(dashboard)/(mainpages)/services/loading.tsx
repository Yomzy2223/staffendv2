import ServiceCardSkeleton from "@/components/cards/service/serviceCardSkeleton";
import TableSkeleton from "@/components/tables/generalTable/TableSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div>
      <div>
        <div className="flex justify-between items-center gap-6 py-6 sm:py-10 px-4 sm:px-6">
          <div>
            <Skeleton className="h-8 w-40 mb-2" />
            <Skeleton className="h-6 w-52" />
          </div>
          <div className="flex items-center">
            <Skeleton className="w-40 h-10 mr-3" />
            <Skeleton className="w-40 h-14" />
          </div>
        </div>
        <div className="flex max-w-[100vw] overflow-x-auto gap-6 md:gap-8 pt-1 p-4 sm:p-6">
          {["1", "2", "3", "4", "5"].map((el) => (
            <ServiceCardSkeleton key={el} />
          ))}
        </div>
      </div>
      <TableSkeleton />
    </div>
  );
};

export default Loading;
