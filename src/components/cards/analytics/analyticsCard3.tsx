import CardWrapper from "@/components/wrappers/cardWrapper";
import { cn } from "@/lib/utils";
import {
  addDays,
  addMonths,
  differenceInDays,
  differenceInMonths,
  format,
  getDaysInMonth,
  getMonth,
  isLastDayOfMonth,
  isSameDay,
  isSameMonth,
  lastDayOfMonth,
  setDate,
  subDays,
  subMonths,
} from "date-fns";
import { ArrowDown, ArrowUp } from "lucide-react";
import React from "react";
import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

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
  previousFrom: Date;
  currentFrom: Date;
  currentTo: Date;
}) => {
  const totalCurrent = current?.length;
  const totalPrevious = previous?.length;

  const difference = totalCurrent - totalPrevious;
  let perc = 100 * difference || 0;
  const decreased = perc < 0;

  const monthsInRange = differenceInMonths(currentTo, currentFrom) + 1;

  // Returns the data for one month
  const getMonthData = (monthInc: number, isCurrent: boolean) => {
    const month = isCurrent ? currentFrom : previousFrom;
    const monthVs = isCurrent ? currentTo : currentFrom;
    const monthAdded = addMonths(month, monthInc);
    const monthVsAdded = addMonths(monthVs, monthInc);
    const data = isCurrent ? current : previous;

    let daysInGreaterMonth = getDaysInMonth(monthAdded);
    if (getDaysInMonth(monthVsAdded) > daysInGreaterMonth)
      daysInGreaterMonth = getDaysInMonth(monthVsAdded);

    let days = daysInGreaterMonth;
    if (isSameMonth(new Date(), monthAdded)) days = new Date().getDate();

    let monthData: any[] = [];
    for (let i = 1; i <= days; i++) {
      // Return the data for each day
      const matchData = data?.filter((el) => {
        const sameDay = new Date(el.createdAt).getDate() === i;
        const sameMonth = isSameMonth(new Date(el.createdAt), monthAdded);
        return sameMonth && sameDay;
      });
      // Restructure the data for each day
      const date = setDate(monthAdded, i);
      // date = lastDayOfMonth

      const dayDate =
        getDaysInMonth(monthAdded) >= i ? format(date, "dd MMM, yyy") : "Void";
      const dayData: IDayData = {
        dayDate,
        dayData: matchData,
      };
      monthData = [...monthData, dayData];
    }

    return monthData;
  };

  // Returns the data for selected range, if isCurrent is true. Returns for compare range, if otherwise
  const getRangeData = (isCurrent: boolean) => {
    let rangeData: any[] = [];
    for (let i = 0; i < monthsInRange; i++) {
      const monthData = getMonthData(i, isCurrent);
      rangeData = [...rangeData, ...monthData];
    }
    return rangeData;
  };

  const rangeData: IDayData[] = getRangeData(true);
  const rangeVsData: IDayData[] = getRangeData(false);

  // Returns the data to be passed to the chart
  const data = Array(rangeData?.length)
    .fill("")
    .map((el, i) => {
      return {
        name: rangeData[i].dayDate + " " + rangeVsData[i].dayDate,
        current: rangeData?.[i]?.dayData?.length || 0,
        previous: rangeVsData?.[i]?.dayData?.length || 0,
      };
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
            <Tooltip
              wrapperStyle={{ opacity: 0.8 }}
              label
              // content={<CustomTooltip />}
            />
            {/* <XAxis dataKey="name" /> */}
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

// const CustomTooltip = (props) => {
//   console.log(props);
//   return <div></div>;
//   // if (active && payload && payload.length) {
//   //   return (
//   //     <div className="custom-tooltip">
//   //       <p className="label">{`${label} : ${payload[0].value}`}</p>
//   //       {/* <p className="intro">{getIntroOfPage(label)}</p> */}
//   //       <p className="desc">Anything you want can be displayed here.</p>
//   //     </div>
//   //   );
//   // }
// };

interface IDayData {
  dayDate: string;
  dayData: any[];
}
