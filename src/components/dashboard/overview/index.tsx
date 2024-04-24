import React, { Dispatch, SetStateAction } from "react";
import DraggableScroll from "@/components/wrappers/draggableScroll";
import AnalyticsCard2 from "@/components/dashboard/analytics/analyticsCard2";
import AnalyticsCard3 from "@/components/dashboard/analytics/analyticsCard3";
import { subDays, subMonths } from "date-fns";
import { IRequest, IUser } from "@/hooks/api/types";
import { TStatus } from "@/app/(dashboard)/(mainpages)/page";

const OverviewSection = ({
  dateFrom,
  dateTo,
  daysDiff,
  users,
  requestsByStatus,
  requestsVsByStatus,
  selectedOverview,
  setSelectedOverview,
}: IProps) => {
  const compareFrom = subDays(dateFrom, daysDiff);
  const bottomText = daysDiff > 1 ? `vs previous ${daysDiff} months` : "";

  const handleSelect = (status: TStatus) => {
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
        <AnalyticsCard3
          title="Unpaid Drafts"
          current={requestsByStatus.unPaidDrafts}
          previous={requestsVsByStatus.unPaidDrafts}
          className="snap-start"
          bottomText={bottomText}
          currentTo={dateTo}
          currentFrom={dateFrom}
          compareFrom={compareFrom}
          selected={selectedOverview === "unPaidDrafts"}
          onClick={(e) => handleSelect("unPaidDrafts")}
        />
        <AnalyticsCard3
          title="Paid Drafts"
          current={requestsByStatus.paidDrafts}
          previous={requestsVsByStatus.paidDrafts}
          className="snap-start"
          bottomText={bottomText}
          currentTo={dateTo}
          currentFrom={dateFrom}
          compareFrom={compareFrom}
          selected={selectedOverview === "paidDrafts"}
          onClick={(e) => handleSelect("paidDrafts")}
        />
        <AnalyticsCard3
          title="Submitted"
          current={requestsByStatus.submitted}
          previous={requestsVsByStatus.submitted}
          className="snap-start"
          bottomText={bottomText}
          currentTo={dateTo}
          currentFrom={dateFrom}
          compareFrom={compareFrom}
          selected={selectedOverview === "submitted"}
          onClick={(e) => handleSelect("submitted")}
        />
        <AnalyticsCard3
          title="In Progress"
          current={requestsByStatus.inProgress}
          previous={requestsVsByStatus.inProgress}
          className="snap-start"
          bottomText={bottomText}
          currentTo={dateTo}
          currentFrom={dateFrom}
          compareFrom={compareFrom}
          selected={selectedOverview === "inProgress"}
          onClick={(e) => handleSelect("inProgress")}
        />
        <AnalyticsCard3
          title="Completed"
          current={requestsByStatus.completed}
          previous={requestsVsByStatus.completed}
          className="snap-start"
          bottomText={bottomText}
          currentTo={dateTo}
          currentFrom={dateFrom}
          compareFrom={compareFrom}
          selected={selectedOverview === "completed"}
          onClick={(e) => handleSelect("completed")}
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
  selectedOverview: TStatus;
  setSelectedOverview: Dispatch<SetStateAction<TStatus | undefined>>;
}

export interface IReq {
  unPaidDrafts: IRequest[];
  paidDrafts: IRequest[];
  submitted: IRequest[];
  inProgress: IRequest[];
  completed: IRequest[];
}
