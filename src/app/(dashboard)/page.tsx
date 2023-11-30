import AnalyticsSection from "@/components/features/dashboard/analyticsSection";
import OverviewSection from "@/components/features/dashboard/overviewSection";
import ServicesSection from "@/components/features/dashboard/servicesSection";
import { Header } from "@/components/header";
import { Navigation } from "@/components/navigation";
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
        <ServicesSection />
      </div>
    </div>
  );
};

export default Home;
