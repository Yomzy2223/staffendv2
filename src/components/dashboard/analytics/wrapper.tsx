import { TStatus } from "@/app/(dashboard)/(mainpages)/page";
import CardWrapper from "@/components/wrappers/cardWrapper";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const Wrapper = ({
  status,
  activeService,
  rangeLabel,
  compareLabel,
  totalCurrent,
  totalCompare,
  selectedOverview,
  showCompare,
  className,
  children,
}: {
  status: string;
  activeService?: string;
  rangeLabel: string;
  compareLabel: string;
  totalCurrent: number;
  totalCompare: number;
  className?: string;
  selectedOverview: TStatus;
  showCompare: boolean;
  children: ReactNode;
}) => {
  const title = selectedOverview
    ? (status || "") + " requests"
    : (activeService || "") + " revenue";

  const description = activeService + " " + (status || "revenue") + " between ";
  return (
    <CardWrapper
      big
      className={cn("flex flex-col max-w-[634px] w-full", className)}
    >
      <div>
        <p className="sb-text-24 font-semibold mb-1 capitalize">{title}</p>
        <div>
          <p className="sb-text-14 text-foreground-5">
            {description + rangeLabel}:{" "}
            <span className="font-bold">{totalCurrent}</span>
          </p>
          {showCompare && (
            <p className="sb-text-14 text-foreground-5">
              {description + compareLabel}:{" "}
              <span className="font-bold">{totalCompare}</span>
            </p>
          )}
        </div>
      </div>
      {children}
    </CardWrapper>
  );
};

export default Wrapper;
