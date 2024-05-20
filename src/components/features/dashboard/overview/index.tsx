import React, { Dispatch, SetStateAction } from "react";
import DraggableScroll from "@/components/wrappers/draggableScroll";
import OverviewChart from "@/components/features/dashboard/analytics/overviewChart";
import { IUser } from "@/hooks/api/types";
import { IReq } from "@/app/(dashboard)/(mainpages)/actions";
import DoChecks from "@/components/DoChecks";
import OverviewChartSkt from "../analytics/skeleton/overviewChartSkt";
import UserAnalytics from "@/components/features/dashboard/analytics/userAnalytics";

const OverviewSection = ({
  dateFrom,
  dateTo,
  compareFrom,
  compareTo,
  users,
  requestsByStatus,
  requestsVsByStatus,
  selectedOverview,
  setSelectedOverview,
  formatStr,
  showCompare,
  reqsDateData,
  compareDateData,
  requestsLoading,
  requestsVsLoading,
}: IProps) => {
  // const bottomText = daysDiff > 1 ? `vs previous ${daysDiff} months` : "";
  const bottomText = "";

  const handleSelect = (status: TOverviewStatus) => {
    if (!setSelectedOverview) return;
    if (status === selectedOverview) {
      setSelectedOverview(undefined);
      return;
    }
    setSelectedOverview(status);
  };

  return (
    <div>
      <DraggableScroll className="snap snap-mandatory snap-x flex gap-8 p-1 pb-2 scroll-smooth overflow-y-hidden">
        {/* <AnalyticsCard1
            previous={50}
            current={51}
            title="Website visits"
            total="163.5K"
            className="snap-start"
          /> */}
        <UserAnalytics
          title="User signups"
          total={users?.length || 0}
          className="snap-start"
        />

        <OverviewChart
          title="All"
          rangeData={requestsByStatus.all}
          compareData={requestsVsByStatus.all}
          className="snap-start"
          bottomText={bottomText}
          dateFrom={dateFrom}
          compareFrom={compareFrom}
          selected={selectedOverview === "all"}
          onClick={(e) => handleSelect("all")}
          formatStr={formatStr}
          showCompare={showCompare}
          reqsDateData={reqsDateData}
          compareDateData={compareDateData}
          isLoading={requestsLoading || requestsVsLoading}
        />
        <OverviewChart
          title="Unpaid Drafts"
          rangeData={requestsByStatus.unPaidDrafts}
          compareData={requestsVsByStatus.unPaidDrafts}
          className="snap-start"
          bottomText={bottomText}
          dateFrom={dateFrom}
          compareFrom={compareFrom}
          selected={selectedOverview === "unPaidDrafts"}
          onClick={(e) => handleSelect("unPaidDrafts")}
          formatStr={formatStr}
          showCompare={showCompare}
          reqsDateData={reqsDateData}
          compareDateData={compareDateData}
          isLoading={requestsLoading || requestsVsLoading}
        />
        <OverviewChart
          title="Paid Drafts"
          rangeData={requestsByStatus.paidDrafts}
          compareData={requestsVsByStatus.paidDrafts}
          className="snap-start"
          bottomText={bottomText}
          dateFrom={dateFrom}
          compareFrom={compareFrom}
          selected={selectedOverview === "paidDrafts"}
          onClick={(e) => handleSelect("paidDrafts")}
          formatStr={formatStr}
          showCompare={showCompare}
          reqsDateData={reqsDateData}
          compareDateData={compareDateData}
          isLoading={requestsLoading || requestsVsLoading}
        />
        <OverviewChart
          title="Submitted"
          rangeData={requestsByStatus.submitted}
          compareData={requestsVsByStatus.submitted}
          className="snap-start"
          bottomText={bottomText}
          dateFrom={dateFrom}
          compareFrom={compareFrom}
          selected={selectedOverview === "submitted"}
          onClick={(e) => handleSelect("submitted")}
          formatStr={formatStr}
          showCompare={showCompare}
          reqsDateData={reqsDateData}
          compareDateData={compareDateData}
          isLoading={requestsLoading || requestsVsLoading}
        />
        <OverviewChart
          title="In Progress"
          rangeData={requestsByStatus.inProgress}
          compareData={requestsVsByStatus.inProgress}
          className="snap-start"
          bottomText={bottomText}
          dateFrom={dateFrom}
          compareFrom={compareFrom}
          selected={selectedOverview === "inProgress"}
          onClick={(e) => handleSelect("inProgress")}
          formatStr={formatStr}
          showCompare={showCompare}
          reqsDateData={reqsDateData}
          compareDateData={compareDateData}
          isLoading={requestsLoading || requestsVsLoading}
        />
        <OverviewChart
          title="Completed"
          rangeData={requestsByStatus.completed}
          compareData={requestsVsByStatus.completed}
          className="snap-start"
          bottomText={bottomText}
          dateFrom={dateFrom}
          compareFrom={compareFrom}
          selected={selectedOverview === "completed"}
          onClick={(e) => handleSelect("completed")}
          formatStr={formatStr}
          showCompare={showCompare}
          reqsDateData={reqsDateData}
          compareDateData={compareDateData}
          isLoading={requestsLoading || requestsVsLoading}
        />
      </DraggableScroll>
    </div>
  );
};

export default OverviewSection;

interface IProps {
  dateFrom?: Date;
  dateTo?: Date;
  compareFrom?: Date;
  compareTo?: Date;
  users: IUser[];
  requestsByStatus: IReq;
  requestsVsByStatus: IReq;
  selectedOverview?: TOverviewStatus;
  setSelectedOverview?: Dispatch<SetStateAction<TOverviewStatus | undefined>>;
  formatStr: string;
  showCompare: boolean;
  reqsDateData: { firstDate: Date; lastDate: Date; daysDiff: number };
  compareDateData: { firstDate: Date; lastDate: Date; daysDiff: number };
  requestsLoading: boolean;
  requestsVsLoading: boolean;
}

export type TOverviewStatus =
  | "unPaidDrafts"
  | "paidDrafts"
  | "submitted"
  | "inProgress"
  | "completed"
  | "all";
