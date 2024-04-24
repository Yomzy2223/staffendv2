import { TStatus } from "@/app/(dashboard)/(mainpages)/page";
import CardWrapper from "@/components/wrappers/cardWrapper";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const Wrapper = ({
  title,
  activeService,
  rangeLabel,
  compareLabel,
  totalCurrent,
  totalCompare,
  selectedOverview,
  className,
  children,
}: {
  title: string;
  activeService?: string;
  rangeLabel: string;
  compareLabel: string;
  totalCurrent: number;
  totalCompare: number;
  className?: string;
  selectedOverview: TStatus;
  children: ReactNode;
}) => {
  return (
    <CardWrapper
      big
      className={cn("flex flex-col max-w-[634px] w-full", className)}
    >
      <div>
        <p className="sb-text-24 font-semibold mb-1 capitalize">{title}</p>
        <div>
          <p className="sb-text-14 text-foreground-5">
            {activeService + " " + selectedOverview + " between " + rangeLabel}:{" "}
            <span className="font-bold">{totalCurrent}</span>
          </p>
          <p className="sb-text-14 text-foreground-5">
            {activeService + " " + title + " between " + compareLabel}:{" "}
            <span className="font-bold">{totalCompare}</span>
          </p>
        </div>
      </div>
      {children}
    </CardWrapper>
  );
};

export default Wrapper;
