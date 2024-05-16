"use client";

import DoChecks from "@/components/DoChecks";
import ServicesSection from "@/components/features/services/servicesSection";
import ServiceTableSection from "@/components/features/services/serviceTableSection";
import ServiceForm from "@/components/form/serviceForm";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { useGetAllServicesQuery } from "@/services/service";
import { startOfMonth } from "date-fns";
import { redirect, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import slugify from "slugify";

const Service = () => {
  const [dateFrom, setDateFrom] = useState(startOfMonth(new Date()));
  const [dateTo, setDateTo] = useState(new Date());
  const [showCompare, setShowCompare] = useState(false);
  const [open, setOpen] = useState(false);

  const { setQuery } = useGlobalFunctions();
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("serviceId");

  const servicesRes = useGetAllServicesQuery();
  const services = servicesRes.data?.data?.data;

  if (!serviceId && services?.[0])
    setQuery("serviceId", `${slugify(services[0].id)}`);

  const addNewService = () => {
    setOpen(true);
    setQuery("action", "edit");
  };

  return (
    <>
      <DoChecks
        items={services || []}
        emptyText="You have not added any service"
        btnText="Add new service"
        btnAction={addNewService}
        className="flex flex-col gap-8"
      >
        <ServicesSection
          services={services}
          isLoading={servicesRes.isLoading}
        />
        <ServiceTableSection dateFrom={dateFrom} dateTo={dateTo} />
      </DoChecks>
      <ServiceForm setOpen={setOpen} open={open} />
    </>
  );
};

export default Service;
