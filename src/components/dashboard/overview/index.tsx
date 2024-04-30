import React, { Dispatch, SetStateAction } from "react";
import DraggableScroll from "@/components/wrappers/draggableScroll";
import AnalyticsCard2 from "@/components/dashboard/analytics/analyticsCard2";
import OverviewChart from "@/components/dashboard/analytics/overviewChart";
import { subDays } from "date-fns";
import { IUser } from "@/hooks/api/types";
import { IReq } from "@/app/(dashboard)/(mainpages)/actions";

const OverviewSection = ({
  dateFrom,
  dateTo,
  daysDiff,
  users,
  requestsByStatus,
  requestsVsByStatus,
  selectedOverview,
  setSelectedOverview,
  formatStr,
  showCompare,
  hideUserCard,
}: IProps) => {
  const compareFrom = subDays(dateFrom, daysDiff);
  const bottomText = daysDiff > 1 ? `vs previous ${daysDiff} months` : "";

  const handleSelect = (status: TStatus) => {
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
        {!hideUserCard && (
          <AnalyticsCard2
            title="User signups"
            total={users?.length || 0}
            className="snap-start"
          />
        )}
        <OverviewChart
          title="Unpaid Drafts"
          current={requestsByStatus.unPaidDrafts}
          compare={requestsVsByStatus.unPaidDrafts}
          className="snap-start"
          bottomText={bottomText}
          currentTo={dateTo}
          currentFrom={dateFrom}
          compareFrom={compareFrom}
          selected={selectedOverview === "unPaidDrafts"}
          onClick={(e) => handleSelect("unPaidDrafts")}
          formatStr={formatStr}
          showCompare={showCompare}
        />
        <OverviewChart
          title="Paid Drafts"
          current={requestsByStatus.paidDrafts}
          compare={requestsVsByStatus.paidDrafts}
          className="snap-start"
          bottomText={bottomText}
          currentTo={dateTo}
          currentFrom={dateFrom}
          compareFrom={compareFrom}
          selected={selectedOverview === "paidDrafts"}
          onClick={(e) => handleSelect("paidDrafts")}
          formatStr={formatStr}
          showCompare={showCompare}
        />
        <OverviewChart
          title="Submitted"
          current={requestsByStatus.submitted}
          compare={requestsVsByStatus.submitted}
          className="snap-start"
          bottomText={bottomText}
          currentTo={dateTo}
          currentFrom={dateFrom}
          compareFrom={compareFrom}
          selected={selectedOverview === "submitted"}
          onClick={(e) => handleSelect("submitted")}
          formatStr={formatStr}
          showCompare={showCompare}
        />
        <OverviewChart
          title="In Progress"
          current={requestsByStatus.inProgress}
          compare={requestsVsByStatus.inProgress}
          className="snap-start"
          bottomText={bottomText}
          currentTo={dateTo}
          currentFrom={dateFrom}
          compareFrom={compareFrom}
          selected={selectedOverview === "inProgress"}
          onClick={(e) => handleSelect("inProgress")}
          formatStr={formatStr}
          showCompare={showCompare}
        />
        <OverviewChart
          title="Completed"
          current={requestsByStatus.completed}
          compare={requestsVsByStatus.completed}
          className="snap-start"
          bottomText={bottomText}
          currentTo={dateTo}
          currentFrom={dateFrom}
          compareFrom={compareFrom}
          selected={selectedOverview === "completed"}
          onClick={(e) => handleSelect("completed")}
          formatStr={formatStr}
          showCompare={showCompare}
        />
      </DraggableScroll>
    </div>
  );
};

export default OverviewSection;

interface IProps {
  dateFrom: Date;
  dateTo: Date;
  daysDiff: number;
  users: IUser[];
  requestsByStatus: IReq;
  requestsVsByStatus: IReq;
  selectedOverview?: TabItemStatus;
  setSelectedOverview?: Dispatch<SetStateAction<TStatus | undefined>>;
  formatStr: string;
  showCompare: boolean;
  hideUserCard: boolean;
}
