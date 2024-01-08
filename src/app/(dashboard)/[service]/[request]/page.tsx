"use client";

import BusinessInfoSection from "@/components/sections/servicesSections/requestDetailsSections/businessInfoSection";
import IndividualInfoSection from "@/components/sections/servicesSections/requestDetailsSections/individualInfoSection";
import RequestPaymentSection from "@/components/sections/servicesSections/requestDetailsSections/paymentSection";
import { useParams } from "next/navigation";
import React from "react";

const Request = () => {
  const { request } = useParams();

  const fn = () => {};

  return (
    <div className="flex flex-col gap-8">
      <BusinessInfoSection />
      <RequestPaymentSection />
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
