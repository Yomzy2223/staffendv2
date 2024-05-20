import { cn } from "@/lib/utils";
import { differenceInDays, startOfMonth, subDays } from "date-fns";
import { Button } from "flowbite-react";
import { CalendarDays } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import CustomDate from "./customDate";
import ComboBox from "@/components/form/dynamicForm/comboBox";
import DialogWrapper from "@/components/wrappers/dialogWrapper";

const DashboardHeader = ({
  dateFrom,
  dateTo,
  setDateFrom,
  setDateTo,
  compareFrom,
  compareTo,
  setCompareFrom,
  setCompareTo,
  selectedService,
  setSelectedService,
  reqsDateData,
  servicesNames,
  isLoading,
  showCompare,
  errorMsg,
  setShowCompare,
}: IProps) => {
  const [open, setOpen] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState<number>();
  const [range, setRange] = useState("");

  const onSelectedDateChanged = (date: Date) => {
    setOpenDatePicker(0);
    openDatePicker === 1 && setDateFrom(date);
    openDatePicker === 2 && setDateTo(date);
    openDatePicker === 3 && setCompareFrom(date);
    openDatePicker === 4 && setCompareTo(date);
  };

  const handleRangeSelect = (range?: string) => {
    const daysDiff = differenceInDays(new Date(), startOfMonth(new Date())) + 1;

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
        setCompareTo(subDays(startOfMonth(new Date()), 1));
        break;
      }
      case "custom": {
        setDateFrom(startOfMonth(new Date()));
        setDateTo(new Date());
        setCompareFrom(subDays(startOfMonth(new Date()), daysDiff));
        setCompareTo(subDays(startOfMonth(new Date()), 1));
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
          setCompareFrom={setCompareFrom}
          setCompareTo={setCompareTo}
          showCompare={showCompare}
          setShowCompare={setShowCompare}
          reqsDateData={reqsDateData}
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

interface IProps {
  dateFrom?: Date;
  dateTo?: Date;
  setDateFrom: Dispatch<SetStateAction<Date | undefined>>;
  setDateTo: Dispatch<SetStateAction<Date | undefined>>;
  compareFrom?: Date;
  compareTo?: Date;
  setCompareFrom: Dispatch<SetStateAction<Date | undefined>>;
  setCompareTo: Dispatch<SetStateAction<Date | undefined>>;
  reqsDateData: { firstDate: Date; lastDate: Date; daysDiff: number };
  selectedService: string;
  setSelectedService: Dispatch<SetStateAction<string>>;
  servicesNames: string[];
  isLoading: boolean;
  errorMsg?: string;
  showCompare: boolean;
  setShowCompare: Dispatch<SetStateAction<boolean>>;
}
