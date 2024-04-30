"use client";

import ServiceSummaryCard from "@/components/cards/serviceSummaryCard";
import ServiceForm from "@/components/form/serviceForm";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { format, isSameYear, startOfMonth, subDays } from "date-fns";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { useRequestActions } from "../../actions";
import TableSection from "../../tableSection";
import { useGetServiceQuery } from "@/services/service";
import { useGetServiceRequestsQuery } from "@/services/request";
import OverviewSection from "@/components/dashboard/overview";
import ServiceHeader from "@/components/dashboard/serviceHeader";
import DetailedAnalytics from "@/components/dashboard/detailedAnalytics";
import { TRequestStatus } from "@/services/request/types";

const Service = ({ params }: { params: { serviceId: string } }) => {
  const [dateFrom, setDateFrom] = useState(startOfMonth(new Date()));
  const [dateTo, setDateTo] = useState(new Date());
  const [showCompare, setShowCompare] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedOverview, setSelectedOverview] = useState<TRequestStatus>();

  const { setQuery } = useGlobalFunctions();
  const { serviceId } = params;

  const request = useGetServiceRequestsQuery({ serviceId: serviceId });
  const requestsData = request.data?.data?.data;

  const service = useGetServiceQuery(serviceId as string);
  const serviceData = service?.data?.data?.data;
  if (!serviceData && !service.isLoading) redirect("/services");

  const {
    activeService,
    servicesNames,
    servicesRes,
    daysDiff,
    requestsByStatus,
    requestsVsByStatus,
    users,
  } = useRequestActions({
    dateFrom,
    dateTo,
    selectedService: serviceId,
  });

  const compareFrom = subDays(dateFrom, daysDiff);
  const compareTo = subDays(dateTo, daysDiff);
  const formatStr = isSameYear(compareFrom, dateFrom)
    ? "MMMM dd"
    : "MMMM dd, yyy";

  const compareLabel =
    format(compareFrom, formatStr) + " - " + format(compareTo, formatStr);

  const addNewService = () => {
    setOpen(true);
    setQuery("action", "edit");
  };

  return (
    <>
      <div className="flex flex-col gap-8 pt-4 pb-6 ">
        <ServiceHeader
          dateFrom={dateFrom}
          dateTo={dateTo}
          setDateFrom={setDateFrom}
          setDateTo={setDateTo}
          daysDiff={daysDiff}
          selectedService={activeService?.name || ""}
        />
        <div className="flex flex-nowrap gap-8 overflow-auto px-1 py-2">
          <ServiceSummaryCard
            totalProducts={requestsData?.length || 0}
            serviceData={serviceData}
            isLoading={service.isLoading}
          />
          <OverviewSection
            dateFrom={dateFrom}
            dateTo={dateTo}
            daysDiff={daysDiff}
            requestsByStatus={requestsByStatus}
            requestsVsByStatus={requestsVsByStatus}
            users={users}
            formatStr={formatStr}
            showCompare={showCompare}
            hideUserCard
          />
        </div>
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
      </div>
      <TableSection
        selectedServiceId={serviceId}
        dateFrom={dateFrom}
        dateTo={dateTo}
      />{" "}
      <ServiceForm setOpen={setOpen} open={open} />
    </>
  );
};

export default Service;

const paymentQueryNav = [
  {
    name: "payment-date-range",
    value: "weekly",
  },
  {
    name: "payment-date-range",
    value: "monthly",
  },
  {
    name: "payment-date-range",
    value: "yearly",
  },
];
