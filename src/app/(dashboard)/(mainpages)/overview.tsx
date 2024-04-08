import React from "react";
import DraggableScroll from "@/components/wrappers/draggableScroll";
import AnalyticsCard2 from "@/components/cards/analytics/analyticsCard2";
import AnalyticsCard3 from "@/components/cards/analytics/analyticsCard3";
import { useOverviewActions } from "./actions";
import ComboBox from "@/components/form/dynamicForm/comboBox";
import MultiCombo from "@/components/form/dynamicForm/multiCombo";
import { allMonthsStart } from "./constants";
import { IRequest } from "@/hooks/api/types";
import { differenceInMonths, isSameYear } from "date-fns";

const OverviewSection = () => {
  const {
    monthFrom,
    setMonthFrom,
    yearFrom,
    setYearFrom,
    monthTo,
    setMonthTo,
    yearTo,
    setYearTo,
    selectedService,
    setSelectedService,
    users,
    services,
    servicesResponse,
    requestsByStatus,
    requestsVsByStatus,
    allMonthsStart,
    allMonthsEnd,
    years,
    yearsEnd,
    monthsDiff,
    dateFrom,
  } = useOverviewActions();

  // console.log(monthsDiff);
  return (
    <div>
      <div className="flex flex-col gap-5 w-full pt-6 pb-4 sm:pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="sb-text-16 font-semibold">SERVICE OVERVIEW</p>
          <ComboBox
            name="service"
            options={services}
            fieldName="Service"
            handleSelect={(selected?: string) =>
              setSelectedService(selected || "")
            }
            defaultValue={selectedService}
            optionsLoading={servicesResponse.isLoading}
            className="max-w-max"
          />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="flex items-center gap-1">
            <p className="sb-text-16 ">From:</p>
            <MultiCombo
              fieldName1="month"
              fieldName2="year"
              defaultValue1={monthFrom}
              defaultValue2={yearFrom}
              type1="select"
              type2="select"
              select1Options={allMonthsStart}
              select2Options={years}
              handleSelect1={(selected?: string) =>
                setMonthFrom(selected || "")
              }
              handleSelect2={(selected?: string) => {
                setYearFrom(selected || "");
                console.log(selected);
                new Date().getFullYear() === parseInt(selected || "") &&
                  setYearTo(selected || "");
              }}
            />
          </div>

          <div className="sb-text-16 flex items-center gap-1">
            <p className="sb-text-16 ">To:</p>
            <MultiCombo
              fieldName1="month"
              fieldName2="year"
              defaultValue1={monthTo}
              defaultValue2={yearTo}
              type1="select"
              type2="select"
              select1Options={allMonthsEnd}
              select2Options={yearsEnd}
              handleSelect1={(selected?: string) => setMonthTo(selected || "")}
              handleSelect2={(selected?: string) => setYearTo(selected || "")}
            />
          </div>
        </div>
      </div>
      <DraggableScroll className="snap snap-mandatory snap-x flex gap-8 p-1 pb-2 scroll-smooth">
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
          title="Draft"
          total={requestsByStatus.draft?.length}
          current={requestsByStatus.draft?.length}
          previous={requestsVsByStatus.draft?.length}
          className="snap-start"
          bottomText={monthsDiff > 1 ? `vs previous ${monthsDiff} months` : ""}
        />
        <AnalyticsCard3
          title="Paid Draft"
          total={requestsByStatus.paidDraft?.length}
          current={requestsByStatus.paidDraft?.length}
          previous={requestsVsByStatus.paidDraft?.length}
          className="snap-start"
          bottomText={monthsDiff > 1 ? `vs previous ${monthsDiff} months` : ""}
        />
        <AnalyticsCard3
          title="Submitted"
          total={requestsByStatus.submitted?.length}
          current={requestsByStatus.submitted?.length}
          previous={requestsVsByStatus.submitted?.length}
          className="snap-start"
          bottomText={monthsDiff > 1 ? `vs previous ${monthsDiff} months` : ""}
        />
        <AnalyticsCard3
          title="In Progress"
          total={requestsByStatus.inProgress?.length}
          current={requestsByStatus.inProgress?.length}
          previous={requestsVsByStatus.inProgress?.length}
          className="snap-start"
          bottomText={monthsDiff > 1 ? `vs previous ${monthsDiff} months` : ""}
        />
        <AnalyticsCard3
          title="Completed"
          total={requestsByStatus.completed?.length}
          current={requestsByStatus.completed?.length}
          previous={requestsVsByStatus.completed?.length}
          className="snap-start"
          bottomText={monthsDiff > 1 ? `vs previous ${monthsDiff} months` : ""}
        />
      </DraggableScroll>
    </div>
  );
};

export default OverviewSection;
