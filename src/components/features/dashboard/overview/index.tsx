import React, { Dispatch, SetStateAction } from "react";
import DraggableScroll from "@/components/wrappers/draggableScroll";
import AnalyticsCard2 from "@/components/features/dashboard/analytics/analyticsCard2";
import OverviewChart from "@/components/features/dashboard/analytics/overviewChart";
import { IUser } from "@/hooks/api/types";
import { IReq } from "@/app/(dashboard)/(mainpages)/actions";

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
}: IProps) => {
  // const bottomText = daysDiff > 1 ? `vs previous ${daysDiff} months` : "";
  const bottomText = "";

  const handleSelect = (status: IOverviewStatus) => {
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
        <AnalyticsCard2
          title="User signups"
          total={users?.length || 0}
          className="snap-start"
        />
        <OverviewChart
          title="Unpaid Drafts"
          rangeData={requestsByStatus.unPaidDrafts}
          compareData={requestsVsByStatus.unPaidDrafts}
          className="snap-start"
          bottomText={bottomText}
          dateFrom={dateFrom}
          dateTo={dateTo}
          compareFrom={compareFrom}
          compareTo={compareTo}
          selected={selectedOverview === "unPaidDrafts"}
          onClick={(e) => handleSelect("unPaidDrafts")}
          formatStr={formatStr}
          showCompare={showCompare}
          reqsDateData={reqsDateData}
          compareDateData={compareDateData}
        />
        <OverviewChart
          title="Paid Drafts"
          rangeData={requestsByStatus.paidDrafts}
          compareData={requestsVsByStatus.paidDrafts}
          className="snap-start"
          bottomText={bottomText}
          dateFrom={dateFrom}
          dateTo={dateTo}
          compareFrom={compareFrom}
          compareTo={compareTo}
          selected={selectedOverview === "paidDrafts"}
          onClick={(e) => handleSelect("paidDrafts")}
          formatStr={formatStr}
          showCompare={showCompare}
          reqsDateData={reqsDateData}
          compareDateData={compareDateData}
        />
        <OverviewChart
          title="Submitted"
          rangeData={requestsByStatus.submitted}
          compareData={requestsVsByStatus.submitted}
          className="snap-start"
          bottomText={bottomText}
          dateFrom={dateFrom}
          dateTo={dateTo}
          compareFrom={compareFrom}
          compareTo={compareTo}
          selected={selectedOverview === "submitted"}
          onClick={(e) => handleSelect("submitted")}
          formatStr={formatStr}
          showCompare={showCompare}
          reqsDateData={reqsDateData}
          compareDateData={compareDateData}
        />
        <OverviewChart
          title="In Progress"
          rangeData={requestsByStatus.inProgress}
          compareData={requestsVsByStatus.inProgress}
          className="snap-start"
          bottomText={bottomText}
          dateFrom={dateFrom}
          dateTo={dateTo}
          compareFrom={compareFrom}
          compareTo={compareTo}
          selected={selectedOverview === "inProgress"}
          onClick={(e) => handleSelect("inProgress")}
          formatStr={formatStr}
          showCompare={showCompare}
          reqsDateData={reqsDateData}
          compareDateData={compareDateData}
        />
        <OverviewChart
          title="Completed"
          rangeData={requestsByStatus.completed}
          compareData={requestsVsByStatus.completed}
          className="snap-start"
          bottomText={bottomText}
          dateFrom={dateFrom}
          dateTo={dateTo}
          compareFrom={compareFrom}
          compareTo={compareTo}
          selected={selectedOverview === "completed"}
          onClick={(e) => handleSelect("completed")}
          formatStr={formatStr}
          showCompare={showCompare}
          reqsDateData={reqsDateData}
          compareDateData={compareDateData}
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
  selectedOverview?: IOverviewStatus;
  setSelectedOverview?: Dispatch<SetStateAction<IOverviewStatus | undefined>>;
  formatStr: string;
  showCompare: boolean;
  reqsDateData: { firstDate: Date; lastDate: Date; daysDiff: number };
  compareDateData: { firstDate: Date; lastDate: Date; daysDiff: number };
}

export type IOverviewStatus =
  | "unPaidDrafts"
  | "paidDrafts"
  | "submitted"
  | "inProgress"
  | "completed"
  | "allPaid";
