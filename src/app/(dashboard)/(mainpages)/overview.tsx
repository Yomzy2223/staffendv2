import React from "react";
import DraggableScroll from "@/components/wrappers/draggableScroll";
import AnalyticsCard2 from "@/components/cards/analytics/analyticsCard2";
import AnalyticsCard3 from "@/components/cards/analytics/analyticsCard3";
import { useOverviewActions } from "./actions";
import ComboBox from "@/components/form/dynamicForm/comboBox";
import MultiCombo from "@/components/form/dynamicForm/multiCombo";
import { subMonths } from "date-fns";

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
    servicesNames,
    servicesResponse,
    requestsByStatus,
    requestsVsByStatus,
    allMonthsStart,
    allMonthsEnd,
    years,
    yearsEnd,
    monthsDiff,
    currentFrom,
    currentTo,
  } = useOverviewActions({});

  const previousFrom = subMonths(currentFrom, monthsDiff);
  const bottomText = monthsDiff > 1 ? `vs previous ${monthsDiff} months` : "";

  return (
    <div>
      <div className="flex flex-col gap-5 w-full pt-6 pb-4 sm:pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="sb-text-16 font-semibold">SERVICE OVERVIEW</p>
          <ComboBox
            name="service"
            options={servicesNames}
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
                new Date().getFullYear() === parseInt(selected || "") && // If current year is selected
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
          title="Drafts"
          current={requestsByStatus.draft}
          previous={requestsVsByStatus.draft}
          className="snap-start"
          bottomText={bottomText}
          currentTo={currentTo}
          currentFrom={currentFrom}
          previousFrom={previousFrom}
        />
        <AnalyticsCard3
          title="Paid Drafts"
          current={requestsByStatus.paidDraft}
          previous={requestsVsByStatus.paidDraft}
          className="snap-start"
          bottomText={bottomText}
          currentTo={currentTo}
          currentFrom={currentFrom}
          previousFrom={previousFrom}
        />
        <AnalyticsCard3
          title="Submitted"
          current={requestsByStatus.submitted}
          previous={requestsVsByStatus.submitted}
          className="snap-start"
          bottomText={bottomText}
          currentTo={currentTo}
          currentFrom={currentFrom}
          previousFrom={previousFrom}
        />
        <AnalyticsCard3
          title="In Progress"
          current={requestsByStatus.inProgress}
          previous={requestsVsByStatus.inProgress}
          className="snap-start"
          bottomText={bottomText}
          currentTo={currentTo}
          currentFrom={currentFrom}
          previousFrom={previousFrom}
        />
        <AnalyticsCard3
          title="Completed"
          current={requestsByStatus.completed}
          previous={requestsVsByStatus.completed}
          className="snap-start"
          bottomText={bottomText}
          currentTo={currentTo}
          currentFrom={currentFrom}
          previousFrom={previousFrom}
        />
      </DraggableScroll>
    </div>
  );
};

export default OverviewSection;
