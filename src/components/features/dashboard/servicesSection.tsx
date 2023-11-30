"use client";

import QueryNav2 from "@/components/navigation/queryNav2";
import SearchComp from "@/components/search";
import GeneralTable from "@/components/tables/generalTable";
import React from "react";
import { serviceTableNav } from "./constants";

const ServicesSection = () => {
  return (
    <div>
      <div className="flex justify-between gap-6">
        <div>
          <p className="sb-text-24 font-semibold mb-3">Recent services</p>
          <div className="flex flex-col items-center gap-3 text-sm font-normal mb-6 md:gap-4 md:flex-row">
            <span>Show only:</span>
            <QueryNav2 queryNav={serviceTableNav} />
          </div>
        </div>
        <SearchComp onSubmit={() => console.log("searching...")} />
      </div>

      <GeneralTable />
    </div>
  );
};

export default ServicesSection;
