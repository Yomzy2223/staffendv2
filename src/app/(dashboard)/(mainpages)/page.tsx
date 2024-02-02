"use client";

import { PaymentAnalyticsImg, ServiceAnalyticsImg } from "@/assets/svg";
import AnalyticsCard1 from "@/components/cards/analytics/analyticsCard1";
import AnalyticsCard2 from "@/components/cards/analytics/analyticsCard2";
import AnalyticsCard3 from "@/components/cards/analytics/analyticsCard3";
import AnalyticsHeader from "@/components/header/analyticsHeader";
import QueryNav from "@/components/navigation/queryNav";
import SelectMonthAndYear from "@/components/select/selectMonthAndYear";
import GeneralTable from "@/components/tables/generalTable";
import CardWrapper from "@/components/wrappers/cardWrapper";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import {
  paymentQueryNav,
  serviceQueryNav2,
  serviceTableNav,
  useTableInfo,
} from "./constants";
import { motion } from "framer-motion";

const Home = () => {
  const { tableHeaders, tableBody } = useTableInfo();
  const session = useSession();
  console.log(session);

  return (
    <div>
      <div className="flex items-center justify-between gap-5 w-full pt-6 pb-4 sm:pb-6">
        <p className="sb-text-16 font-semibold">MONTHLY OVERVIEW</p>
        <SelectMonthAndYear />
      </div>

      <div className="flex flex-col gap-8">
        <motion.div
          className="snap snap-mandatory snap-x flex gap-8 max-w-full h-40 overflow-hidden"
          whileHover={{ overflowX: "auto" }}
        >
          <AnalyticsCard1
            previous={50}
            current={51}
            title="Website visits"
            total="163.5K"
            className="snap-start"
          />
          <AnalyticsCard2
            title="User signups"
            total="345.6k"
            className="snap-start"
          />
          <AnalyticsCard3
            title="Submitted registrations"
            total="4500"
            current={2500}
            previous={4700}
            className="snap-start"
          />
          <AnalyticsCard3
            title="Completed registrations"
            total="5200"
            current={2500}
            previous={1700}
            className="snap-start"
          />
          <AnalyticsCard3
            title="Pending registrations"
            total="32"
            current={1500}
            previous={1700}
            className="snap-start"
          />
          <AnalyticsCard3
            title="Registration in draft"
            total="300"
            current={2500}
            previous={1000}
            className="snap-start"
          />
        </motion.div>

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
            serviceTableNav={serviceTableNav}
          />
        </CardWrapper>
      </div>
    </div>
  );
};

export default Home;
