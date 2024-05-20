import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const OverviewChartSkt = () => {
  return (
    <div className="flex gap-4">
      <Skeleton className="w-10 h-8" />
      <Skeleton className="w-40 h-20" />
    </div>
  );
};

export default OverviewChartSkt;
