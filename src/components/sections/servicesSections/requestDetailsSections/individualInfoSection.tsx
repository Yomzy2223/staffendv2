import PersonsCard from "@/components/cards/personsCard";
import TextWithDetails from "@/components/texts/textWithDetails";
import { BriefcaseIcon } from "lucide-react";
import React from "react";
import RequestDetailsSectionWrapper from "./sectionWrapper";

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

export default IndividualInfoSection;

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
