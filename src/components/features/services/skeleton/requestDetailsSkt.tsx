import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import React from "react";

const RequestDetailsSkt = ({ previewMode }: { previewMode?: boolean }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className={cn("flex gap-4", { "gap-0": previewMode })}>
        {!previewMode && <Skeleton className="h-10 w-10 mr-4 shrink-0" />}
        <Skeleton className={cn("h-80 w-96", { "h-52 w-60": previewMode })} />
        <div className="h-52 w-80 space-y-6">
          <div>
            <Skeleton className="h-5 w-10 mb-1" />
            <Skeleton className="h-5 w-16" />
          </div>
          <div>
            <Skeleton className="h-4 w-8 mb-1" />
            <Skeleton className="h-5 w-32" />
          </div>
          <div>
            <Skeleton className="h-4 w-6 mb-1" />
            <Skeleton className="h-5 w-9" />
          </div>
        </div>
      </div>
      <div className={cn("flex gap-4", { "gap-0": previewMode })}>
        {!previewMode && <Skeleton className="h-10 w-10 mr-4 shrink-0" />}
        <Skeleton className={cn("h-80 w-96", { "h-40 w-60": previewMode })} />
        <div className="h-40 w-80 space-y-6">
          <div>
            <Skeleton className="h-4 w-6 mb-1" />
            <Skeleton className="h-5 w-9" />
          </div>
          <div>
            <Skeleton className="h-4 w-8 mb-1" />
            <Skeleton className="h-5 w-32" />
          </div>
          <div>
            <Skeleton className="h-5 w-10 mb-1" />
            <Skeleton className="h-5 w-16" />
          </div>
          <div>
            <Skeleton className="h-4 w-6 mb-1" />
            <Skeleton className="h-5 w-9" />
          </div>
        </div>
      </div>
      {previewMode ? (
        <div className={cn("flex gap-4", { "gap-0": previewMode })}>
          <Skeleton className="h-96 w-60" />
          <div className="h-40 w-80 space-y-6">
            <div className="flex justify-between gap-6">
              <Skeleton className="h-4 w-12 mb-1" />
              <Skeleton className="h-4 w-4" />
            </div>
            <div>
              <Skeleton className="h-4 w-12 mb-1" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div>
              <Skeleton className="h-4 w-12 mb-1" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div>
              <Skeleton className="h-4 w-12 mb-1" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div>
              <Skeleton className="h-5 w-10 mb-1" />
              <Skeleton className="h-5 w-16" />
            </div>
            <div>
              <Skeleton className="h-4 w-6 mb-1" />
              <Skeleton className="h-5 w-9" />
            </div>
          </div>
        </div>
      ) : (
        <div className={cn("flex gap-4", { "gap-0": previewMode })}>
          <Skeleton className="h-10 w-10 mr-4 shrink-0" />
          <Skeleton className="h-80 w-96" />
          <div className="h-40 w-80 space-y-6">
            <div>
              <Skeleton className="h-4 w-6 mb-1" />
              <Skeleton className="h-5 w-9" />
            </div>
            <div>
              <Skeleton className="h-4 w-8 mb-1" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div>
              <Skeleton className="h-5 w-10 mb-1" />
              <Skeleton className="h-5 w-16" />
            </div>
            <div>
              <Skeleton className="h-4 w-6 mb-1" />
              <Skeleton className="h-5 w-9" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestDetailsSkt;
