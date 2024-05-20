import { cn } from "@/lib/utils";
import { differenceInDays, format, max, subDays } from "date-fns";
import { Button, Datepicker, ToggleSwitch } from "flowbite-react";
import { Calendar } from "lucide-react";
import React, { Dispatch, MouseEventHandler, SetStateAction } from "react";

const CustomDate = ({
  dateFrom,
  dateTo,
  compareTo,
  compareFrom,
  showCompare,
  setCompareFrom,
  setCompareTo,
  reqsDateData,
  setShowCompare,
  openDatePicker,
  setOpenDatePicker,
  onSelectedDateChanged,
  setOpen,
}: IProps) => {
  const opStartDate = new Date(2020, 0, 1);

  let minDate: Date | undefined = opStartDate;
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

  let maxDate: Date | undefined = new Date();
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
  defaultDate =
    defaultDate && minDate ? max([defaultDate, minDate]) : undefined;

  const handleToggle = (checked: boolean) => {
    setCompareFrom(
      subDays(dateFrom || reqsDateData.firstDate, reqsDateData.daysDiff)
    );
    setCompareTo(subDays(dateFrom || reqsDateData.lastDate, 1));
    setShowCompare(checked);
  };

  return (
    <div className="flex flex-1 flex-col justify-between gap-6">
      <div className="flex flex-col gap-6">
        <ToggleSwitch
          checked={showCompare}
          label="Compare"
          onChange={handleToggle}
          color="primary"
          className="shrink-0"
        />
        <div
          className={cn("flex flex-col gap-2", {
            "sm:flex-row sm:items-end": showCompare,
          })}
        >
          <DateSelector
            id="dateFrom"
            date={dateFrom}
            onClick={() => setOpenDatePicker(1)}
            isActive={openDatePicker === 1}
            label="Start date"
          />
          {showCompare && <span className="text-center sm:my-3">to</span>}
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
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
              <DateSelector
                id="compareFrom"
                date={compareFrom}
                onClick={() => setOpenDatePicker(3)}
                isActive={openDatePicker === 3}
                label="Start date"
              />
              <span className="text-center sm:my-3">to</span>
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
      </div>
      <Button
        color="primary"
        className="self-end"
        onClick={() => setOpen(false)}
      >
        Done
      </Button>
    </div>
  );
};

export default CustomDate;

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
  date?: Date;
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
        {date ? format(date, "MMM dd, yyyy") : "Select date"}
      </Button>
    </div>
  );
};

interface IProps {
  dateFrom?: Date;
  dateTo?: Date;
  compareFrom?: Date;
  compareTo?: Date;
  setCompareFrom: Dispatch<SetStateAction<Date | undefined>>;
  setCompareTo: Dispatch<SetStateAction<Date | undefined>>;
  reqsDateData: { firstDate: Date; lastDate: Date; daysDiff: number };
  showCompare: boolean;
  openDatePicker?: number;
  setShowCompare: Dispatch<SetStateAction<boolean>>;
  setOpenDatePicker: Dispatch<SetStateAction<number | undefined>>;
  onSelectedDateChanged: (date: Date) => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
