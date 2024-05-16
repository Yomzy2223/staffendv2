"use client";

import ServiceForm from "@/components/form/serviceForm";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { format, isSameYear, startOfMonth, subDays } from "date-fns";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { useRequestActions } from "../../actions";
import { useGetServiceQuery } from "@/services/service";
import { useGetServiceRequestsQuery } from "@/services/request";
import { TRequestStatus } from "@/services/request/types";
import ServiceTableSection from "@/components/features/services/serviceTableSection";
import ServicesSection from "@/components/features/services/servicesSection";

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
    <div className="flex flex-col gap-8">
      <ServicesSection />
      <ServiceTableSection dateFrom={dateFrom} dateTo={dateTo} />
      <ServiceForm setOpen={setOpen} open={open} />
    </div>
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
