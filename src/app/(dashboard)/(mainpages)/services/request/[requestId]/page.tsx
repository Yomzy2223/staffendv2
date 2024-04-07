"use client";

import PersonsCard from "@/components/cards/personsCard";
import RequestDetailsSectionWrapper from "@/components/wrappers/requestDetailsSectionWrapper";
import TextWithDetails from "@/components/texts/textWithDetails";
import { BriefcaseIcon, PiggyBankIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { shareholders } from "./constants";

const Request = () => {
  return (
    <div className="flex flex-col gap-8">
      <RequestDetailsSectionWrapper
        title="Business Information"
        icon={<BriefcaseIcon />}
        raiseIssueAction={() => {}}
        className="flex flex-col gap-6"
      >
        <TextWithDetails title="Business name" list={["Sayo oil and gas"]} />
        <TextWithDetails
          title="Where do you want to launch your business?"
          text="Kenya"
        />{" "}
        <TextWithDetails title="Product type" text="Sole proprietorship" />
        <TextWithDetails
          title="Choose four objectives that aligns with your business"
          list={[
            "Agriculture activities",
            "Agriculture activities1",
            "Agriculture activities2",
            "Agriculture activities3",
          ]}
        />
      </RequestDetailsSectionWrapper>

      <RequestDetailsSectionWrapper
        title="Request Payment"
        icon={<PiggyBankIcon />}
        raiseIssueAction={() => {}}
        className="flex flex-col gap-6"
      >
        <TextWithDetails title="Plan" text="Pro" />
        <TextWithDetails title="Amount paid" text="15,000 (NGN)" />
        <TextWithDetails
          title="Payment status"
          text="Successful"
          textClassName="text-success-foreground bg-success rounded px-2.5"
        />
      </RequestDetailsSectionWrapper>

      <IndividualInfoSection
        title="Shareholders Information"
        cardTitle="Shareholder"
      />
      <IndividualInfoSection
        title="Directors Information"
        cardTitle="Director"
      />
    </div>
  );
};

export default Request;

//----------------------------------------------------------------
const IndividualInfoSection = ({
  title,
  cardTitle,
}: {
  title: string;
  cardTitle: string;
}) => {
  return (
    <RequestDetailsSectionWrapper
      title={title || "Individual Information"}
      icon={<BriefcaseIcon />}
      raiseIssueAction={() => {}}
      className="flex flex-col gap-6 border-none p-0"
    >
      <PersonsCard title={cardTitle} info={shareholders} />
    </RequestDetailsSectionWrapper>
  );
};
