"use client";

import PersonsCard from "@/components/cards/personsCard";
import DoChecks from "@/components/DoChecks";
import TextWithDetails from "@/components/texts/textWithDetails";
import { cn } from "@/lib/utils";
import {
  useGetRequestBusinessQuery,
  useGetRequestFormQuery,
} from "@/services/request";
import { BriefcaseIcon } from "lucide-react";
import React from "react";
import RequestDetailsSkt from "../skeleton/requestDetailsSkt";
import RequestDetailsWrapper from "./requestDetailsWrapper";

const RequestDetails = ({
  requestId,
  previewMode,
}: {
  requestId: string;
  previewMode?: boolean;
}) => {
  const requestQAFormsRes = useGetRequestFormQuery(requestId);
  const requestQAForms = requestQAFormsRes.data?.data?.data || [];

  const requestBusinessRes = useGetRequestBusinessQuery({ requestId });
  const requestBusiness = requestBusinessRes.data?.data?.data?.[0];
  console.log(requestBusiness);

  const nonPersonForms = requestQAForms?.filter((el) => el.type !== "person");
  const personForms = requestQAForms?.filter((el) => el.type === "person");
  const titles = [...new Set(personForms?.map((el) => el.title))] || [];
  const personFormByTitle =
    titles.map(
      (title) => personForms?.filter((form) => form.title === title) || []
    ) || [];

  const removeEmtpyStrings = (array: string[]) =>
    array.filter((el) => el.trim()?.length > 0);

  return (
    <DoChecks
      items={requestQAForms}
      isLoading={requestQAFormsRes.isLoading}
      Skeleton={<RequestDetailsSkt previewMode={previewMode} />}
      emptyText={`User hasn't submitted any form yet`}
      className="flex flex-col gap-8 bg-background"
    >
      {requestBusiness?.companyEmail && (
        <RequestDetailsWrapper
          title="Business Information"
          icon={<BriefcaseIcon />}
          raiseIssueAction={() => {}}
          className="flex flex-col gap-6"
        >
          {/* <TextWithDetails title="Operational Country" text={requestDetails?.product.country} />
          <TextWithDetails title="Product Type" text={requestDetails?.currentState} />{" "} */}
        </RequestDetailsWrapper>
      )}

      {nonPersonForms?.map((form) => (
        <RequestDetailsWrapper
          key={form.id}
          title={form.title}
          icon={<BriefcaseIcon />}
          raiseIssueAction={() => {}}
          className="flex flex-col gap-6"
          wrapperClassName={cn({
            "gap-0": previewMode,
          })}
        >
          {form.subForm
            ?.filter((field) => removeEmtpyStrings(field.answer)?.length > 0)
            ?.map((field) => (
              <TextWithDetails
                key={field.id}
                title={field.question}
                list={field.answer}
              />
            ))}
        </RequestDetailsWrapper>
      ))}

      {personFormByTitle.map((formGroup, i) => {
        return (
          <RequestDetailsWrapper
            key={i}
            title={titles[i]}
            icon={<BriefcaseIcon />}
            raiseIssueAction={() => {}}
            className={cn("flex flex-col gap-6 p-0 w-[600px] max-w-max", {
              "overflow-visible": previewMode,
            })}
            wrapperClassName={cn({
              "gap-0": previewMode,
            })}
          >
            <PersonsCard
              title={titles[i]}
              info={formGroup.map((form) =>
                form.subForm
                  ?.filter(
                    (field) =>
                      removeEmtpyStrings(field.answer)?.length > 0 ||
                      field.fileLink
                  )
                  .map((field) => ({
                    field: field.question,
                    value: field.answer,
                    type: field.type,
                    fileName: field.fileName,
                    fileLink: field.fileLink,
                    fileType: field.fileType,
                    fileSize: field.fileSize,
                  }))
              )}
              previewMode={previewMode}
            />
          </RequestDetailsWrapper>
        );
      })}
      {/* <RequestDetailsWrapper
          title="Upload Documents"
          icon={<BriefcaseIcon />}
          raiseIssueAction={() => {}}
          className="flex flex-col gap-6"
        >
          <DocSection
            businessId={requestBusiness?.id || ""}
            requestId={requestId}
          />
        </RequestDetailsWrapper> */}
    </DoChecks>
  );
};

export default RequestDetails;
