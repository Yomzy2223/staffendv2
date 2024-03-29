"use client";

import { PaymentAnalyticsImg2 } from "@/assets/svg";
import AnalyticsCard3 from "@/components/cards/analytics/analyticsCard3";
import ServiceSummaryCard from "@/components/cards/serviceSummaryCard";
import DoChecks from "@/components/DoChecks";
import ServiceForm from "@/components/form/serviceForm";
import AnalyticsHeader from "@/components/header/analyticsHeader";
import CardWrapper from "@/components/wrappers/cardWrapper";
import { IRequest } from "@/hooks/api/types";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import useRequestApi from "@/hooks/useRequestApi";
import { isSameMonth, subMonths } from "date-fns";
import Image from "next/image";
import React, { useState } from "react";
import TableSection from "./tableSection";

// export async function generateStaticParams() {
//   const posts = [{ service: "launch" }, { service: "manage" }, { service: "tax" }];

//   return posts.map((post) => ({
//     slug: post,
//   }));
// }

const Service = ({ params }: { params: { serviceId: string } }) => {
  const [open, setOpen] = useState(false);
  const { setQuery } = useGlobalFunctions();
  const { serviceId } = params;

  const { useGetServiceRequestQuery } = useRequestApi();
  const { data } = useGetServiceRequestQuery(serviceId as string);

  const requestsData: IRequest[] = data?.data?.data;

  const pendingRequests = requestsData?.filter(
    (el: IRequest) => el.status === "PENDING"
  );

  const submittedRequests = requestsData?.filter(
    (el: IRequest) => el.status === "SUBMITTED"
  );
  const completedRequests = requestsData?.filter(
    (el: IRequest) => el.status === "COMPLETED"
  );

  const thisMonthReq = {
    pending: pendingRequests?.filter((el: IRequest) =>
      isSameMonth(el.createdAt, new Date())
    ),
    submitted: submittedRequests?.filter((el: IRequest) =>
      isSameMonth(el.submittedAt, new Date())
    ),
    completed: completedRequests?.filter((el: IRequest) =>
      isSameMonth(el.completedAt, new Date())
    ),
  };

  const lastMonthReq = {
    pending: pendingRequests?.filter((el: IRequest) =>
      isSameMonth(el.createdAt, subMonths(new Date(), 1))
    ),
    submitted: submittedRequests?.filter((el: IRequest) =>
      isSameMonth(el.submittedAt, subMonths(new Date(), 1))
    ),
    completed: completedRequests?.filter((el: IRequest) =>
      isSameMonth(el.completedAt, subMonths(new Date(), 1))
    ),
  };

  const addNewService = () => {
    setOpen(true);
    setQuery("action", "edit");
  };

  return (
    <>
      <div className="flex flex-col gap-8 pt-4 pb-6 lg:flex-row ">
        <div className="flex flex-nowrap gap-8 overflow-auto px-1 py-2 lg:w-1/2 lg:grid lg:grid-cols-2">
          <ServiceSummaryCard totalProducts={requestsData?.length || 0} />
          <AnalyticsCard3
            title="Completed requests"
            total={completedRequests?.length}
            current={thisMonthReq?.completed?.length}
            previous={lastMonthReq?.completed?.length}
          />
          <AnalyticsCard3
            title="Submitted requests"
            total={submittedRequests?.length}
            current={thisMonthReq?.submitted?.length}
            previous={lastMonthReq?.submitted?.length}
          />
          <AnalyticsCard3
            title="Pending requests"
            total={pendingRequests?.length}
            current={thisMonthReq?.pending?.length || 0}
            previous={lastMonthReq?.pending?.length || 0}
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

      <DoChecks
        items={requestsData}
        emptyText="You have not added any product"
        btnText="Add new product"
        btnAction={addNewService}
      >
        <TableSection />
      </DoChecks>
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
