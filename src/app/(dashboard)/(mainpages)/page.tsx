"use client";

import { PaymentAnalyticsImg, ServiceAnalyticsImg } from "@/assets/svg";
import AnalyticsHeader from "@/components/header/analyticsHeader";
import QueryNav from "@/components/navigation/queryNav";
import GeneralTable from "@/components/tables/generalTable";
import CardWrapper from "@/components/wrappers/cardWrapper";
import Image from "next/image";
import React, { useState } from "react";
import { paymentQueryNav, serviceQueryNav2 } from "./constants";
import { useTableInfo } from "./actions";
import PartnerAssignDialog from "@/components/dialogs/partnerAssign";
import OverviewSection from "./overview";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);

  const { tableHeaders, tableBody, serviceTableNav } = useTableInfo({
    setOpen,
    setSelectedRequests,
  });

  return (
    <>
      <div className="flex flex-col gap-8">
        <OverviewSection />

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

        <CardWrapper>
          <GeneralTable
            tableHeaders={tableHeaders}
            tableBody={tableBody}
            tableNav={serviceTableNav}
          />
        </CardWrapper>
      </div>

      <PartnerAssignDialog
        setOpen={setOpen}
        open={open}
        selectedRequests={selectedRequests}
        setSelectedRequests={setSelectedRequests}
      />
    </>
  );
};

export default Home;
