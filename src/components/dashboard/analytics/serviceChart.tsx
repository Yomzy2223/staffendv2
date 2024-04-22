import { cn } from "@/lib/utils";
import {
  addDays,
  differenceInDays,
  format,
  isSameDay,
  isSameYear,
  setYear,
  subDays,
} from "date-fns";
import { ArrowDown, ArrowUp } from "lucide-react";
import React from "react";
import {
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  AreaChart,
  Area,
} from "recharts";
import Wrapper from "./wrapper";
import { IRequest } from "@/hooks/api/types";

const ServiceChart = ({
  title,
  compare,
  current,
  bottomText,
  className,
  compareFrom,
  currentFrom,
  currentTo,
  compareLabel,
  showCompare,
}: IProps) => {
  const totalCurrent = current?.length;
  const totalPrevious = compare?.length;

  const difference = totalCurrent - totalPrevious;
  let perc = 100 * difference || 0;
  const decreased = perc < 0;

  const formatStr = isSameYear(compareFrom, currentFrom)
    ? "MMMM dd"
    : "MMMM dd, yyy";

  // const monthsInRange = differenceInMonths(currentTo, currentFrom) + 1;
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

  return (
    <Wrapper title={title} description="kdaf">
      {/* <p className="sb-text-24 font-semibold">{totalCurrent}</p> */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              content={
                <CustomTooltip
                  daysInRange={daysInRange}
                  compare={compare}
                  formatStr={formatStr}
                  showCompare={showCompare}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="current"
              stroke="#8884d8"
              fill="#8884d8"
            />
            {showCompare && (
              <Area
                type="monotone"
                dataKey="compare"
                stroke="#ce44b2"
                fill="#ce44b2"
              />
            )}
          </AreaChart>
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
        <span className="ml-1 whitespace-nowrap">{compareLabel}</span>
      </div>
    </Wrapper>
  );
};

export default ServiceChart;

// CUSTOMIZED TOOLTIP
const CustomTooltip = (props: any) => {
  const {
    active,
    payload,
    label,
    daysInRange,
    compare,
    formatStr,
    showCompare,
  } = props;
  const activeDate = setYear(new Date(label), new Date().getFullYear());
  const vsDayData = compare?.filter((el: IRequest) =>
    isSameDay(new Date(el.createdAt), subDays(activeDate, daysInRange))
  );

  // console.log(props);
  if (active && payload && payload.length) {
    return (
      <div className="bg-background opacity-90 px-2 py-1 border border-border rounded shadow-sm">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        {showCompare && (
          <p className="">
            {format(subDays(label, daysInRange), formatStr)}:{" "}
            {vsDayData?.length}
          </p>
        )}
      </div>
    );
  }

  return null;
};

interface IProps {
  title: string;
  compare: IRequest[];
  current: IRequest[];
  bottomText?: string;
  className?: string;
  compareFrom: Date;
  currentFrom: Date;
  currentTo: Date;
  compareLabel: string;
  showCompare: boolean;
}

interface IDayData {
  dayDate: string;
  dayData: any[];
}
