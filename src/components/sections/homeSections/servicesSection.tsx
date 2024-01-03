"use client";

import GeneralTable from "@/components/tables/generalTable";
import CardWrapper from "@/components/wrappers/cardWrapper";
import React from "react";
import { useTableInfo } from "./constants";

const ServicesSection = ({
  serviceTableNav,
}: {
  serviceTableNav: { name: string; value: string }[];
}) => {
  const { tableHeaders, tableBody } = useTableInfo();

  return (
    <CardWrapper>
      <GeneralTable
        tableHeaders={tableHeaders}
        tableBody={tableBody}
        serviceTableNav={serviceTableNav}
      />
    </CardWrapper>
  );
};

export default ServicesSection;
