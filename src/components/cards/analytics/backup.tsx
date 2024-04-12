import CardWrapper from "@/components/wrappers/cardWrapper";
import { cn } from "@/lib/utils";
import {
  addDays,
  addMonths,
  differenceInDays,
  differenceInMonths,
  format,
  getDaysInMonth,
  isLastDayOfMonth,
  isSameDay,
  isSameMonth,
  subDays,
  subMonths,
} from "date-fns";
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
  previousFrom: Date;
  currentFrom: Date;
  currentTo: Date;
}) => {
  const totalCurrent = current?.length;
  const totalPrevious = previous?.length;

  const difference = totalCurrent - totalPrevious;
  let perc = 100 * difference || 0;
  const decreased = perc < 0;

  const totalDays = differenceInDays(currentTo, currentFrom) + 1;

  const getMonthsBetween = (startDate: Date, endDate: Date) => {
    // console.log(startDate, endDate);
    const months = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
      months.push(format(currentDate, "MMMM")); // Add formatted month name
      currentDate = addMonths(currentDate, 1); // Add 1 month
    }

    return months;
  };

  // const monthsBtw = getMonthsBetween(currentFrom, currentTo)?.length;

  // Only add if it is still thesame month after adding
  const incrementDays = (days: number, isCurrent: boolean) => {
    const date = isCurrent ? currentFrom : previousFrom;
    const dateCompare = isCurrent ? previousFrom : currentFrom;
    const added = addDays(date, days);
    const addedCompare = addDays(dateCompare, days);
    const isEqualDate = added.getDate() === addedCompare.getDate();
    if (!isEqualDate) {
      if (!isSameMonth(added, subDays(added, 1))) return null; // is same month
    }

    // const monthsBtw = isCurrent
    //   ? getMonthsBetween(addedCompare, added)
    //   : getMonthsBetween(added, addedCompare);
    // isCurrent
    //   ? console.log(addedCompare, added)
    //   : console.log(added, addedCompare);
    // console.log(monthsBtw);
    // const equalBtw =
    //   monthsBtw?.length === getMonthsBetween(currentFrom, currentTo)?.length;
    // console.log(equalBtw);
    // const sameMonth = isSameMonth(date, added);
    // const sameMonthRef = isSameMonth(date, addedRef);
    // if (equalBtw) return added;
    return added;

    // if (isSameDay(added, new Date("Mar 1, 2024")))
    // console.log(differenceInMonths(added, addedRef));
    // if (!sameMonth && sameMonthRef) return null;
    // return added;
  };

  // console.log(
  //   getMonthsBetween(new Date("Jan 1, 2024"), new Date("Mar 1, 2024"))
  // );

  // Returns the data to be passed to the chart
  const data = Array(totalDays)
    .fill("")
    .map((el, i) => {
      const stepDayCurr = incrementDays(i, true);
      const stepDayPrev = incrementDays(i, false);
      // console.log(stepDayCurr, stepDayPrev);
      if (previousFrom && currentFrom) {
        const dataForStepDayCurr = stepDayCurr
          ? current?.filter((el) => isSameDay(el.createdAt, stepDayCurr))
          : [];
        const dataForStepDayPrev = stepDayPrev
          ? previous?.filter((el) => isSameDay(el.createdAt, stepDayPrev))
          : [];
        const name1 = stepDayCurr ? format(stepDayCurr, "MMM dd, yyy") : "Void";
        const name2 = stepDayPrev ? format(stepDayPrev, "MMM dd, yyy") : "Void";

        return {
          name: name1 + " vs " + name2,
          current: dataForStepDayCurr?.length,
          previous: dataForStepDayPrev?.length,
        };
      }
    });

  // const data = Array(totalDays)
  //   .fill("")
  //   .map((el, i) => {
  //     const stepDayCurr = !isLastDayOfMonth(addDays(currentFrom, i))
  //       ? addDays(currentFrom, i)
  //       : null;
  //     const stepDayPrev = !isLastDayOfMonth(addDays(previousFrom, i))
  //       ? addDays(previousFrom, i)
  //       : null;
  //     if (previousFrom && currentFrom) {
  //       const dataForStepDayCurr = current?.filter((el) =>
  //         isSameDay(el.createdAt, stepDayCurr)
  //       );
  //       const dataForStepDayPrev = previous?.filter((el) =>
  //         isSameDay(el.createdAt, stepDayPrev)
  //       );
  //       const name1 = stepDayCurr ? format(stepDayCurr, "MMM dd, yyy") : "Void";
  //       const name2 = stepDayPrev ? format(stepDayPrev, "MMM dd, yyy") : "Void";

  //       return {
  //         name: name1 + " vs " + name2,
  //         current: dataForStepDayCurr?.length,
  //         previous: dataForStepDayPrev?.length,
  //       };
  //     }
  //   });

  if (title === "Drafts") console.log(data);

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
