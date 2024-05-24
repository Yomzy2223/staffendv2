"use client";

import ConfirmAction from "@/components/confirmAction";
import PreviewDetails from "@/components/tables/details/previewDetails";
import GeneralTable from "@/components/tables/generalTable";
import { cn } from "@/lib/utils";
import { useGetPartnerFormQAQuery } from "@/services/partner";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useActions } from "./actions";

const Partners = () => {
  const [openActivate, setOpenActivate] = useState(false);
  const [openDeactivate, setOpenDeactivate] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<string[]>();
  const [preview, setPreview] = useState("");
  const [status, setStatus] = useState("");

  const router = useRouter();

  const partnerFormQARes = useGetPartnerFormQAQuery(preview);
  const partnerFormQA = partnerFormQARes.data?.data?.data || [];

  const {
    partnerTableNav,
    tableHeaders,
    tableBody,
    activatePartner,
    deactivatePartner,
    declinePartner,
    partnersLoading,
    partnersErrMsg,
    handleSearch,
    activePartner,
  } = useActions({
    setOpenActivate,
    setOpenDeactivate,
    setSelectedPartner,
    preview,
    setPreview,
    status,
  });

  return (
    <>
      <div
        className={cn("flex gap-1 pt-10", {
          "max-w-[100vw]": preview,
        })}
      >
        <GeneralTable
          title="Partners"
          tableHeaders={tableHeaders}
          tableBody={tableBody}
          tableNav={partnerTableNav}
          onRowSelect={(selected) => setSelectedPartner(selected)}
          onSearchChange={handleSearch}
          onSearchSubmit={handleSearch}
          dataLoading={partnersLoading}
          errorMsg={partnersErrMsg}
          preview={preview}
          handleFilter={(value) => setStatus(value || "")}
        />
        {preview && (
          <PreviewDetails
            selectedRequestId={preview}
            setPreview={setPreview}
            QAForms={partnerFormQA}
            partner={activePartner}
            isLoading={partnerFormQARes.isLoading}
            onExpand={() => router.push(`/partners/${preview}`)}
          />
        )}
      </div>
      {openActivate && (
        <ConfirmAction
          open={openActivate}
          setOpen={setOpenActivate}
          confirmAction={() =>
            activatePartner.mutate(selectedPartner?.[0] || "", {
              onSuccess: () => setOpenActivate(false),
            })
          }
          title="Activate Partner"
          description="Are you sure you want to activate this partner? Partner will be notified."
          isLoading={activatePartner.isPending}
          dismissible
          isDelete
        />
      )}
      {openDeactivate && (
        <ConfirmAction
          open={openDeactivate}
          setOpen={setOpenDeactivate}
          confirmAction={() =>
            deactivatePartner.mutate(selectedPartner?.[0] || "", {
              onSuccess: () => setOpenDeactivate(false),
            })
          }
          title="Deactivate Partner"
          description="Are you sure you want to deactivate this partner? Partner will be notified."
          isLoading={deactivatePartner.isPending}
          dismissible
          isDelete
        />
      )}
    </>
  );
};

export default Partners;
