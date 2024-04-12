"use client";

import { PaymentAnalyticsImg, ServiceAnalyticsImg } from "@/assets/svg";
import AnalyticsHeader from "@/components/header/analyticsHeader";
import QueryNav from "@/components/navigation/queryNav";
import GeneralTable from "@/components/tables/generalTable";
import CardWrapper from "@/components/wrappers/cardWrapper";
import Image from "next/image";
import React, { useState } from "react";
import { paymentQueryNav, serviceQueryNav2 } from "./constants";
import { useTableInfo } from "./tableActions";
import PartnerAssignDialog from "@/components/dialogs/partnerAssign";
import OverviewSection from "./overview";
import ConfirmAction from "@/components/confirmAction";

const Home = () => {
  const [openAssign, setOpenAssign] = useState(false);
  const [openUnAssign, setOpenUnAssign] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [partnerId, setPartnerId] = useState("");

  const itemsPerPage = 5;

  const {
    tableHeaders,
    tableBody,
    serviceTableNav,
    unAssignRequestMutation,
    totalRequests,
  } = useTableInfo({
    setOpenAssign,
    setOpenUnAssign,
    setOpenInfo,
    setSelectedRequests,
    setPartnerId,
    itemsPerPage,
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

        <GeneralTable
          tableHeaders={tableHeaders}
          tableBody={tableBody}
          tableNav={serviceTableNav}
          itemsLength={totalRequests}
          itemsPerPage={itemsPerPage}
          onSelect={(selected) => console.log(selected)}
        />
      </div>

      <PartnerAssignDialog
        setOpen={setOpenAssign}
        open={openAssign}
        selectedRequests={selectedRequests}
        setSelectedRequests={setSelectedRequests}
      />

      {openUnAssign && (
        <ConfirmAction
          open={openUnAssign}
          setOpen={setOpenUnAssign}
          confirmAction={() =>
            unAssignRequestMutation.mutate(
              {
                formInfo: { userId: partnerId, requestIds: selectedRequests },
              },
              {
                onSuccess: () => setOpenUnAssign(false),
              }
            )
          }
          title="Unassign Task"
          description="Are you sure you want to unasssign this task? Partner will be notified."
          isLoading={unAssignRequestMutation.isPending}
          dismissible
          isDelete
        />
      )}
    </>
  );
};

export default Home;
