"use client";

import PersonsCard from "@/components/cards/personsCard";
import DoChecks from "@/components/DoChecks";
import { FileInput } from "@/components/file/fileInput";
import TextWithDetails from "@/components/texts/textWithDetails";
import { cn } from "@/lib/utils";
import { TPartnerFormQA } from "@/services/partner/types";
import { TBusinessInfoGet, TRequestForm } from "@/services/request/types";
import { TUser } from "@/services/users/types";
import { Breadcrumb } from "flowbite-react";
import { BriefcaseIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { ReactNode } from "react";
import RequestDetailsSkt from "../skeleton/detailsSkt";
import TableDetailsWrapper from "./detailsWrapper";

const TableDetails = ({
  previewMode,
  QAForms,
  business,
  partner,
  isLoading,
  errorMsg,
  prev,
  children,
}: {
  previewMode?: boolean;
  QAForms: (TPartnerFormQA | TRequestForm)[];
  business?: TBusinessInfoGet;
  partner?: TUser;
  isLoading?: boolean;
  errorMsg?: string;
  prev?: {
    path: string;
    text: string;
  };
  children?: ReactNode;
}) => {
  const searchParams = useSearchParams();

  const nonPersonForms = QAForms?.filter((el) => el.type !== "person");
  const personForms = QAForms?.filter((el) => el.type === "person");
  const titles = [...new Set(personForms?.map((el) => el.title))] || [];
  const personFormByTitle =
    titles.map((title) => personForms?.filter((form) => form.title === title) || []) || [];

  const removeEmtpyStrings = (array: string[]) => array.filter((el) => el.trim()?.length > 0);

  return (
    <DoChecks
      items={QAForms}
      isLoading={isLoading}
      Skeleton={<RequestDetailsSkt previewMode={previewMode} />}
      emptyText="No form submitted yet"
      className="flex flex-col gap-8 bg-background"
      errorText={errorMsg}
    >
      {prev && (
        <Breadcrumb aria-label="Request details">
          <Breadcrumb.Item href={prev.path + "?" + searchParams.toString()}>
            <span className="first-letter:uppercase">{prev.text}</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{business?.companyName || "Business"}</Breadcrumb.Item>
        </Breadcrumb>
      )}

      {business?.companyName && (
        <TableDetailsWrapper
          title="Business Information"
          icon={<BriefcaseIcon />}
          raiseIssueAction={() => {}}
          className="flex flex-col gap-6 md:grid md:grid-cols-2"
          previewMode={previewMode}
        >
          <TextWithDetails title="Company name" text={business?.companyName} />
          {business?.rcNumber && <TextWithDetails title="RC Number" text={business?.rcNumber} />}
          {business?.companyEmail && (
            <TextWithDetails title="Company email" text={business?.companyEmail} />
          )}
          {business?.companyType && (
            <TextWithDetails title="Company type" text={business?.companyType} />
          )}
          {business?.shareCapital && (
            <TextWithDetails title="Share capital" text={business?.shareCapital} />
          )}
          {business?.status && <TextWithDetails title="Business status" text={business?.status} />}
          {business?.affiliates && (
            <TextWithDetails title="Affliates" text={business?.affiliates} />
          )}
          <TextWithDetails title="Classification" text={business?.classification} />
          <TextWithDetails title="Head office address" text={business?.headOfficeAddress} />
          <TextWithDetails title="LGA" text={business?.lga} />
          <TextWithDetails title="City" text={business?.city} />
          <TextWithDetails title="State" text={business?.state} />
        </TableDetailsWrapper>
      )}

      {partner && (
        <TableDetailsWrapper
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
        </TableDetailsWrapper>
      )}

      {nonPersonForms?.map((form) => (
        <TableDetailsWrapper
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
              <TextWithDetails key={field.id} title={field.question} list={field.answer} />
            ))}
        </TableDetailsWrapper>
      ))}

      {personFormByTitle.map((formGroup, i) => {
        return (
          <TableDetailsWrapper
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
                    (field) => removeEmtpyStrings(field.answer)?.length > 0 || field.fileLink
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
          </TableDetailsWrapper>
        );
      })}

      {children}
    </DoChecks>
  );
};

export default TableDetails;
