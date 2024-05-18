import CardWrapper from "@/components/wrappers/cardWrapper";
import { cn } from "@/lib/utils";
import { TRequestAll } from "@/services/request/types";
import {
  addDays,
  compareAsc,
  differenceInDays,
  format,
  isSameDay,
  subDays,
} from "date-fns";
import React, { MouseEventHandler } from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const OverviewChart = ({
  title,
  compareData,
  rangeData,
  className,
  dateFrom,
  dateTo,
  compareFrom,
  compareTo,
  selected,
  onClick,
  formatStr,
  showCompare,
  reqsDateData,
  compareDateData,
}: {
  title: string;
  compareData: any[];
  rangeData: any[];
  bottomText?: string;
  className?: string;
  dateFrom?: Date;
  dateTo?: Date;
  compareFrom?: Date;
  compareTo?: Date;
  selected: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
  formatStr: string;
  showCompare: boolean;
  reqsDateData: { firstDate: Date; lastDate: Date; daysDiff: number };
  compareDateData: { firstDate: Date; lastDate: Date; daysDiff: number };
}) => {
  const totalCurrent = rangeData?.length || 0;
  const totalCompare = compareData?.length || 0;

  // const getDataRangeInfo = (data: TRequestAll[]) => {
  //   const sortedData = data?.sort((a, b) =>
  //     compareAsc(a?.createdAt, b?.createdAt)
  //   );
  //   const firstDate = sortedData?.[0]?.createdAt;
  //   const lastDate = sortedData?.[sortedData?.length - 1]?.createdAt;
  //   const daysDiff =
  //     firstDate && lastDate ? differenceInDays(lastDate, firstDate) + 1 : 0;
  //   return {
  //     daysDiff,
  //     firstDate: new Date(firstDate),
  //     lastDate: new Date(lastDate),
  //   };
  // };

  // const daysInDateRange =
  //   dateTo && dateFrom
  //     ? differenceInDays(dateTo, dateFrom) + 1
  //     : getDataRangeInfo(rangeData)?.daysDiff;
  // const daysInCompareRange =
  //   compareTo && compareFrom
  //     ? differenceInDays(compareTo, compareFrom) + 1
  //     : getDataRangeInfo(compareData)?.daysDiff;

  // Returns the data for each day
  const getDayData = (inc: number, isCompare: boolean) => {
    const allData = isCompare ? compareData : rangeData;
    const dayDate = isCompare
      ? compareFrom
        ? addDays(compareFrom, inc)
        : addDays(
            subDays(compareDateData.firstDate, compareDateData.daysDiff),
            inc
          )
      : dateFrom
      ? addDays(dateFrom, inc)
      : addDays(reqsDateData.firstDate, inc);
    if (dayDate) {
      const dayData = allData?.filter((el) =>
        isSameDay(new Date(el.createdAt), dayDate)
      );

      return {
        dayDate: format(dayDate, formatStr),
        dayData,
      };
    }
  };

  // Returns the data for selected range, if isCompare is true. Returns for compare range, if otherwise
  const getRangeData = (isCompare: boolean) => {
    let rangeData: any[] = [];
    const daysInRange = isCompare
      ? compareDateData.daysDiff
      : reqsDateData.daysDiff;
    for (let i = 0; i < daysInRange; i++) {
      const dayData = getDayData(i, isCompare);
      rangeData = [...rangeData, dayData];
    }
    return rangeData;
  };

  const rangeChartData: IDayData[] = getRangeData(false);
  const compareChartData: IDayData[] = getRangeData(true);

  // Returns the data to be passed to the chart
  const data = rangeChartData.map((el, i) => {
    return {
      date: rangeChartData[i].dayDate,
      current: rangeChartData?.[i]?.dayData?.length || 0,
      compare: compareChartData?.[i]?.dayData?.length || 0,
    };
  });
  // if (title === "Submitted") console.log(getDataRangeInfo(rangeData));

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
