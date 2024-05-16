import { format, isSameYear, subDays } from "date-fns";
import { Datepicker, ToggleSwitch } from "flowbite-react";
import React, { Dispatch, SetStateAction } from "react";
import ComboBox from "../../form/dynamicForm/comboBox";

const ServiceHeader = ({
  dateFrom,
  dateTo,
  setDateFrom,
  setDateTo,
  daysDiff,
  selectedService,
}: {
  dateFrom: Date;
  dateTo: Date;
  setDateFrom: Dispatch<SetStateAction<Date>>;
  setDateTo: Dispatch<SetStateAction<Date>>;
  daysDiff: number;
  selectedService: string;
}) => {
  return (
    <div className="flex flex-col gap-5 w-full sm:flex-row sm:items-center sm:justify-between">
      <p className="sb-text-16 font-semibold">SERVICE OVERVIEW</p>

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
        <div className="flex items-center gap-1">
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
  );
};

export default ServiceHeader;
