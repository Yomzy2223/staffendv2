import React from "react";
import { Skeleton } from "../../ui/skeleton";
import CardWrapper from "../../wrappers/cardWrapper";

const ServiceCardSkeleton = () => {
  return (
    <CardWrapper className="animate-pulse min-w-[276px]">
      <Skeleton className=" h-5 w-5/6 mb-2" />
      <Skeleton className=" h-3 w-1/3 mb-10" />
      <div className="flex justify-between gap-2">
        <Skeleton className=" h-3 w-1/4" />
        <Skeleton className=" h-5 w-1/4" />
      </div>
    </CardWrapper>
  );
};

export default ServiceCardSkeleton;
