"use client";

import OverviewSection, { TOverviewStatus } from "@/components/features/dashboard/overview";
import DashboardHeader from "@/components/features/dashboard/header";
import { format, isSameYear } from "date-fns";
import React, { useState } from "react";
import { useRequestActions } from "./actions";
import ServiceTableSection from "@/components/features/services/serviceTableSection";
import RevenueChart from "@/components/features/dashboard/analytics/revenueChart";
import PartnerChart from "@/components/features/dashboard/analytics/partnerChart";

const Home = () => {
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [compareFrom, setCompareFrom] = useState<Date>();
  const [compareTo, setCompareTo] = useState<Date>();
  const [selectedService, setSelectedService] = useState("");
  const [showCompare, setShowCompare] = useState(false);
  const [selectedOverview, setSelectedOverview] = useState<TOverviewStatus>();

  const {
    activeService,
    servicesNames,
    servicesRes,
    requestsByStatus,
    requestsVsByStatus,
    users,
    reqsDateData,
    compareDateData,
    requestsLoading,
    requestsVsLoading,
  } = useRequestActions({
    dateFrom,
    dateTo,
    compareFrom,
    compareTo,
    selectedService,
  });

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
        reqsDateData={reqsDateData}
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
          requestsLoading={requestsLoading}
          requestsVsLoading={requestsVsLoading}
        />
        <div className="flex flex-col gap-8 lg:flex-row">
          <RevenueChart
            selectedOverview={selectedOverview}
            dateTo={dateTo}
            dateFrom={dateFrom}
            compareFrom={compareFrom}
            compareLabel={compareLabel}
            showCompare={showCompare}
            activeService={activeService?.name || ""}
            daysDiff={reqsDateData.daysDiff}
            compareDateData={compareDateData}
            reqsDateData={reqsDateData}
            formatStr={formatStr}
            isLoading={requestsLoading || requestsVsLoading}
            rangeData={
              selectedOverview
                ? requestsByStatus[selectedOverview] // Passed status filtered request data
                : requestsByStatus.allPaid // Passed service revenue data
            }
            compareData={
              selectedOverview
                ? requestsVsByStatus[selectedOverview] // Passed status filtered request compare data
                : requestsVsByStatus.allPaid // Passed service revenue compare data
            }
          />

          <PartnerChart
            selectedOverview={selectedOverview}
            dateTo={dateTo}
            dateFrom={dateFrom}
            compareFrom={compareFrom}
            compareLabel={compareLabel}
            showCompare={showCompare}
            activeServiceId={activeService?.id || ""}
          />
        </div>
        <ServiceTableSection
          dateFrom={dateFrom}
          dateTo={dateTo}
          basePath="home"
          activeServiceId={activeService?.id}
        />
      </div>
    </>
  );
};

export default Home;
