import TextWithDetails from "@/components/texts/textWithDetails";
import { BriefcaseIcon } from "lucide-react";
import React from "react";
import RequestDetailsSectionWrapper from "./sectionWrapper";

const BusinessInfoSection = () => {
  return (
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
  );
};

export default BusinessInfoSection;
