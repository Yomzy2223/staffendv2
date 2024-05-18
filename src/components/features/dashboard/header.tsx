import { cn } from "@/lib/utils";
import { startOfMonth, subDays } from "date-fns";
import { Button } from "flowbite-react";
import { CalendarDays } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import ComboBox from "../../form/dynamicForm/comboBox";
import DialogWrapper from "../../wrappers/dialogWrapper";
import CustomDate from "./customDate";

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
}: IProps) => {
  const [open, setOpen] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState<number>();
  const [range, setRange] = useState("");

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

  const handleRangeSelect = (range?: string) => {
    setRange(range || "");
    switch (range?.toLowerCase()) {
      case "all": {
        setDateFrom(undefined);
        setDateTo(undefined);
        setCompareFrom(undefined);
        setCompareTo(undefined);
        break;
      }
      case "current month": {
        setDateFrom(startOfMonth(new Date()));
        setDateTo(new Date());
        setCompareFrom(subDays(startOfMonth(new Date()), daysDiff));
        setCompareTo(subDays(new Date(), daysDiff));
        break;
      }
      case "custom": {
        setDateFrom(startOfMonth(new Date()));
        setDateTo(new Date());
        setCompareFrom(subDays(startOfMonth(new Date()), daysDiff));
        setCompareTo(subDays(new Date(), daysDiff));
        break;
      }
    }
  };

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
            className="max-w-max !border-none [&>span]:!p-0 !ring-0"
          />
        </div>

        <div className="flex items-stretch gap-4">
          <ComboBox
            name="range"
            placeholder="All"
            options={["All", "Current month", "Custom"]}
            handleSelect={handleRangeSelect}
            defaultValue="All"
            className={cn({
              "[&>span]:!rounded-r-none rounded-r-none":
                range.toLowerCase() === "custom",
            })}
          />
          {range.toLowerCase() === "custom" && (
            <Button
              color="transparent"
              size="fit"
              className="flex"
              onClick={() => setOpen(true)}
            >
              <div className="flex items-center px-2 bg-muted py-2.5 rounded-r-md">
                <CalendarDays size={22} />
              </div>
            </Button>
          )}
        </div>
      </div>

      <DialogWrapper
        open={open}
        setOpen={setOpen}
        title="Select date range"
        classNames={{ body: "flex flex-col gap-6" }}
        dismissible
      >
        <CustomDate
          dateFrom={dateFrom}
          dateTo={dateTo}
          compareFrom={compareFrom}
          compareTo={compareTo}
          showCompare={showCompare}
          setShowCompare={setShowCompare}
          openDatePicker={openDatePicker}
          setOpenDatePicker={setOpenDatePicker}
          onSelectedDateChanged={onSelectedDateChanged}
          setOpen={setOpen}
        />
      </DialogWrapper>
    </>
  );
};

export default DashboardHeader;

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

interface IProps {
  dateFrom?: Date;
  dateTo?: Date;
  setDateFrom: Dispatch<SetStateAction<Date | undefined>>;
  setDateTo: Dispatch<SetStateAction<Date | undefined>>;
  compareFrom?: Date;
  compareTo?: Date;
  setCompareFrom: Dispatch<SetStateAction<Date | undefined>>;
  setCompareTo: Dispatch<SetStateAction<Date | undefined>>;
  daysDiff: number;
  selectedService: string;
  setSelectedService: Dispatch<SetStateAction<string>>;
  servicesNames: string[];
  isLoading: boolean;
  errorMsg?: string;
  showCompare: boolean;
  setShowCompare: Dispatch<SetStateAction<boolean>>;
}
