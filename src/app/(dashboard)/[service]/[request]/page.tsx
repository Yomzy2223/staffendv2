"use client";

import PersonsCard from "@/components/cards/personsCard";
import RequestDetailsSectionWrapper from "@/components/wrappers/requestDetailsSectionWrapper";
import TextWithDetails from "@/components/texts/textWithDetails";
import { BriefcaseIcon, PiggyBankIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";

const Request = () => {
  const { request } = useParams();

  const fn = () => {};

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

const shareholders = [
  [
    { field: "Full name", value: "Sayo Oluwole" },
    { field: "Full names", value: "Sayo Oluwole" },
    { field: "Full namxe", value: "Sayo Oluwole" },
    { field: "Email addsress", value: "sayooluwold10@gmail.com" },
    { field: "Email addresxs", value: "sayooluwold10@gmail.com" },
    { field: "Email address", value: "sayooluwold10@gmail.com" },
    { field: "Phone numxber", value: "+2346454346633" },
    { field: "Phone nsumber", value: "+2346454346633" },
    { field: "Phone numbexr", value: "+2346454346633" },
  ],
  [
    { field: "Full namea", value: "Sayo Oluwole" },
    { field: "Full name", value: "Sayo Oluwole" },
    { field: "Full namse", value: "Sayo Oluwole" },
    { field: "Email address", value: "sayooluwold10@gmail.com" },
    { field: "Email addrsess", value: "sayooluwold10@gmail.com" },
    { field: "Email addresas", value: "sayooluwold10@gmail.com" },
    { field: "Phone nusmber", value: "+2346454346633" },
    { field: "Phone numbaer", value: "+2346454346633" },
    { field: "Phone numbaaer", value: "+2346454346633" },
  ],
  [
    { field: "Full namea", value: "Sayo Oluwole" },
    { field: "Full name", value: "Sayo Oluwole" },
    { field: "Full namse", value: "Sayo Oluwole" },
    { field: "Email address", value: "sayooluwold10@gmail.com" },
    { field: "Email addrsess", value: "sayooluwold10@gmail.com" },
    { field: "Email addresas", value: "sayooluwold10@gmail.com" },
    { field: "Phone nusmber", value: "+2346454346633" },
    { field: "Phone numbaer", value: "+2346454346633" },
    { field: "Phone numbaaer", value: "+2346454346633" },
  ],
  [
    { field: "Full namea", value: "Sayo Oluwole" },
    { field: "Full name", value: "Sayo Oluwole" },
    { field: "Full namse", value: "Sayo Oluwole" },
    { field: "Email address", value: "sayooluwold10@gmail.com" },
    { field: "Email addrsess", value: "sayooluwold10@gmail.com" },
    { field: "Email addresas", value: "sayooluwold10@gmail.com" },
    { field: "Phone nusmber", value: "+2346454346633" },
    { field: "Phone numbaer", value: "+2346454346633" },
    { field: "Phone numbaaer", value: "+2346454346633" },
  ],
  [
    { field: "Full namea", value: "Sayo Oluwole" },
    { field: "Full name", value: "Sayo Oluwole" },
    { field: "Full namse", value: "Sayo Oluwole" },
    { field: "Email address", value: "sayooluwold10@gmail.com" },
    { field: "Email addrsess", value: "sayooluwold10@gmail.com" },
    { field: "Email addresas", value: "sayooluwold10@gmail.com" },
    { field: "Phone nusmber", value: "+2346454346633" },
    { field: "Phone numbaer", value: "+2346454346633" },
    { field: "Phone numbaaer", value: "+2346454346633" },
  ],
];
