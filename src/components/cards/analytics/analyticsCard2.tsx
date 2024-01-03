import { Chart2 } from "@/assets/images";
import CardWrapper from "@/components/wrappers/cardWrapper";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const AnalyticsCard2 = ({
  title,
  total,
  className,
}: {
  title: string;
  total: string;
  className?: string;
}) => {
  return (
    <CardWrapper
      className={cn(
        "flex flex-col justify-between gap-4 min-w-[200px] max-w-[300px]",
        className
      )}
    >
      <div className="flex justify-between ">
        <div className="flex flex-col justify-between items-center gap-3">
          <p className="text-sm text-foreground-5">{title}</p>
          <p className="sb-text-24 font-semibold">{total}</p>
        </div>
        <Image src={Chart2} alt="analytics chart" />
      </div>
      <div className="flex gap-3 w-max m-auto">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-sm text-foreground-5 font-normal ml-1">
            Direct
          </span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-secondary" />
          <span className="text-sm text-foreground-5 font-normal ml-1">
            Referrals
          </span>
        </div>
      </div>
    </CardWrapper>
  );
};

export default AnalyticsCard2;
