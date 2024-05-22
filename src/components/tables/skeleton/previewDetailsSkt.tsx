import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const PreviewDetailsSkt = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="mb-6">
        <div className="flex justify-between gap-6 mb-2.5">
          <Skeleton className="h-5 w-56" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-3 w-64 mb-2.5" />
        <Skeleton className="h-3 w-32" />
      </div>
      <PreviewDetailsSkt />
    </div>
  );
};

export default PreviewDetailsSkt;
