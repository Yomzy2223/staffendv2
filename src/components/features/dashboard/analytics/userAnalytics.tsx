import { Chart2 } from "@/assets/images";
import CardWrapper from "@/components/wrappers/cardWrapper";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
const UserAnalytics = ({
  title,
  total,
  className,
}: {
  title: string;
  total: number;
  className?: string;
}) => {
  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
  ];
  const COLORS = ["#0088FE", "#00C49F"];

  return (
    <CardWrapper
      className={cn(
        "flex flex-col gap-4 min-w-[250px] max-w-[300px] h-[150px]",
        className
      )}
    >
      <div className="flex flex-1 justify-between">
        <div className="flex flex-col gap-3">
          <p className="text-sm text-foreground-5">{title}</p>
          <p className="sb-text-24 font-semibold">{total}</p>
        </div>

        <Image src={Chart2} alt="analytics chart" className="object-contain" />
        {/* <div className="w-1/2 h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={200} height={100}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={40}
                fill="#8884d8"
                dataKey="value"
              >
                <Cell fill="hsl(var(--primary))" />
                <Cell fill="hsl(var(--secondary))" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div> */}
      </div>
      <div className="flex gap-3 w-max mx-auto">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-sm text-foreground-5 font-normal ml-1">
            Direct
          </span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-secondary" />
          <span className="text-sm text-foreground-5 font-normal ml-1">
            Referrals
          </span>
        </div>
      </div>
    </CardWrapper>
  );
};

export default UserAnalytics;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const RADIAN = Math.PI / 180;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
