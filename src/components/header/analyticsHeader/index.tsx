import QueryNav from "@/components/navigation/queryNav";
import React from "react";

interface propsType {
  title: string;
  description: string;
  queryNav: { name: string; value: string }[];
}

const AnalyticsHeader = ({ title, description, queryNav }: propsType) => {
  return (
    <div className="flex flex-col justify-between gap-2 lg:flex-row lg:items-start lg:gap-6">
      <div>
        <p className="sb-text-24 font-semibold mb-2">{title}</p>
        <p className="hidden text-base text-foreground-5 font-normal lg:flex">
          {description}
        </p>
      </div>
      <QueryNav queryNav={queryNav} defaultActive={1} />
    </div>
  );
};

export default AnalyticsHeader;
