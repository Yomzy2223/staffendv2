import React from "react";
import DraggableScroll from "@/components/wrappers/draggableScroll";
import AnalyticsCard2 from "@/components/cards/analytics/analyticsCard2";
import AnalyticsCard3 from "@/components/cards/analytics/analyticsCard3";
import { useOverviewActions } from "./actions";
import ComboBox from "@/components/form/dynamicForm/comboBox";
import MultiCombo from "@/components/form/dynamicForm/multiCombo";
import { allMonths, allMonthsStart, yearsStart } from "./constants";

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
    selecteService,
    setSelecteService,
    users,
    services,
    allMonthsEnd,
    yearsEnd,
  } = useOverviewActions();

  return (
    <div>
      <div className="flex flex-col gap-5 w-full pt-6 pb-4 sm:pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="sb-text-16 font-semibold">MONTHLY OVERVIEW</p>
          <ComboBox
            name="service"
            options={["dklj", "sdkjf"]}
            fieldName="Service"
            handleSelect={(selected?: string) => console.log(selected)}
            defaultValue={selecteService}
            // disabled={disableAll}
            optionsLoading={false}
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
              select2Options={yearsStart}
              handleSelect1={(selected?: string) =>
                setMonthFrom(selected || "")
              }
              handleSelect2={(selected?: string) => setYearFrom(selected || "")}
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
          title="Submitted registrations"
          total={4500}
          current={2500}
          previous={4700}
          className="snap-start"
        />
        <AnalyticsCard3
          title="Completed registrations"
          total={5200}
          current={2500}
          previous={1700}
          className="snap-start"
        />
        <AnalyticsCard3
          title="Pending registrations"
          total={32}
          current={1500}
          previous={1700}
          className="snap-start"
        />
        <AnalyticsCard3
          title="Registration in draft"
          total={300}
          current={2500}
          previous={1000}
          className="snap-start"
        />
      </DraggableScroll>
    </div>
  );
};

export default OverviewSection;
