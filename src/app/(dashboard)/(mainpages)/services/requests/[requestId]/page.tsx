"use client";

import ConfirmAction from "@/components/confirmAction";
import PartnerAssignDialog from "@/components/dialogs/partnerAssign";
import TableDetails from "@/components/tables/details/details";
import {
  useGetRequestFormQuery,
  useGetRequestBusinessQuery,
  useUnAssignRequestMutation,
  useGetRequestQuery,
} from "@/services/request";
import { Button } from "flowbite-react";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const Page = ({ params }: { params: { requestId: string } }) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openAssign, setOpenAssign] = useState(false);
  const [openUnAssign, setOpenUnAssign] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);

  const { requestId } = params;

  const searchParams = useSearchParams();
  const basePath = searchParams.get("basePath") || "";

  const unAssignRequestMutation = useUnAssignRequestMutation();
  // const requestQARes = useGetRequestFormQuery(requestId);
  // const requestQAForms = requestQARes.data?.data?.data || [];

  const requestRes = useGetRequestQuery(requestId);
  const request = requestRes.data?.data?.data;
  const requestBusiness = request?.business;
  const requestQAForms = request?.requestQA || [];

  // const businessDetailsRes = useGetRequestBusinessQuery({
  //   requestId: requestId,
  // });
  // const businessDetails = businessDetailsRes.data?.data?.data?.[0];

  return (
    <div className="py-6">
      <TableDetails
        QAForms={requestQAForms}
        isLoading={requestRes.isLoading}
        business={requestBusiness}
        prev={{
          path: basePath !== "home" ? "/" + basePath : "/",
          text: basePath,
        }}
      />

      <div className="flex items-center justify-between gap-6">
        <Button size="fit" color="transparent" onClick={() => setOpenInfo(true)}>
          See Partner Info
        </Button>
        <div className="self-end space-x-2">
          {request?.status === "ASSIGNED" && (
            <>
              <span>Partner hasn't accepted this task. You can </span>
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
    </div>
  );
};

export default Page;
