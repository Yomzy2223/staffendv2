"use client";

import ConfirmAction from "@/components/confirmAction";
import PartnerAssignDialog from "@/components/dialogs/partnerAssign";
import PreviewDetails from "@/components/tables/details/previewDetails";
import GeneralTable from "@/components/tables/generalTable";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { cn } from "@/lib/utils";
import { useGetRequestBusinessQuery, useGetRequestFormQuery } from "@/services/request";
import React, { useState } from "react";
import { useTableActions } from "./tableActions";

const ServiceTableSection = ({
  dateFrom,
  dateTo,
  basePath,
}: {
  dateFrom?: Date;
  dateTo?: Date;
  basePath: string;
}) => {
  const [openAssign, setOpenAssign] = useState(false);
  const [openUnAssign, setOpenUnAssign] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [partnerId, setPartnerId] = useState("");
  const [activeStatus, setActiveStatus] = useState("");
  const [preview, setPreview] = useState("");

  const requestQAFormsRes = useGetRequestFormQuery(preview);
  const requestQAForms = requestQAFormsRes.data?.data?.data || [];

  const requestBusinessRes = useGetRequestBusinessQuery({ requestId: preview });
  const requestBusiness = requestBusinessRes.data?.data?.data?.[0];

  const { deleteQueryStrings } = useGlobalFunctions();

  const itemsPerPage = 10;

  const {
    tableHeaders,
    tableBody,
    totalRequests,
    handleSearchChange,
    handleSearchSubmit,
    unAssignRequestMutation,
    requestsLoading,
    handleSearch,
    requestsErrorMsg,
    goToDetailsPage,
  } = useTableActions({
    setOpenAssign,
    setSelectedRequests,
    setOpenInfo,
    setOpenUnAssign,
    itemsPerPage,
    setPartnerId,
    activeStatus,
    dateFrom,
    dateTo,
    setPreview,
    basePath,
  });

  return (
    <>
      <div
        className={cn("flex gap-1", {
          "max-w-[100vw]": preview,
        })}
      >
        <GeneralTable
          title={"Requests"}
          tableHeaders={tableHeaders}
          tableBody={tableBody}
          tableNav={serviceTableNav}
          itemsLength={totalRequests || 0}
          itemsPerPage={itemsPerPage}
          onRowSelect={(selected) => setSelectedRequests(selected)}
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
          dataLoading={requestsLoading}
          errorMsg={requestsErrorMsg}
          preview={preview}
          handleFilter={(value) => {
            setActiveStatus(value || "");
            handleSearch(value);
            deleteQueryStrings(["page"]);
          }}
        />
        {preview && (
          <PreviewDetails
            selectedRequestId={preview}
            setPreview={setPreview}
            QAForms={requestQAForms}
            business={requestBusiness}
            isLoading={requestQAFormsRes.isLoading}
            onExpand={() => goToDetailsPage(preview)}
          />
        )}
      </div>
      <PartnerAssignDialog
        setOpen={setOpenAssign}
        open={openAssign}
        selectedRequests={selectedRequests}
        onSuccess={() => setSelectedRequests([])}
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

export default ServiceTableSection;

const serviceTableNav = [
  "Unpaid Drafts",
  "Paid Drafts",
  "Submitted",
  "Assigned",
  "Rejected",
  "In Progress",
  "Completed",
];
