import { Chart3 } from "@/assets/images";
import CardWrapper from "@/components/wrappers/cardWrapper";
import { cn } from "@/lib/utils";
import {
  addDays,
  differenceInDays,
  format,
  formatDate,
  isDate,
  isSameDay,
  isValid,
  startOfMonth,
  subMonths,
} from "date-fns";
import { ArrowDown, ArrowUp } from "lucide-react";
import Image from "next/image";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AnalyticsCard3 = ({
  title,
  previous,
  current,
  bottomText,
  className,
  dateFrom,
  dateTo,
}: {
  title: string;
  previous: any[];
  current: any[];
  bottomText?: string;
  className?: string;
  dateFrom: Date | string;
  dateTo: Date | string;
}) => {
  const totalCurrent = current?.length;
  const totalPrevious = previous?.length;

  const difference = totalCurrent - totalPrevious;
  let perc = 100 * difference || 0;
  // if (totalPrevious > 0) perc = parseInt((perc / totalPrevious).toFixed(2));
  const decreased = perc < 0;

  if (title === "Drafts") console.log(totalPrevious, totalCurrent);

  const startCurrent = isValid(dateTo) ? dateTo : startOfMonth(new Date());
  const startPrev = isValid(dateFrom) ? dateFrom : subMonths(startCurrent, 1);
  const totalDays =
    isValid(dateTo) || isValid(dateFrom)
      ? differenceInDays(startCurrent, startPrev)
      : new Date().getDate();

  const da = Array(totalDays)
    .fill("")
    .map((el, i) => {
      const stepDayCurr = addDays(startCurrent, i);
      const stepDayPrev = addDays(startPrev, i);
      if (startPrev && startCurrent) {
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
          current: dataForStepDayCurr,
          previous: dataForStepDayPrev,
        };
      }
    });

  if (title === "Drafts") console.log(previous);

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

const data = [
  {
    current: 400,
    previous: 2100,
  },
  {
    current: 2400,
    previous: 1398,
  },
  {
    current: 9800,
    previous: 9200,
  },
  {
    current: 3908,
    previous: 2908,
  },
  {
    current: 4800,
    previous: 4900,
  },
  {
    current: 4800,
    previous: 3800,
  },
  {
    current: 4800,
    previous: 4100,
  },
];

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: string }[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="label">{`${label} : ${payload[1].value}`}</p>
        <p className="intro">{label}</p>
        <p className="desc">Anything you want can be displayed here.</p>
      </div>
    );
  }

  return null;
};
