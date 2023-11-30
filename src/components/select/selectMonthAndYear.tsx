import { Select } from "flowbite-react";
import React from "react";
import { allMonths, allMonthsShort, years } from "./constants";

const SelectMonthAndYear = ({ short }: { short?: boolean }) => {
  const months = short ? allMonthsShort : allMonths;

  return (
    <div className="flex">
      <Select className="[&_select]:rounded-r-none [&_select]:border-r-0 [&_select]:text-sm ">
        {months.map((el) => (
          <option key={el}>{el}</option>
        ))}
      </Select>
      <Select className="[&_select]:rounded-l-none [&_select]:text-sm">
        {years.map((el) => (
          <option key={el}>{el}</option>
        ))}
      </Select>
    </div>
  );
};

export default SelectMonthAndYear;
