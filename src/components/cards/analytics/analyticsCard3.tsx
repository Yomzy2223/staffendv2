import { Chart3 } from "@/assets/images";
import CardWrapper from "@/components/wrappers/cardWrapper";
import { cn } from "@/lib/utils";
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
  total,
  bottomText,
  className,
}: {
  title: string;
  previous: number;
  current: number;
  total: number;
  bottomText?: string;
  className?: string;
}) => {
  const difference = current - previous;
  let perc = 100 * difference || 0;
  if (previous > 0) perc = parseInt((perc / previous).toFixed(2));
  const decreased = perc < 0;

  return (
    <CardWrapper
      className={cn(
        "flex flex-col justify-between min-w-max w-[200px] max-w-[300px] h-[150px]",
        className
      )}
    >
      <p className="text-sm text-foreground-5 mb-3">{title}</p>
      <div className="flex justify-between gap-4 mb-6">
        <p className="sb-text-24 font-semibold">{total}</p>
        {/* <Image src={Chart3} alt="analytics chart" /> */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={300} height={100} data={data}>
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
            />
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
    pv: 2400,
  },
  {
    pv: 1398,
  },
  {
    pv: 9800,
  },
  {
    pv: 3908,
  },
  {
    pv: 4800,
  },
  {
    pv: 3800,
  },
  {
    pv: 4300,
  },
];
