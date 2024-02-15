"use client";

import GeneralTable from "@/components/tables/generalTable";
import CardWrapper from "@/components/wrappers/cardWrapper";
import React from "react";
import { useTableInfo } from "../../constants";

const TableSection = () => {
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

export default TableSection;

const serviceTableNav = [
  {
    name: "status",
    value: "all",
  },
  {
    name: "status",
    value: "completed",
  },
  {
    name: "status",
    value: "submitted",
  },
  {
    name: "status",
    value: "in progress",
  },
  {
    name: "status",
    value: "in draft",
  },
];
