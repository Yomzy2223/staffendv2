"use client";

import DetailedAnalytics from "@/components/features/dashboard/detailedAnalytics";
import OverviewSection from "@/components/features/dashboard/overview";
import DashboardHeader from "@/components/features/dashboard/header";
import {
  differenceInDays,
  format,
  isSameYear,
  startOfMonth,
  subDays,
} from "date-fns";
import React, { useEffect, useState } from "react";
import { useRequestActions } from "./actions";
import { TRequestStatus } from "@/services/request/types";
import ServiceTableSection from "@/components/features/services/serviceTableSection";

const Home = () => {
  const [dateFrom, setDateFrom] = useState(startOfMonth(new Date()));
  const [dateTo, setDateTo] = useState(new Date());
  const [selectedService, setSelectedService] = useState("");
  const [showCompare, setShowCompare] = useState(false);

  let daysDiff = differenceInDays(dateTo, dateFrom) + 1; // Complements for the last day

  const [compareFrom, setCompareFrom] = useState(subDays(dateFrom, daysDiff));
  const [compareTo, setCompareTo] = useState(subDays(dateTo, daysDiff));

  const [selectedOverview, setSelectedOverview] = useState<TRequestStatus>();

  const {
    activeService,
    servicesNames,
    servicesRes,
    // daysDiff,
    requestsByStatus,
    requestsVsByStatus,
    users,
  } = useRequestActions({
    dateFrom,
    dateTo,
    selectedService,
  });

  useEffect(() => {
    setCompareFrom(subDays(dateFrom, daysDiff));
    setCompareTo(subDays(dateTo, daysDiff));
  }, [dateFrom, dateTo]);

  const formatStr = isSameYear(compareFrom, dateFrom)
    ? "MMMM dd"
    : "MMMM dd, yyy";

  const compareLabel =
    format(compareFrom, formatStr) + " - " + format(compareTo, formatStr);

  return (
    <>
      <DashboardHeader
        dateFrom={dateFrom}
        dateTo={dateTo}
        setDateFrom={setDateFrom}
        setDateTo={setDateTo}
        compareFrom={compareFrom}
        compareTo={compareTo}
        setCompareFrom={setCompareFrom}
        setCompareTo={setCompareTo}
        daysDiff={daysDiff}
        isLoading={servicesRes.isLoading}
        errorMsg={servicesRes.error?.message}
        selectedService={activeService?.name || ""}
        setSelectedService={setSelectedService}
        servicesNames={servicesNames}
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
          selectedOverview={selectedOverview}
          setSelectedOverview={setSelectedOverview}
          formatStr={formatStr}
          showCompare={showCompare}
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
            activeService={activeService?.name}
            selectedOverview={selectedOverview}
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
        <ServiceTableSection dateFrom={dateFrom} dateTo={dateTo} />
      </div>
    </>
  );
};

export default Home;
