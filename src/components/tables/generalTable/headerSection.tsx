import ComboBox from "@/components/form/dynamicForm/comboBox";
import QueryNav2 from "@/components/navigation/queryNav2";
import SearchComp from "@/components/search";
import { Button } from "flowbite-react";
import { Search } from "lucide-react";
import React, { ChangeEventHandler, Dispatch, SetStateAction } from "react";

const HeaderSection = ({
  tableNav,
  selectOn,
  setSelectOn,
  selectedRows,
  setSelectedRows,
  onSearchChange,
  onSearchSubmit,
  handleFilter,
  preview,
}: IProps) => {
  return (
    <div className="flex justify-between gap-6 py-1">
      <div>
        <p className="sb-text-24 font-semibold mb-3">Recent services</p>
        <div className="flex flex-col gap-3 text-sm font-normal mb-6 md:gap-4 md:flex-row md:items-center">
          <span>Show only:</span>
          <ComboBox
            options={tableNav}
            handleSelect={handleFilter}
            fieldName="filter"
            defaultValue={tableNav[0]}
          />
          {/* <QueryNav2 queryNav={tableNav} /> */}
        </div>
      </div>
      {!preview && (
        <div className="flex flex-col justify-between items-end gap-2 mb-6">
          <SearchComp
            onChange={onSearchChange}
            onSubmit={onSearchSubmit}
            wrapperClassName="hidden md:flex"
          />
          <Search
            className="block md:hidden"
            color="hsl(var(--foreground-5))"
            width={20}
          />
          <div className="flex items-center gap-2">
            {selectOn && (
              <p className="text-foreground-5 text-sm">
                Selected ({selectedRows.length})
              </p>
            )}
            <Button
              color="transparent"
              size="fit"
              className="text-primary"
              onClick={() => {
                setSelectOn(selectOn ? false : true);
                selectOn && setSelectedRows([]);
              }}
            >
              {selectOn ? "Cancel" : "Select"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderSection;

interface IProps {
  // tableNav: { name: string; value: string; text: string }[];
  tableNav: string[];
  selectOn: boolean;
  setSelectOn: Dispatch<SetStateAction<boolean>>;
  selectedRows: string[];
  setSelectedRows: Dispatch<SetStateAction<string[]>>;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (value: string) => void;
  handleFilter: (value?: string) => void;
  preview?: string;
}
