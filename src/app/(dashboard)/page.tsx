import AnalyticsSection from "@/components/sections/homeSections/analyticsSection";
import OverviewSection from "@/components/sections/homeSections/homeOverviewSection";
import ServicesSection from "@/components/sections/homeSections/servicesSection";
import SelectMonthAndYear from "@/components/select/selectMonthAndYear";
import React from "react";

const Home = () => {
  return (
    <div>
      <div className="flex items-center justify-between gap-5 w-full pt-6 pb-4 sm:pb-6">
        <p className="sb-text-16 font-semibold">MONTHLY OVERVIEW</p>
        <SelectMonthAndYear />
      </div>
      <div className="flex flex-col gap-8">
        <OverviewSection />
        <AnalyticsSection />
        <ServicesSection serviceTableNav={serviceTableNav} />
      </div>
    </div>
  );
};

export default Home;

export const serviceTableNav = [
  {
    name: "service",
    value: "onboard",
  },
  {
    name: "service",
    value: "launch",
  },
  {
    name: "service",
    value: "manage",
  },
  {
    name: "service",
    value: "tax",
  },
];
