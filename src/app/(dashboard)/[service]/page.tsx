"use client";

import DoChecks from "@/components/DoChecks";
import ServicesSection from "@/components/sections/homeSections/servicesSection";
import ServicesOverviewSection from "@/components/sections/servicesSections/overviewSection";
import { useParams } from "next/navigation";
import React from "react";

const Service = () => {
  const { service } = useParams();

  return (
    <DoChecks items={["d"]} emptyText="You have not added any product">
      <ServicesOverviewSection />
      <ServicesSection serviceTableNav={serviceTableNav} />
    </DoChecks>
  );
};

export default Service;

export const serviceTableNav = [
  {
    name: "status",
    value: "all",
  },
  {
    name: "status",
    value: "completed",
  },
  {
    name: "status",
    value: "submitted",
  },
  {
    name: "status",
    value: "in progress",
  },
  {
    name: "status",
    value: "in draft",
  },
];
