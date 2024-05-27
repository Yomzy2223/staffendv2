"use client";

import ConfirmAction from "@/components/confirmAction";
import PartnerAssignDialog from "@/components/dialogs/partnerAssign";
import { FileInput } from "@/components/file/fileInput";
import TableDetails from "@/components/tables/details/details";
import TableDetailsWrapper from "@/components/tables/details/detailsWrapper";
import {
  useUnAssignRequestMutation,
  useGetRequestQuery,
  useCompleteRequestMutation,
} from "@/services/request";
import { useGetUserRequestDocQuery } from "@/services/users";
import { Button } from "flowbite-react";
import { BriefcaseIcon, CheckCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import DocSection from "./docSection";

const Page = ({ params }: { params: { requestId: string } }) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openAssign, setOpenAssign] = useState(false);
  const [openUnAssign, setOpenUnAssign] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openComplete, setOpenComplete] = useState(false);

  const { requestId } = params;

  const searchParams = useSearchParams();
  const basePath = searchParams.get("basePath") || "";

  const unAssignRequestMutation = useUnAssignRequestMutation();
  const completeRequestMutation = useCompleteRequestMutation();

  const requestRes = useGetRequestQuery(requestId);
  const request = requestRes.data?.data?.data;
  const requestBusiness = request?.business;
  const requestQAForms = request?.requestQA || [];

  const requestDocsRes = useGetUserRequestDocQuery({ requestId });
  const requestDocs = requestDocsRes.data?.data?.data || [];

  return (
    <div className="py-6 space-y-10">
      <TableDetails
        QAForms={requestQAForms}
        isLoading={requestRes.isLoading}
        business={requestBusiness}
        prev={{
          path: basePath !== "home" ? "/" + basePath : "/",
          text: basePath,
        }}
      >
        <TableDetailsWrapper
          title="Documents"
          icon={<BriefcaseIcon />}
          raiseIssueAction={() => {}}
          className="flex flex-col gap-6"
          previewMode={false}
        >
          <DocSection requestId={requestId} requestDocs={requestDocs} />
        </TableDetailsWrapper>
      </TableDetails>

      <div className="flex items-center justify-between gap-6">
        <Button outline color="transparent" onClick={() => setOpenInfo(true)}>
          See Partner Info
        </Button>
        <div className="self-end space-x-2">
          {request?.status === "ASSIGNED" && (
            <>
              <span>Partner hasn&#39;t accepted this task.</span>
              <Button
                size="fit"
                color="transparent"
                className="text-destructive-foreground"
                onClick={() => setOpenUnAssign(true)}
              >
                Unassign request
              </Button>
            </>
          )}
          {request?.status === "SUBMITTED" && (
            <Button color="primary" onClick={() => setOpenAssign(true)}>
              Assign to a Partner
            </Button>
          )}
          {request?.status === "REJECTED" && (
            <>
              <span>Partner has rejected this task</span>
              <Button color="primary" onClick={() => setOpenAssign(true)}>
                Reassign to another Partner
              </Button>
            </>
          )}
          {request?.status === "ACCEPTED" && requestDocs?.length > 0 && (
            <Button color="primary" onClick={() => setOpenComplete(true)}>
              Mark completed <CheckCheck color="white" size={14} />
            </Button>
          )}
        </div>
      </div>

      <PartnerAssignDialog
        setOpen={setOpenAssign}
        open={openAssign}
        selectedRequests={[requestId]}
      />

      {openUnAssign && (
        <ConfirmAction
          open={openUnAssign}
          setOpen={setOpenUnAssign}
          confirmAction={() =>
            unAssignRequestMutation.mutate(
              {
                formInfo: { userId: request?.partnerInCharge || "", requestIds: [requestId] },
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

      {openComplete && (
        <ConfirmAction
          open={openComplete}
          setOpen={setOpenComplete}
          confirmAction={() =>
            completeRequestMutation.mutate(requestId, {
              onSuccess: () => setOpenComplete(false),
            })
          }
          title="Mark Request Completed"
          description="Are you sure you want to mark this request completed? Both client and partner will be notified."
          isLoading={unAssignRequestMutation.isPending}
          dismissible
        />
      )}
    </div>
  );
};

export default Page;
