import CardWrapper from "@/components/wrappers/cardWrapper";
import { cn } from "@/lib/utils";
import { addDays, differenceInDays, format, isSameDay } from "date-fns";
import { ArrowDown, ArrowUp } from "lucide-react";
import React from "react";
import { LineChart, Line, Tooltip, ResponsiveContainer } from "recharts";

const AnalyticsCard3 = ({
  title,
  previous,
  current,
  bottomText,
  className,
  previousFrom,
  currentFrom,
  currentTo,
}: {
  title: string;
  previous: any[];
  current: any[];
  bottomText?: string;
  className?: string;
  previousFrom: Date | string;
  currentFrom: Date | string;
  currentTo: Date | string;
}) => {
  const totalCurrent = current?.length;
  const totalPrevious = previous?.length;

  const difference = totalCurrent - totalPrevious;
  let perc = 100 * difference || 0;
  const decreased = perc < 0;

  const totalDays = differenceInDays(currentTo, currentFrom) + 1;

  // Returns the data to be passed to the chart
  const data = Array(totalDays)
    .fill("")
    .map((el, i) => {
      const stepDayCurr = addDays(currentFrom, i);
      const stepDayPrev = addDays(previousFrom, i);
      if (previousFrom && currentFrom) {
        const dataForStepDayCurr = current?.filter((el) =>
          isSameDay(el.createdat, stepDayCurr)
        );
        const dataForStepDayPrev = previous?.filter((el) =>
          isSameDay(el.createdat, stepDayPrev)
        );
        const name =
          format(stepDayCurr, "MMM dd, yyy") +
          " vs " +
          format(stepDayPrev, "MMM dd, yyy");

        return {
          name,
          current: dataForStepDayCurr?.length,
          previous: dataForStepDayPrev?.length,
        };
      }
    });

  // if (title === "Drafts") console.log(data);

  return (
    <CardWrapper
      className={cn(
        "flex-1 flex flex-col min-w-[250px] w-max max-w-[300px] h-[150px]",
        className
      )}
    >
      <p className="text-sm text-foreground-5 mb-3">{title}</p>
      <div className="flex-1 flex justify-between gap-4 mb-2">
        <p className="sb-text-24 font-semibold">{totalCurrent}</p>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={300} height={100} data={data}>
            <Line
              type="monotone"
              dataKey="current"
              stroke="#84d885"
              strokeWidth={2}
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="previous"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
            />
            <Tooltip wrapperStyle={{ opacity: 0.8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center text-sm text-foreground-5 font-normal">
        <span>
          {decreased ? (
            <ArrowDown size={14} color="hsl(var(--destructive-foreground))" />
          ) : (
            <ArrowUp size={14} color="hsl(var(--success-foreground))" />
          )}
        </span>
        <span
          className={cn({
            "text-success-foreground": !decreased,
            "text-destructive-foreground": decreased,
          })}
        >
          {perc}%
        </span>
        <span className="ml-1 whitespace-nowrap">
          {bottomText || "vs last month"}
        </span>
      </div>
    </CardWrapper>
  );
};

export default AnalyticsCard3;
