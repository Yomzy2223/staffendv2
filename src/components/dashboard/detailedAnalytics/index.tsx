import { IReq } from "@/app/(dashboard)/(mainpages)/actions";
import { TStatus } from "@/app/(dashboard)/(mainpages)/page";
import PartnerChart from "@/components/dashboard/analytics/partnerChart";
import RevenueChart from "@/components/dashboard/analytics/revenueChart";
import { subDays, subMonths } from "date-fns";
import React from "react";

const DetailedAnalytics = ({
  dateFrom,
  dateTo,
  daysDiff,
  requestsByStatus,
  requestsVsByStatus,
  partner,
  service,
  showCompare,
  compareLabel,
  activeService,
  selectedOverview,
}: {
  dateFrom: Date;
  dateTo: Date;
  daysDiff: number;
  requestsByStatus: IReq;
  requestsVsByStatus: IReq;
  partner?: boolean;
  service?: boolean;
  showCompare: boolean;
  compareLabel: string;
  activeService?: string;
  selectedOverview: TStatus;
}) => {
  const compareFrom = subDays(dateFrom, daysDiff);
  const bottomText = daysDiff > 1 ? `vs previous ${daysDiff} months` : "";

  let status = selectedOverview as string;
  switch (selectedOverview) {
    case "unPaidDrafts":
      status = "unpaid drafts";
      break;
    case "paidDrafts":
      status = "paid drafts";
      break;
    case "inProgress":
      status = "in progress";
  }

  if (partner) return <PartnerChart />;

  return (
    <RevenueChart
      status={status}
      selectedOverview={selectedOverview}
      bottomText={bottomText}
      currentTo={dateTo}
      currentFrom={dateFrom}
      compareFrom={compareFrom}
      compareLabel={compareLabel}
      showCompare={showCompare}
      activeService={activeService}
      current={
        selectedOverview
          ? requestsByStatus[selectedOverview] // Pass status filtered request data
          : requestsByStatus.allPaid // Pass service revenue data
      }
      compare={
        selectedOverview
          ? requestsVsByStatus[selectedOverview] // Pass status filtered request compare data
          : requestsVsByStatus.allPaid // Pass service revenue compare data
      }
    />
  );
};

export default DetailedAnalytics;
