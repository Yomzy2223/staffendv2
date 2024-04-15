"use client";

import ConfirmAction from "@/components/confirmAction";
import PartnerAssignDialog from "@/components/dialogs/partnerAssign";
import GeneralTable from "@/components/tables/generalTable";
import CardWrapper from "@/components/wrappers/cardWrapper";
import React, { useState } from "react";
import { useTableActions } from "../../tableActions";

const TableSection = ({ serviceId }: { serviceId: string }) => {
  const [openAssign, setOpenAssign] = useState(false);
  const [openUnAssign, setOpenUnAssign] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [partnerId, setPartnerId] = useState("");

  const itemsPerPage = 10;

  const {
    tableHeaders,
    tableBody,
    totalRequests,
    handleSearchChange,
    handleSearchSubmit,
    unAssignRequestMutation,
    requestsLoading,
  } = useTableActions({
    setOpenAssign,
    setSelectedRequests,
    setOpenInfo,
    setOpenUnAssign,
    itemsPerPage,
    setPartnerId,
    serviceId,
  });

  return (
    <>
      <GeneralTable
        tableHeaders={tableHeaders}
        tableBody={tableBody}
        tableNav={serviceTableNav}
        itemsLength={totalRequests}
        itemsPerPage={itemsPerPage}
        onRowSelect={(selected) => setSelectedRequests(selected)}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        dataLoading={requestsLoading}
      />
      <PartnerAssignDialog
        setOpen={setOpenAssign}
        open={openAssign}
        selectedRequests={selectedRequests}
        setSelectedRequests={setSelectedRequests}
      />

      {openUnAssign && (
        <ConfirmAction
          open={openUnAssign}
          setOpen={setOpenUnAssign}
          confirmAction={() =>
            unAssignRequestMutation.mutate(
              {
                formInfo: { userId: partnerId, requestIds: selectedRequests },
              },
              {
                onSuccess: () => setOpenUnAssign(false),
              }
            )
          }
          title="Unassign Task"
          description="Are you sure you want to unasssign this task? Partner will be notified."
          isLoading={unAssignRequestMutation.isPending}
          dismissible
          isDelete
        />
      )}
    </>
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
