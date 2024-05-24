import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import React from "react";

const TableDetailsSkt = ({ previewMode }: { previewMode?: boolean }) => {
  return (
    <>
      {!previewMode && <Skeleton className="w-44 h-5" />}

      {[1, 2].map((el) => (
        <div key={el} className={cn("flex gap-2", { "gap-0": previewMode })}>
          {!previewMode && (
            <Skeleton className="hidden md:block h-12 w-12 shrink-0" />
          )}
          <div
            className={cn("flex flex-col md:flex-row gap-2 md:gap-8", {
              "gap-0": previewMode,
            })}
          >
            <Skeleton
              className={cn(
                { "h-10 lg:h-72 w-full md:w-[304px]": !previewMode },
                { "h-52 w-60": previewMode }
              )}
            />
            <div className="flex-1 w-[90vw] md:w-[542px] h-full border border-border rounded-md p-4">
              <Skeleton className="h-5 w-4/5 mb-3" />
              <Skeleton className="h-8 w-1/2 mb-6" />
              <Skeleton className="h-5 w-3/5 mb-3" />
              <div className="flex gap-2 mb-6">
                <Skeleton className="h-8 w-2/5 mb-3" />
                <Skeleton className="h-8 w-2/5 mb-3" />
              </div>
              <div>
                <Skeleton className="h-4 w-1/2 mb-3" />
                <Skeleton className="h-8 w-2/5" />
              </div>
            </div>
          </div>
        </div>
      ))}

      <div
        className={cn("flex gap-2 sm:hidden", { "sm:flex gap-0": previewMode })}
      >
        {!previewMode && (
          <Skeleton className="hidden md:block h-12 w-12 shrink-0" />
        )}
        <div
          className={cn("flex flex-col md:flex-row gap-2 md:gap-8", {
            "gap-0": previewMode,
          })}
        >
          <Skeleton
            className={cn(
              { "h-10 lg:h-72 w-full md:w-[304px]": !previewMode },
              { "h-52 w-60": previewMode }
            )}
          />
          <div className="flex-1 w-[90vw] md:w-[542px] h-full border border-border rounded-md p-4">
            <Skeleton className="h-5 w-4/5 mb-3" />
            <Skeleton className="h-8 w-1/2 mb-6" />
            <Skeleton className="h-5 w-3/5 mb-3" />
            <div className="flex gap-2 mb-6">
              <Skeleton className="h-8 w-2/5 mb-3" />
              <Skeleton className="h-8 w-2/5 mb-3" />
            </div>
            <div>
              <Skeleton className="h-4 w-1/2 mb-3" />
              <Skeleton className="h-8 w-2/5" />
            </div>
          </div>
        </div>
      </div>

      <div className={cn("hidden gap-2 sm:flex")}>
        <Skeleton className="hidden md:block h-12 w-12 shrink-0" />
        <div className={cn("flex flex-col md:flex-row gap-2 md:gap-8")}>
          <Skeleton className={cn("h-10 md:h-40 w-full md:w-[304px]")} />
          <div className="flex gap-3 w-[542px] h-40 border border-border rounded-md p-4">
            <Skeleton className="h-full w-1/2" />
            <Skeleton className="h-full w-1/2" />
          </div>
        </div>
      </div>
    </>
  );
};

export default TableDetailsSkt;
