"use client";

import { PaymentAnalyticsImg, ServiceAnalyticsImg } from "@/assets/svg";
import AnalyticsCard1 from "@/components/cards/analytics/analyticsCard1";
import AnalyticsCard2 from "@/components/cards/analytics/analyticsCard2";
import AnalyticsCard3 from "@/components/cards/analytics/analyticsCard3";
import AnalyticsHeader from "@/components/header/analyticsHeader";
import QueryNav from "@/components/navigation/queryNav";
import GeneralTable from "@/components/tables/generalTable";
import CardWrapper from "@/components/wrappers/cardWrapper";
import Image from "next/image";
import React, { useState } from "react";
import { paymentQueryNav, serviceQueryNav2 } from "./constants";
import { motion } from "framer-motion";
import { useTableInfo } from "./actions";
import { Button, Radio, Select } from "flowbite-react";
import { allMonths, years } from "./constants";
import DialogWrapper from "@/components/wrappers/dialogWrapper";
import { IUser } from "@/hooks/api/types";

const Home = () => {
  const [open, setOpen] = useState(false);

  const {
    tableHeaders,
    tableBody,
    serviceTableNav,
    partners,
    selectedRequests,
  } = useTableInfo({
    setOpen,
  });

  const resetDialog = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-5 w-full pt-6 pb-4 sm:pb-6">
        <p className="sb-text-16 font-semibold">MONTHLY OVERVIEW</p>
        <div className="flex">
          <Select className="[&_select]:rounded-r-none [&_select]:border-r-0 [&_select]:text-sm ">
            {allMonths.map((el) => (
              <option key={el}>{el}</option>
            ))}
          </Select>
          <Select className="[&_select]:rounded-l-none [&_select]:text-sm">
            {years.map((el) => (
              <option key={el}>{el}</option>
            ))}
          </Select>
        </div>
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
            total={4500}
            current={2500}
            previous={4700}
            className="snap-start"
          />
          <AnalyticsCard3
            title="Completed registrations"
            total={5200}
            current={2500}
            previous={1700}
            className="snap-start"
          />
          <AnalyticsCard3
            title="Pending registrations"
            total={32}
            current={1500}
            previous={1700}
            className="snap-start"
          />
          <AnalyticsCard3
            title="Registration in draft"
            total={300}
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
            tableNav={serviceTableNav}
          />
        </CardWrapper>
      </div>

      <DialogWrapper
        open={open}
        setOpen={(open) => {
          open ? setOpen(open) : resetDialog();
        }}
        title={`Assign selected request(s) to a partner (${selectedRequests.length})`}
      >
        <p className="font-semibold mb-8">
          This partner will be notified to begin the request(s) process
          immediately
        </p>
        <div className="flex flex-col gap-5">
          {partners?.map((el: IUser) => (
            <div key={el.id} className="flex items-center gap-3">
              <Radio id={el.id} name="partners" />
              <label htmlFor={el.id}>
                <p className="sb-text-16 font-medium">{el.fullName}</p>
                <p className="text-xs text-foreground-5 font-normal">
                  {el.email}
                </p>
              </label>
            </div>
          ))}
        </div>
        <div className="flex justify-between gap-4 sticky bottom-0 bg-white pt-5">
          <Button
            size="fit"
            color="ghost"
            className="text-destructive-foreground"
          >
            Cancel
          </Button>
          <Button color="primary">Assign</Button>
        </div>
      </DialogWrapper>
    </div>
  );
};

export default Home;
