"use client";

import PartnerAssignDialog from "@/components/dialogs/partnerAssign";
import GeneralTable from "@/components/tables/generalTable";
import CardWrapper from "@/components/wrappers/cardWrapper";
import React, { useState } from "react";
import { useTableInfo } from "../../actions";

const TableSection = () => {
  const [open, setOpen] = useState(false);
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);

  const { tableHeaders, tableBody } = useTableInfo({
    setOpen,
    setSelectedRequests,
  });

  return (
    <CardWrapper>
      <GeneralTable
        tableHeaders={tableHeaders}
        tableBody={tableBody}
        tableNav={serviceTableNav}
      />
      <PartnerAssignDialog
        setOpen={setOpen}
        open={open}
        selectedRequests={selectedRequests}
        setSelectedRequests={setSelectedRequests}
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
