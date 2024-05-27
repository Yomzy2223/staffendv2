import CardWrapper from "@/components/wrappers/cardWrapper";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import { TOverviewStatus } from "../overview";

const Wrapper = ({
  activeService,
  rangeLabel,
  compareLabel,
  total,
  totalCompare,
  selectedOverview,
  showCompare,
  className,
  children,
  hideDescription,
}: {
  activeService?: string;
  rangeLabel: string;
  compareLabel: string;
  total: number;
  totalCompare: number;
  className?: string;
  selectedOverview?: TOverviewStatus;
  showCompare?: boolean;
  children: ReactNode;
  hideDescription?: boolean;
}) => {
  let status = selectedOverview && selectedOverview !== "all" ? selectedOverview : "";
  switch (selectedOverview) {
    case "all":
      status = "";
      break;
    case "inProgress":
      status = "in progress";
      break;
    case "paidDrafts":
      status = "paid draft";
      break;
    case "unPaidDrafts":
      status = "unpaid draft";
      break;
    default:
      status = selectedOverview || "";
  }

  const title = selectedOverview
    ? (status || "All") + " requests"
    : (activeService || "") + " revenue";

  const description =
    (activeService || "All requests") + " " + (selectedOverview ? status : "revenue") + " between ";

  return (
    <CardWrapper big className={cn("flex flex-col max-w-[634px] w-full", className)}>
      <div>
        <p className="sb-text-24 font-semibold mb-1 lowercase first-letter:uppercase">{title}</p>
        {!hideDescription && (
          <div>
            <p className="sb-text-14 text-foreground-5">
              {description + rangeLabel}: <span className="font-bold">{total}</span>
            </p>
            {showCompare && (
              <p className="sb-text-14 text-foreground-5">
                {description + compareLabel}: <span className="font-bold">{totalCompare}</span>
              </p>
            )}
          </div>
        )}
      </div>
      {children}
    </CardWrapper>
  );
};

export default Wrapper;
