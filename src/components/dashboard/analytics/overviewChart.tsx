import CardWrapper from "@/components/wrappers/cardWrapper";
import { cn } from "@/lib/utils";
import { addDays, differenceInDays, format, isSameDay } from "date-fns";
import React, { MouseEventHandler } from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const OverviewChart = ({
  title,
  compare,
  current,
  className,
  compareFrom,
  currentFrom,
  currentTo,
  selected,
  onClick,
  formatStr,
  showCompare,
}: {
  title: string;
  compare: any[];
  current: any[];
  bottomText?: string;
  className?: string;
  compareFrom: Date;
  currentFrom: Date;
  currentTo: Date;
  selected: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
  formatStr: string;
  showCompare: boolean;
}) => {
  const totalCurrent = current?.length || 0;
  const totalCompare = compare?.length || 0;

  const daysInRange = differenceInDays(currentTo, currentFrom) + 1;

  // Returns the data for each day
  const getDayData = (inc: number, isCompare: boolean) => {
    const allData = isCompare ? compare : current;
    const dayDate = isCompare
      ? addDays(compareFrom, inc)
      : addDays(currentFrom, inc);
    const dayData = allData?.filter((el) =>
      isSameDay(new Date(el.createdAt), dayDate)
    );

    return {
      dayDate: format(dayDate, formatStr),
      dayData,
    };
  };

  // Returns the data for selected range, if isCompare is true. Returns for compare range, if otherwise
  const getRangeData = (isCompare: boolean) => {
    let rangeData: any[] = [];
    for (let i = 0; i < daysInRange; i++) {
      const dayData = getDayData(i, isCompare);
      rangeData = [...rangeData, dayData];
    }
    return rangeData;
  };

  const rangeData: IDayData[] = getRangeData(false);
  const rangeVsData: IDayData[] = getRangeData(true);

  // Returns the data to be passed to the chart
  const data = rangeData.map((el, i) => {
    return {
      date: rangeData[i].dayDate,
      current: rangeData?.[i]?.dayData?.length || 0,
      compare: rangeVsData?.[i]?.dayData?.length || 0,
    };
  });

  // if (title === "Drafts") console.log(data);

  return (
    <CardWrapper
      onClick={onClick}
      className={cn(
        "flex-1 flex flex-col min-w-[250px] w-max max-w-[300px] h-[150px] transition-all",
        { "bg-primary-8": selected },
        className
      )}
    >
      <p className="text-sm text-foreground-5 mb-3">{title}</p>
      <div className="flex-1 flex justify-between gap-4 mb-2">
        <p className="sb-text-24 flex flex-row items-center gap-1 text-nowrap h-max font-semibold">
          {totalCurrent}
          {showCompare && " : " + totalCompare}
        </p>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={300} height={100} data={data}>
            <Line
              type="monotone"
              dataKey="current"
              stroke="#84d885"
              strokeWidth={2}
              dot={false}
            />
            {showCompare && (
              <Line
                type="monotone"
                dataKey="compare"
                stroke="#8884d8"
                strokeWidth={2}
                dot={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </CardWrapper>
  );
};

export default OverviewChart;

interface IDayData {
  dayDate: string;
  dayData: any[];
}
