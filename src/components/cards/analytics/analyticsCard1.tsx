import { Chart1 } from "@/assets/images";
import CardWrapper from "@/components/wrappers/cardWrapper";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const AnalyticsCard1 = ({
  title,
  previous,
  current,
  total,
  className,
}: {
  title: string;
  previous: number;
  current: number;
  total: string;
  className?: string;
}) => {
  const difference = current - previous;
  let perc = ((100 * difference) / previous).toFixed(2) || 0;
  perc = parseInt(perc.toString());
  const increased = perc > 0;

  return (
    <CardWrapper
      className={cn(
        "flex flex-col gap-4 min-w-[200px] max-w-[300px]",
        className
      )}
    >
      <div className="flex justify-between items-center gap-4">
        <p className="text-sm text-foreground-5">{title}</p>
        <p
          className={cn("text-xs font-normal rounded-md px-2 py-[1px]", {
            "bg-success text-success-foreground": increased,
            "bg-destructive text-destructive-foreground": !increased,
          })}
        >
          {increased ? "+" + perc + "%" : "-" + perc + "%"}
        </p>
      </div>
      <p className="sb-text-24 font-semibold">{total}</p>
      <Image src={Chart1} alt="chart1" />
    </CardWrapper>
  );
};

export default AnalyticsCard1;
