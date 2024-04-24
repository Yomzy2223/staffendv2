import { TStatus } from "@/app/(dashboard)/(mainpages)/page";
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

  const title = selectedOverview
    ? selectedOverview + " requests"
    : activeService + " revenue";

  if (partner) return <PartnerChart />;
  // if (service)
  //   return (
  //     <ServiceChart
  //       title="drafts"
  //       current={requestsByStatus[selectedOverview]}
  //       compare={requestsVsByStatus[selectedOverview]}
  //       bottomText={bottomText}
  //       currentTo={dateTo}
  //       currentFrom={dateFrom}
  //       compareFrom={compareFrom}
  //       compareLabel={compareLabel}
  //       showCompare={showCompare}
  //       activeService={activeService}
  //     />
  //   );
  return (
    <RevenueChart
      title={title}
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
          : requestsByStatus.unPaidDrafts // Pass service revenue data
      }
      compare={
        selectedOverview
          ? requestsVsByStatus[selectedOverview] // Pass status filtered request compare data
          : requestsVsByStatus.unPaidDrafts // Pass service revenue compare data
      }
    />
  );
};

export default DetailedAnalytics;
