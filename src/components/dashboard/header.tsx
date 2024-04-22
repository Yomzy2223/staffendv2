import { format, isSameYear, subDays } from "date-fns";
import { Datepicker, ToggleSwitch } from "flowbite-react";
import React, { Dispatch, SetStateAction } from "react";
import ComboBox from "../form/dynamicForm/comboBox";

const DashboardHeader = ({
  dateFrom,
  dateTo,
  setDateFrom,
  setDateTo,
  daysDiff,
  selectedService,
  setSelectedService,
  servicesNames,
  isLoading,
  compareLabel,
  showCompare,
  errorMsg,
  setShowCompare,
}: {
  dateFrom: Date;
  dateTo: Date;
  setDateFrom: Dispatch<SetStateAction<Date>>;
  setDateTo: Dispatch<SetStateAction<Date>>;
  daysDiff: number;
  selectedService: string;
  setSelectedService: Dispatch<SetStateAction<string>>;
  servicesNames: string[];
  isLoading: boolean;
  errorMsg?: string;
  compareLabel: string;
  showCompare: boolean;
  setShowCompare: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex flex-col gap-5 w-full pt-6 pb-4 sm:pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="sb-text-16 font-semibold mb-2">SERVICE OVERVIEW</p>
        <ComboBox
          name="service"
          options={servicesNames}
          fieldName="Service"
          handleSelect={(selected?: string) =>
            setSelectedService(selected || "")
          }
          defaultValue={selectedService}
          optionsLoading={isLoading}
          optionsErrorMsg={errorMsg}
          className="max-w-max"
        />
      </div>

      <div className="flex flex-col gap-2 items-end">
        <ToggleSwitch
          checked={showCompare}
          label={`Compare with ${compareLabel}`}
          onChange={setShowCompare}
          color="primary"
          className="shrink-0"
        />
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="flex items-center gap-1">
            <label htmlFor="dateFrom" className="sb-text-16 ">
              From:
            </label>
            <Datepicker
              id="dateFrom"
              defaultDate={dateFrom}
              minDate={new Date(2018, 1, 1)}
              maxDate={dateTo}
              onSelectedDateChanged={(date) => setDateFrom(date)}
            />
          </div>
          <div className="sb-text-16 flex items-center gap-1">
            <label htmlFor="dateTo" className="sb-text-16 ">
              To:
            </label>
            <Datepicker
              id="dateTo"
              defaultDate={dateTo}
              minDate={dateFrom}
              maxDate={new Date()}
              onSelectedDateChanged={(date) => setDateTo(date)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
