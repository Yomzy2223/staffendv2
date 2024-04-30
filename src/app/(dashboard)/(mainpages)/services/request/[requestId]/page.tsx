"use client";

import PersonsCard from "@/components/cards/personsCard";
import RequestDetailsSectionWrapper from "@/components/wrappers/requestDetailsSectionWrapper";
import TextWithDetails from "@/components/texts/textWithDetails";
import { BriefcaseIcon } from "lucide-react";
import React, { useState } from "react";
import { shareholders } from "./constants";
import { useActions } from "./actions";
import { Button } from "flowbite-react";
import DoChecks from "@/components/DoChecks";
import PartnerAssignDialog from "@/components/dialogs/partnerAssign";
import ConfirmAction from "@/components/confirmAction";

const Request = ({ params }: { params: { requestId: string } }) => {
  const [openAssign, setOpenAssign] = useState(false);
  const [openUnAssign, setOpenUnAssign] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);

  const { requestId } = params;

  const { request, requestResponse, unAssignRequestMutation } = useActions({
    requestId,
  });

  const requestForms = request?.requestQA;
  const businessInfo = request?.process;

  const partnerId = request?.partnerInCharge;

  // console.log(requestForms);
  const handeAssignUnassign = () => {
    if (partnerId) {
      setOpenUnAssign(true);
      setSelectedRequests([requestId]);
      return;
    }
    setSelectedRequests([requestId]);
    setOpenAssign(true);
  };

  const reStructureInfo = (subForm: IRequestSubForm[]) => {
    const person = subForm?.map((el) => ({
      field: el.question,
      value: el.answer[0],
      document: {
        fileLink: el.fileLink,
        fileName: el.fileName,
        fileSize: el.fileSize,
        fileType: el.fileType,
      },
    }));
    // console.log(person);
    return person;
  };

  return (
    <div className="flex flex-col gap-6">
      <RequestDetailsSectionWrapper
        title="Business Details"
        icon={<BriefcaseIcon />}
        raiseIssueAction={() => {}}
        className="flex flex-col gap-6"
      >
        <TextWithDetails
          title={businessInfo?.businessName}
          list={[businessInfo?.businessName]}
        />
      </RequestDetailsSectionWrapper>
      <RequestDetailsSectionWrapper
        title="Payment"
        icon={<BriefcaseIcon />}
        raiseIssueAction={() => {}}
        className="flex flex-col gap-6"
      >
        <TextWithDetails title={businessInfo?.businessName} list={[]} />
      </RequestDetailsSectionWrapper>
      <DoChecks
        items={requestForms}
        emptyText="User has not submitted any form"
        isLoading={requestResponse.isLoading}
        className="flex-1 flex flex-col justify-between gap-8"
      >
        {requestForms?.map((form: IRequesForm) => {
          if (form.type === "form")
            return (
              <RequestDetailsSectionWrapper
                key={form.id}
                title={form.title}
                icon={<BriefcaseIcon />}
                raiseIssueAction={() => {}}
                className="flex flex-col gap-6"
              >
                {form?.subForm?.map((el) => (
                  <TextWithDetails
                    key={el.id}
                    title={el.question}
                    list={el.answer}
                  />
                ))}
              </RequestDetailsSectionWrapper>
            );
        })}
        {requestForms?.map((form: IRequesForm) => {
          if (form.type === "person")
            return (
              <RequestDetailsSectionWrapper
                key={form.id}
                title={form.title}
                icon={<BriefcaseIcon />}
                raiseIssueAction={() => {}}
                className="flex flex-col gap-6 border-none p-0"
              >
                <PersonsCard title={form?.title} info={shareholders} />
              </RequestDetailsSectionWrapper>
            );
        })}

        <div className="flex gap-2 self-end">
          {partnerId && (
            <Button color="primary" outline className="self-end">
              See partner info
            </Button>
          )}
          <Button color="primary" onClick={handeAssignUnassign}>
            {partnerId ? "Unassign Task" : "Assign Task"}
          </Button>
        </div>
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
      </DoChecks>
    </div>
  );
};

export default Request;
