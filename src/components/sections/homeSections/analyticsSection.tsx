import { PaymentAnalyticsImg, ServiceAnalyticsImg } from "@/assets/svg";
import AnalyticsHeader from "@/components/header/analyticsHeader";
import QueryNav from "@/components/navigation/queryNav";
import CardWrapper from "@/components/wrappers/cardWrapper";
import Image from "next/image";
import React from "react";
import { paymentQueryNav, serviceQueryNav2 } from "./constants";

const AnalyticsSection = () => {
  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <CardWrapper big className="flex flex-col gap-8 max-w-[634px]">
        <AnalyticsHeader
          title="Service registrations analytics"
          description="Number of registrations"
          queryNav={paymentQueryNav}
        />
        <QueryNav queryNav={serviceQueryNav2} variant={2} />
        <Image src={ServiceAnalyticsImg} alt="service analytics" />
      </CardWrapper>

      <CardWrapper big className="max-w-[634px]">
        <AnalyticsHeader
          title="Payment analytics"
          description="Total revenue for Sidebrief"
          queryNav={paymentQueryNav}
        />
        <Image src={PaymentAnalyticsImg} alt="payment analytics" />
      </CardWrapper>
    </div>
  );
};

export default AnalyticsSection;
