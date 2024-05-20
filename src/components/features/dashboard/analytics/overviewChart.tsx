import DoChecks from "@/components/DoChecks";
import CardWrapper from "@/components/wrappers/cardWrapper";
import { cn } from "@/lib/utils";
import React, { MouseEventHandler } from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { useActions } from "./actions";
import OverviewChartSkt from "./skeleton/overviewChartSkt";

const OverviewChart = ({
  title,
  compareData,
  rangeData,
  className,
  dateFrom,
  compareFrom,
  selected,
  onClick,
  formatStr,
  showCompare,
  reqsDateData,
  compareDateData,
  isLoading,
}: IProps) => {
  const totalCurrent = rangeData?.length || 0;
  const totalCompare = compareData?.length || 0;

  const { getRangeData } = useActions({
    formatStr,
    compareFrom,
    dateFrom,
    rangeData,
    compareData,
    reqsDateData,
    compareDateData,
  });

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
      <DoChecks
        items={rangeData}
        isLoading={isLoading}
        className="flex-1 flex justify-between gap-4 mb-2"
        Skeleton={<OverviewChartSkt />}
        hideImg
      >
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
      </DoChecks>
    </CardWrapper>
  );
};

export default OverviewChart;

interface IDayData {
  dayDate: string;
  dayData: any[];
}

interface IProps {
  title: string;
  compareData: any[];
  rangeData: any[];
  bottomText?: string;
  className?: string;
  dateFrom?: Date;
  compareFrom?: Date;
  selected: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
  formatStr: string;
  showCompare: boolean;
  reqsDateData: { firstDate: Date; lastDate: Date; daysDiff: number };
  compareDateData: { firstDate: Date; lastDate: Date; daysDiff: number };
  isLoading: boolean;
}
