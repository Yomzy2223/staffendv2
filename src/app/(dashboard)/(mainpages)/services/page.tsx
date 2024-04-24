"use client";

import DoChecks from "@/components/DoChecks";
import ServiceForm from "@/components/form/serviceForm";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { useGetAllServicesQuery } from "@/services/service";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import slugify from "slugify";

const Service = () => {
  const [open, setOpen] = useState(false);
  const { setQuery } = useGlobalFunctions();

  const { data } = useGetAllServicesQuery();
  const services = data?.data?.data;

  if (services?.[0]) redirect(`/services/${slugify(services[0].id)}`);

  const addNewService = () => {
    setOpen(true);
    setQuery("action", "edit");
  };

  return (
    <>
      <DoChecks
        items={[]}
        emptyText="You have not added any service"
        btnText="Add new service"
        btnAction={addNewService}
      >
        No service has been added
      </DoChecks>
      <ServiceForm setOpen={setOpen} open={open} />
    </>
  );
};

export default Service;
