import { PaymentAnalyticsImg, ServiceAnalyticsImg } from "@/assets/svg";
import { Navigation } from "@/components/navigation";
import QueryNav from "@/components/navigation/queryNav";
import CardWrapper from "@/components/wrappers/cardWrapper";
import Image from "next/image";
import React from "react";
import {
  paymentQueryNav,
  serviceQueryNav,
  serviceQueryNav2,
} from "./constants";

const AnalyticsSection = () => {
  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <CardWrapper big className="flex flex-col gap-8 max-w-[634px]">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start lg:gap-6">
          <div>
            <p className="sb-text-24 font-semibold mb-2">
              Service registrations analytics
            </p>
            <p className="hidden text-base text-foreground-5 font-normal lg:flex">
              Number of registrations
            </p>
          </div>
          <QueryNav queryNav={serviceQueryNav} />
        </div>
        <QueryNav queryNav={serviceQueryNav2} variant={2} />
        <Image src={ServiceAnalyticsImg} alt="service analytics" />
      </CardWrapper>
      <CardWrapper big className="max-w-[634px]">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start lg:gap-6">
          <div>
            <p className="sb-text-24 font-semibold mb-2">Payment analytics</p>
            <p className="hidden text-base text-foreground-5 font-normal lg:flex">
              Total revenue for Sidebrief
            </p>
          </div>
          <QueryNav queryNav={paymentQueryNav} defaultActive={1} />
        </div>
        <Image src={PaymentAnalyticsImg} alt="payment analytics" />
      </CardWrapper>
    </div>
  );
};

export default AnalyticsSection;
