import PartnerChart from "@/components/dashboard/analytics/partnerChart";
import RevenueChart from "@/components/dashboard/analytics/revenueChart";
import { subDays, subMonths } from "date-fns";
import React from "react";
import ServiceChart from "../analytics/serviceChart";
import { IReq } from "../overview";

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
}) => {
  const compareFrom = subDays(dateFrom, daysDiff);
  const bottomText = daysDiff > 1 ? `vs previous ${daysDiff} months` : "";

  if (partner) return <PartnerChart />;
  if (service)
    return (
      <ServiceChart
        title="Drafts"
        current={requestsByStatus.draft}
        compare={requestsVsByStatus.draft}
        bottomText={bottomText}
        currentTo={dateTo}
        currentFrom={dateFrom}
        compareFrom={compareFrom}
        compareLabel={compareLabel}
        showCompare={showCompare}
      />
    );
  return (
    <RevenueChart
      title="Drafts"
      current={requestsByStatus.draft}
      compare={requestsVsByStatus.draft}
      bottomText={bottomText}
      currentTo={dateTo}
      currentFrom={dateFrom}
      compareFrom={compareFrom}
      compareLabel={compareLabel}
      showCompare={showCompare}
    />
  );
};

export default DetailedAnalytics;
