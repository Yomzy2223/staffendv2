"use client";

import GeneralTable from "@/components/tables/generalTable";
import CardWrapper from "@/components/wrappers/cardWrapper";
import React from "react";
import { useTableInfo } from "../../actions";

const TableSection = () => {
  const { tableHeaders, tableBody } = useTableInfo();

  return (
    <CardWrapper>
      <GeneralTable
        tableHeaders={tableHeaders}
        tableBody={tableBody}
        tableNav={serviceTableNav}
      />
    </CardWrapper>
  );
};

export default TableSection;

const serviceTableNav = [
  {
    name: "status",
    value: "all",
    text: "All",
  },
  {
    name: "status",
    value: "completed",
    text: "Completed",
  },
  {
    name: "status",
    value: "submitted",
    text: "Submitted",
  },
  {
    name: "status",
    value: "in progress",
    text: "In Progress",
  },
  {
    name: "status",
    value: "in draft",
    text: "Draft",
  },
];
