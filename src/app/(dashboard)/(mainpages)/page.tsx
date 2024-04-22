"use client";

import DetailedAnalytics from "@/components/dashboard/detailedAnalytics";
import OverviewSection from "@/components/dashboard/overview";
import DashboardHeader from "@/components/dashboard/header";
import { format, isSameYear, startOfMonth, subDays } from "date-fns";
import React, { useState } from "react";
import TableSection from "./tableSection";
import { useRequestActions } from "./actions";

const Home = () => {
  const [dateFrom, setDateFrom] = useState(startOfMonth(new Date()));
  const [dateTo, setDateTo] = useState(new Date());
  const [selectedService, setSelectedService] = useState("");
  const [showCompare, setShowCompare] = useState(false);

  const { servicesRes, daysDiff, requestsByStatus, requestsVsByStatus, users } =
    useRequestActions({
      dateFrom,
      dateTo,
      selectedService,
    });

  const compareFrom = subDays(dateFrom, daysDiff);
  const compareTo = subDays(dateTo, daysDiff);
  const formatStr = isSameYear(compareFrom, dateFrom)
    ? "MMMM dd"
    : "MMMM dd, yyy";

  const compareLabel =
    format(compareFrom, formatStr) + "-" + format(compareTo, formatStr);

  return (
    <>
      <DashboardHeader
        dateFrom={dateFrom}
        dateTo={dateTo}
        setDateFrom={setDateFrom}
        setDateTo={setDateTo}
        daysDiff={daysDiff}
        isLoading={servicesRes.isLoading}
        errorMsg={servicesRes.error?.message}
        selectedService={selectedService}
        setSelectedService={setSelectedService}
        servicesNames={[]}
        compareLabel={compareLabel}
        showCompare={showCompare}
        setShowCompare={setShowCompare}
      />
      <div className="flex flex-col gap-8">
        <OverviewSection
          dateFrom={dateFrom}
          dateTo={dateTo}
          daysDiff={daysDiff}
          requestsByStatus={requestsByStatus}
          requestsVsByStatus={requestsVsByStatus}
          users={users}
        />
        <div className="flex flex-col gap-8 lg:flex-row">
          <DetailedAnalytics
            dateFrom={dateFrom}
            dateTo={dateTo}
            daysDiff={daysDiff}
            requestsByStatus={requestsByStatus}
            requestsVsByStatus={requestsVsByStatus}
            showCompare={showCompare}
            compareLabel={compareLabel}
          />
          <DetailedAnalytics
            dateFrom={dateFrom}
            dateTo={dateTo}
            daysDiff={daysDiff}
            requestsByStatus={requestsByStatus}
            requestsVsByStatus={requestsVsByStatus}
            showCompare={showCompare}
            partner
          />
        </div>
        <TableSection />
      </div>
    </>
  );
};

export default Home;
