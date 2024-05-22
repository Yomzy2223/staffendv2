"use client";

import PersonsCard from "@/components/cards/personsCard";
import DoChecks from "@/components/DoChecks";
import TextWithDetails from "@/components/texts/textWithDetails";
import { cn } from "@/lib/utils";
import { TPartnerFormQA } from "@/services/partner/types";
import { TBusinessInfoGet, TRequestForm } from "@/services/request/types";
import { TUser } from "@/services/user/types";
import { BriefcaseIcon } from "lucide-react";
import React from "react";
import RequestDetailsSkt from "../skeleton/detailsSkt";
import RequestDetailsWrapper from "./detailsWrapper";

const TableDetails = ({
  previewMode,
  QAForms,
  business,
  partner,
  isLoading,
  errorMsg,
}: {
  previewMode?: boolean;
  QAForms: (TPartnerFormQA | TRequestForm)[];
  business?: TBusinessInfoGet;
  partner?: TUser;
  isLoading?: boolean;
  errorMsg?: string;
}) => {
  const nonPersonForms = QAForms?.filter((el) => el.type !== "person");
  const personForms = QAForms?.filter((el) => el.type === "person");
  const titles = [...new Set(personForms?.map((el) => el.title))] || [];
  const personFormByTitle =
    titles.map(
      (title) => personForms?.filter((form) => form.title === title) || []
    ) || [];

  const removeEmtpyStrings = (array: string[]) =>
    array.filter((el) => el.trim()?.length > 0);

  return (
    <DoChecks
      items={QAForms}
      isLoading={isLoading}
      Skeleton={<RequestDetailsSkt previewMode={previewMode} />}
      emptyText="No form submitted yet"
      className="flex flex-col gap-8 bg-background"
      errorText={errorMsg}
    >
      {business?.companyEmail && (
        <RequestDetailsWrapper
          title="Business Information"
          icon={<BriefcaseIcon />}
          raiseIssueAction={() => {}}
          className="flex flex-col gap-6"
          previewMode={previewMode}
        >
          {/* <TextWithDetails
            title="Operational Country"
            text={business?.companyName}
          />
          <TextWithDetails title="Product Type" text={business?.rcNumber} /> */}
        </RequestDetailsWrapper>
      )}

      {partner && (
        <RequestDetailsWrapper
          title="Partner Information"
          icon={<BriefcaseIcon />}
          raiseIssueAction={() => {}}
          className="flex flex-col gap-6"
          previewMode={previewMode}
        >
          <TextWithDetails title="Full name" text={partner?.fullName} />
          <TextWithDetails title="Email" text={partner?.email} />
          <TextWithDetails title="Country" text={partner?.country} />
          <TextWithDetails title="Phone" text={partner?.phone} />
          <TextWithDetails title="Signed Up At" text={partner?.createdAt} />
        </RequestDetailsWrapper>
      )}

      {nonPersonForms?.map((form) => (
        <RequestDetailsWrapper
          key={form.id}
          title={form.title}
          icon={<BriefcaseIcon />}
          raiseIssueAction={() => {}}
          className="flex flex-col gap-6"
          previewMode={previewMode}
        >
          {[...form.subForm]
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
            previewMode={previewMode}
            className={cn("flex flex-col gap-6 p-0 w-[600px] max-w-max", {
              "overflow-visible": previewMode,
            })}
          >
            <PersonsCard
              title={titles[i]}
              info={formGroup.map((form) =>
                [...form.subForm]
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
          previewMode={previewMode}
        >
          <DocSection
            businessId={requestBusiness?.id || ""}
            requestId={requestId}
          />
        </RequestDetailsWrapper> */}
    </DoChecks>
  );
};

export default TableDetails;
