import { PaymentAnalyticsImg2 } from "@/assets/svg";
import AnalyticsCard3 from "@/components/cards/analytics/analyticsCard3";
import ServiceSummaryCard from "@/components/cards/serviceSummaryCard";
import AnalyticsHeader from "@/components/header/analyticsHeader";
import CardWrapper from "@/components/wrappers/cardWrapper";
import Image from "next/image";
import React from "react";
import { paymentQueryNav } from "./constants";

const ServicesOverviewSection = () => {
  return (
    <div className="flex flex-col gap-8 pt-4 pb-6 lg:flex-row ">
      <div className="flex flex-nowrap gap-8 overflow-auto px-1 py-2 lg:w-1/2 lg:grid lg:grid-cols-2">
        <ServiceSummaryCard title="Business Registration" totalProducts={34} />
        <AnalyticsCard3
          title="Completed requests"
          total="0"
          current={244}
          previous={87}
        />
        <AnalyticsCard3
          title="Completed requests"
          total="0"
          current={24}
          previous={87}
        />
        <AnalyticsCard3
          title="Completed requests"
          total="0"
          current={244}
          previous={87}
        />
      </div>
      <CardWrapper className="flex flex-col gap-6 justify-between">
        <AnalyticsHeader
          title="Payment analytics"
          description="Total revenue for registrations"
          queryNav={paymentQueryNav}
        />
        <Image src={PaymentAnalyticsImg2} alt="payment analytics" />
      </CardWrapper>
    </div>
  );
};

export default ServicesOverviewSection;
