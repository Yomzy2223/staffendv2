import { cn } from "@/lib/utils";
import { format, isSameYear, max, subDays } from "date-fns";
import { Button, Datepicker, TextInput, ToggleSwitch } from "flowbite-react";
import { Calendar, CalendarDays, ChevronDown } from "lucide-react";
import React, {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useState,
} from "react";
import ComboBox from "../../form/dynamicForm/comboBox";
import DialogWrapper from "../../wrappers/dialogWrapper";

const DashboardHeader = ({
  dateFrom,
  dateTo,
  setDateFrom,
  setDateTo,
  compareFrom,
  compareTo,
  setCompareFrom,
  setCompareTo,
  daysDiff,
  selectedService,
  setSelectedService,
  servicesNames,
  isLoading,
  showCompare,
  errorMsg,
  setShowCompare,
}: {
  dateFrom: Date;
  dateTo: Date;
  setDateFrom: Dispatch<SetStateAction<Date>>;
  setDateTo: Dispatch<SetStateAction<Date>>;
  compareFrom: Date;
  compareTo: Date;
  setCompareFrom: Dispatch<SetStateAction<Date>>;
  setCompareTo: Dispatch<SetStateAction<Date>>;
  daysDiff: number;
  selectedService: string;
  setSelectedService: Dispatch<SetStateAction<string>>;
  servicesNames: string[];
  isLoading: boolean;
  errorMsg?: string;
  showCompare: boolean;
  setShowCompare: Dispatch<SetStateAction<boolean>>;
}) => {
  const [open, setOpen] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState<number>();

  // let defaultDate = dateTo;
  // let minDate = dateFrom;
  // let maxDate = new Date();

  const onSelectedDateChanged = (date: Date) => {
    setOpenDatePicker(0);
    openDatePicker === 1 && setDateFrom(date);
    openDatePicker === 2 && setDateTo(date);
    openDatePicker === 3 && setCompareFrom(date);
    openDatePicker === 4 && setCompareTo(date);
  };

  const opStartDate = new Date(2020, 0, 1);
  let minDate = opStartDate;
  switch (openDatePicker) {
    case 2:
      minDate = dateFrom;
      break;
    case 3:
      minDate = opStartDate;
      break;
    case 4:
      minDate = compareFrom;
      break;
  }

  let maxDate = new Date();
  switch (openDatePicker) {
    case 1:
      maxDate = dateTo;
      break;
    case 3:
      maxDate = compareTo;
      break;
    case 4:
      maxDate = dateFrom;
      break;
  }

  let defaultDate = dateFrom;
  switch (openDatePicker) {
    case 2:
      defaultDate = dateTo;
      break;
    case 3:
      defaultDate = compareFrom;
      break;
    case 4:
      defaultDate = compareTo;
      break;
  }
  console.log(defaultDate, minDate);
  defaultDate = max([defaultDate, minDate]);
  console.log(defaultDate);

  return (
    <>
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

        <Button
          color="transparent"
          size="fit"
          className="[&_span]:items-stretch [&_span]:gap-4"
          onClick={() => setOpen(true)}
        >
          <div className="inline-flex items-center gap-2 text-sm rounded-l-md border border-border px-3 py-2">
            Current Month
            <ChevronDown size={14} strokeWidth={3} />
          </div>

          <div className="flex items-center px-1.5 bg-muted !min-h-full rounded">
            <CalendarDays size={22} />
          </div>
        </Button>
      </div>

      <DialogWrapper
        open={open}
        setOpen={setOpen}
        title="Select date range"
        classNames={{ body: "flex flex-col gap-6" }}
        dismissible
      >
        <ToggleSwitch
          checked={showCompare}
          label="Compare"
          onChange={setShowCompare}
          color="primary"
          className="shrink-0"
        />
        <div
          className={cn("flex flex-col gap-2", {
            "sm:flex-row items-end": showCompare,
          })}
        >
          <DateSelector
            id="dateFrom"
            date={dateFrom}
            onClick={() => setOpenDatePicker(1)}
            isActive={openDatePicker === 1}
            label="Start date"
          />
          {showCompare && <span className="my-3">to</span>}
          <DateSelector
            id="dateTo"
            date={dateTo}
            onClick={() => setOpenDatePicker(2)}
            isActive={openDatePicker === 2}
            label="End date"
          />
        </div>
        {showCompare && (
          <div className="space-y-6">
            <p className="mx-auto w-max text-sm font-normal">against</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <DateSelector
                id="compareFrom"
                date={compareFrom}
                onClick={() => setOpenDatePicker(3)}
                isActive={openDatePicker === 3}
                label="Start date"
              />
              <span className="my-3">to</span>
              <DateSelector
                id="compareTo"
                date={compareTo}
                onClick={() => setOpenDatePicker(4)}
                isActive={openDatePicker === 4}
                label="End date"
              />
            </div>
          </div>
        )}
        {!!openDatePicker && (
          <Datepicker
            inline
            defaultDate={defaultDate}
            minDate={minDate}
            maxDate={maxDate}
            onSelectedDateChanged={onSelectedDateChanged}
            theme={{
              popup: {
                root: {
                  inner: "w-full py-2",
                },
                view: {
                  base: "[&_div]:w-full",
                },
              },
            }}
          />
        )}
      </DialogWrapper>
    </>
  );
};

export default DashboardHeader;

export const DateSelector = ({
  id,
  label,
  isActive,
  date,
  onClick,
  labelClassName,
}: {
  id: string;
  label: string;
  isActive?: boolean;
  date: Date;
  onClick: MouseEventHandler<HTMLButtonElement>;
  labelClassName?: string;
}) => {
  return (
    <div className="!flex-1">
      <label
        htmlFor={id}
        className={cn("text-sm text-foreground-2", labelClassName)}
      >
        {label}
      </label>
      <Button
        outline
        id={id}
        onClick={onClick}
        className={cn("!w-full !max-w-full [&_span]:!justify-start", {
          "ring-1 ring-primary border-primary focus:!ring-1 [&_span]focus:!border-primary":
            isActive,
        })}
      >
        <div className="rounded-lg">
          <Calendar fill="hsl(var(--foreground-5))" color="white" />
        </div>
        {format(date, "MMM dd, yyyy")}
      </Button>
    </div>
  );
};

//  <div className={cn("sb-text-16")}>
//    <label
//      htmlFor="dateTo"
//      className={cn("sb-text-16 ", {
//        "items-end": showCompare,
//      })}
//    >
//      End date
//    </label>
//    <Datepicker
//      id="dateTo"
//      defaultDate={dateTo}
//      minDate={dateFrom}
//      maxDate={new Date()}
//      onSelectedDateChanged={(date) => setDateTo(date)}
//    />
//  </div>;
//  <label htmlFor="dateFrom" className="sb-text-16 ">
//                   Start date
//                 </label>
//                 <Datepicker
//                   id="dateFrom"
//                   defaultDate={dateFrom}
//                   minDate={new Date(2018, 1, 1)}
//                   maxDate={dateTo}
//                   onSelectedDateChanged={(date) => setDateFrom(date)}
//                 />
