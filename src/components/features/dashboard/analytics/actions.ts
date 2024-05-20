import { TRequestAll } from "@/services/request/types";
import { addDays, format, isSameDay, subDays } from "date-fns";

export const useActions = ({
  formatStr,
  compareFrom,
  dateFrom,
  rangeData,
  compareData,
  reqsDateData,
  compareDateData,
}: IActionProps) => {
  // Returns the data for each day
  const getDayData = (inc: number, isCompare: boolean) => {
    const allData = isCompare ? compareData : rangeData;
    const dayDate = isCompare
      ? compareFrom
        ? addDays(compareFrom, inc)
        : addDays(
            subDays(compareDateData.firstDate, compareDateData.daysDiff),
            inc
          )
      : dateFrom
      ? addDays(dateFrom, inc)
      : addDays(reqsDateData.firstDate, inc);
    if (dayDate) {
      const dayData = allData?.filter((el) =>
        isSameDay(new Date(el.createdAt), dayDate)
      );

      return {
        dayDate: format(dayDate, formatStr),
        dayData,
      };
    }
  };

  // Returns the data for selected range, if isCompare is true. Returns for compare range, if otherwise
  const getRangeData = (isCompare: boolean) => {
    let rangeData: any[] = [];
    const daysInRange = isCompare
      ? compareDateData.daysDiff
      : reqsDateData.daysDiff;
    for (let i = 0; i < daysInRange; i++) {
      const dayData = getDayData(i, isCompare);
      rangeData = [...rangeData, dayData];
    }
    return rangeData;
  };

  return { getDayData, getRangeData };
};

interface IActionProps {
  formatStr: string;
  compareFrom?: Date;
  dateFrom?: Date;
  rangeData?: TRequestAll[];
  compareData?: TRequestAll[];
  reqsDateData: { firstDate: Date; lastDate: Date; daysDiff: number };
  compareDateData: { firstDate: Date; lastDate: Date; daysDiff: number };
}
