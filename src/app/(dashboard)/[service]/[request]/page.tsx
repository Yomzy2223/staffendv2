"use client";

import BusinessInfoSection from "@/components/sections/requestDetailsSections/businessInfoSection";
import RequestPaymentSection from "@/components/sections/requestDetailsSections/paymentSection";
import { useParams } from "next/navigation";
import React from "react";

const Request = () => {
  const { request } = useParams();

  const fn = () => {};

  return (
    <div className="flex flex-col gap-8">
      <BusinessInfoSection />
      <RequestPaymentSection />
    </div>
  );
};

export default Request;
