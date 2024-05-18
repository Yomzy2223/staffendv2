"use client";

import OverviewSection, {
  IOverviewStatus,
} from "@/components/features/dashboard/overview";
import DashboardHeader from "@/components/features/dashboard/header";
import {
  compareAsc,
  differenceInDays,
  format,
  isSameYear,
  subDays,
} from "date-fns";
import React, { useEffect, useState } from "react";
import { useRequestActions } from "./actions";

const Home = () => {
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [compareFrom, setCompareFrom] = useState<Date>();
  const [compareTo, setCompareTo] = useState<Date>();
  const [selectedService, setSelectedService] = useState("");
  const [showCompare, setShowCompare] = useState(false);
  const [selectedOverview, setSelectedOverview] = useState<IOverviewStatus>();

  const rangeSelected = dateFrom && dateTo;

  const {
    activeService,
    servicesNames,
    servicesRes,
    requestsByStatus,
    requestsVsByStatus,
    users,
    reqsDateData,
    compareDateData,
  } = useRequestActions({
    dateFrom,
    dateTo,
    compareFrom,
    compareTo,
    selectedService,
  });

  useEffect(() => {
    if (rangeSelected) {
      setCompareFrom(subDays(dateFrom, compareDateData.daysDiff));
      setCompareTo(subDays(dateTo, compareDateData.daysDiff));
    }
  }, [dateFrom, dateTo]);

  const formatStr =
    compareFrom && dateFrom
      ? isSameYear(compareFrom, dateFrom)
        ? "MMMM dd"
        : "MMMM dd, yyy"
      : "MMMM dd, yyy";

  const compareLabel =
    compareFrom && compareTo
      ? format(compareFrom, formatStr) + " - " + format(compareTo, formatStr)
      : "";

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
        daysDiff={reqsDateData.daysDiff}
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
          compareFrom={compareFrom}
          compareTo={compareTo}
          reqsDateData={reqsDateData}
          compareDateData={compareDateData}
          requestsByStatus={requestsByStatus}
          requestsVsByStatus={requestsVsByStatus}
          users={users}
          selectedOverview={selectedOverview}
          setSelectedOverview={setSelectedOverview}
          formatStr={formatStr}
          showCompare={showCompare}
        />
        {/* <div className="flex flex-col gap-8 lg:flex-row">
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
        <ServiceTableSection dateFrom={dateFrom} dateTo={dateTo} /> */}
      </div>
    </>
  );
};

export default Home;
