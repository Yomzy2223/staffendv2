"use client";

import { PaymentAnalyticsImg2 } from "@/assets/svg";
import AnalyticsCard3 from "@/components/dashboard/analytics/analyticsCard3";
import ServiceSummaryCard from "@/components/cards/serviceSummaryCard";
import DoChecks from "@/components/DoChecks";
import ServiceForm from "@/components/form/serviceForm";
import AnalyticsHeader from "@/components/header/analyticsHeader";
import CardWrapper from "@/components/wrappers/cardWrapper";
import { IRequest, IServiceFull } from "@/hooks/api/types";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import useRequestApi from "@/hooks/useRequestApi";
import useServiceApi from "@/hooks/useServiceApi";
import { subMonths } from "date-fns";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { useRequestActions } from "../../actions";
import { useActions } from "./actions";
import TableSection from "./tableSection";

const Service = ({ params }: { params: { serviceId: string } }) => {
  const [open, setOpen] = useState(false);
  const { setQuery } = useGlobalFunctions();
  const { serviceId } = params;

  const { useGetServiceRequestQuery } = useRequestApi();
  const request = useGetServiceRequestQuery({ serviceId: serviceId });
  const requestsData: IRequest[] = request.data?.data?.data;

  const { useGetServiceQuery } = useServiceApi();
  const service = useGetServiceQuery(serviceId as string);
  const serviceData: IServiceFull = service?.data?.data?.data;
  if (!serviceData && !service.isLoading) redirect("/services");

  const {
    requestsByStatus,
    requestsVsByStatus,
    monthsDiff,
    currentFrom,
    currentTo,
  } = useRequestActions({ serviceId });

  const compareFrom = subMonths(currentFrom, monthsDiff);
  const bottomText = monthsDiff > 1 ? `vs previous ${monthsDiff} months` : "";

  const addNewService = () => {
    setOpen(true);
    setQuery("action", "edit");
  };

  return (
    <>
      <div className="flex flex-col gap-8 pt-4 pb-6 lg:flex-row ">
        <div className="flex flex-nowrap gap-8 overflow-auto px-1 py-2 lg:w-1/2 lg:grid lg:grid-cols-2">
          <ServiceSummaryCard
            totalProducts={requestsData?.length || 0}
            serviceData={serviceData}
            isLoading={service.isLoading}
          />
          <AnalyticsCard3
            title="Drafts"
            current={requestsByStatus.draft}
            previous={requestsVsByStatus.draft}
            className="snap-start"
            bottomText={bottomText}
            currentTo={currentTo}
            currentFrom={currentFrom}
            compareFrom={compareFrom}
          />
          <AnalyticsCard3
            title="Paid Drafts"
            current={requestsByStatus.paidDraft}
            previous={requestsVsByStatus.paidDraft}
            className="snap-start"
            bottomText={bottomText}
            currentTo={currentTo}
            currentFrom={currentFrom}
            compareFrom={compareFrom}
          />
          <AnalyticsCard3
            title="Submitted"
            current={requestsByStatus.submitted}
            previous={requestsVsByStatus.submitted}
            className="snap-start"
            bottomText={bottomText}
            currentTo={currentTo}
            currentFrom={currentFrom}
            compareFrom={compareFrom}
          />
          <AnalyticsCard3
            title="In Progress"
            current={requestsByStatus.inProgress}
            previous={requestsVsByStatus.inProgress}
            className="snap-start"
            bottomText={bottomText}
            currentTo={currentTo}
            currentFrom={currentFrom}
            compareFrom={compareFrom}
          />
          <AnalyticsCard3
            title="Completed"
            current={requestsByStatus.completed}
            previous={requestsVsByStatus.completed}
            className="snap-start"
            bottomText={bottomText}
            currentTo={currentTo}
            currentFrom={currentFrom}
            compareFrom={compareFrom}
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

      <TableSection serviceId={serviceId} />
      <ServiceForm setOpen={setOpen} open={open} />
    </>
  );
};

export default Service;

const paymentQueryNav = [
  {
    name: "payment-date-range",
    value: "weekly",
  },
  {
    name: "payment-date-range",
    value: "monthly",
  },
  {
    name: "payment-date-range",
    value: "yearly",
  },
];
