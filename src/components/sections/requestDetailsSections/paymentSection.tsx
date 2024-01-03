import TextWithDetails from "@/components/texts/textWithDetails";
import { BriefcaseIcon, PiggyBankIcon } from "lucide-react";
import React from "react";
import RequestDetailsSectionWrapper from "./sectionWrapper";

const RequestPaymentSection = () => {
  return (
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
  );
};

export default RequestPaymentSection;
