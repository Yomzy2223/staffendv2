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
  CartesianGrid,
} from "recharts";
import Wrapper from "./wrapper";
import { TRequestAll } from "@/services/request/types";
import { TOverviewStatus } from "../overview";
import { useActions } from "./actions";

const RevenueChart = ({
  dateFrom,
  dateTo,
  compareFrom,
  compareLabel,
  showCompare,
  activeService,
  selectedOverview,
  formatStr,
  rangeData,
  compareData,
  reqsDateData,
  compareDateData,
  daysDiff,
  isLoading,
}: IProps) => {
  // TODO: calculate the total paid amount
  const total = selectedOverview ? rangeData?.length || 0 : 0;
  const totalCompare = selectedOverview ? compareData?.length || 0 : 0;

  const { getRangeData } = useActions({
    formatStr,
    compareFrom,
    dateFrom,
    rangeData,
    compareData,
    reqsDateData,
    compareDateData,
  });

  // const difference = total - totalCompare;
  let perc = ((total - totalCompare) / (totalCompare || 1)) * 100;
  perc = parseFloat(perc.toFixed(2));

  // let perc = 100 * difference || 0;
  const decreased = perc < 0;

  // const formatStr = isSameYear(compareFrom, dateFrom)
  //   ? "MMMM dd"
  //   : "MMMM dd, yyy";

  const rangeLabel =
    dateFrom && dateTo
      ? format(dateFrom, formatStr) + " - " + format(dateTo, formatStr)
      : reqsDateData.firstDate && reqsDateData.lastDate
      ? format(reqsDateData.firstDate, formatStr) +
        " - " +
        format(reqsDateData.lastDate, formatStr)
      : "";

  // Returns the data to be passed to the chart
  const rangeChartData: IDayData[] = getRangeData(false);
  const compareChartData: IDayData[] = getRangeData(true);

  // Returns the data to be passed to the chart
  const data = rangeChartData?.map((el, i) => {
    return {
      date: rangeChartData[i].dayDate,
      current: rangeChartData?.[i]?.dayData?.length || 0,
      compare: compareChartData?.[i]?.dayData?.length || 0,
    };
  });

  return (
    <Wrapper
      activeService={activeService}
      compareLabel={compareLabel}
      rangeLabel={rangeLabel}
      totalCompare={totalCompare}
      total={total}
      selectedOverview={selectedOverview}
      showCompare={showCompare}
      className="gap-6"
    >
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: -30,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical />
            <XAxis dataKey="date" axisLine={false} />
            <YAxis axisLine={false} allowDecimals={false} />
            <Tooltip
              content={
                <CustomTooltip
                  daysInRange={daysDiff}
                  compareData={compareData}
                  formatStr={formatStr}
                  showCompare={showCompare}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="current"
              stroke="#84d892"
              fill="#3dc39067"
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
      {showCompare && (
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
            {perc}% vs {compareLabel}
          </span>
        </div>
      )}
    </Wrapper>
  );
};

export default RevenueChart;

// CUSTOMIZED TOOLTIP
const CustomTooltip = (props: any) => {
  const {
    active,
    payload,
    label,
    daysInRange,
    compareData,
    formatStr,
    showCompare,
  } = props;
  const activeDate = setYear(new Date(label), new Date().getFullYear());
  const vsDayData = compareData?.filter((el: TRequestAll) =>
    isSameDay(new Date(el.createdAt), subDays(activeDate, daysInRange))
  );

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
  className?: string;
  dateFrom?: Date;
  dateTo?: Date;
  compareFrom?: Date;
  compareLabel: string;
  showCompare: boolean;
  activeService?: string;
  selectedOverview?: TOverviewStatus;
  formatStr: string;
  rangeData?: TRequestAll[];
  compareData?: TRequestAll[];
  reqsDateData: { firstDate: Date; lastDate: Date; daysDiff: number };
  compareDateData: { firstDate: Date; lastDate: Date; daysDiff: number };
  daysDiff: number;
  isLoading: boolean;
}

interface IDayData {
  dayDate: string;
  dayData: any[];
}
