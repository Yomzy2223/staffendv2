import QueryNav2 from "@/components/navigation/queryNav2";
import SearchComp from "@/components/search";
import { Button } from "flowbite-react";
import React, { Dispatch, SetStateAction } from "react";

const HeaderSection = ({
  tableNav,
  selectOn,
  setSelectOn,
  selectedRows,
  setSelectedRows,
}: IProps) => {
  return (
    <div className="flex justify-between gap-6 py-1">
      <div>
        <p className="sb-text-24 font-semibold mb-3">Recent services</p>
        <div className="flex flex-col gap-3 text-sm font-normal mb-6 md:gap-4 md:flex-row md:items-center">
          <span>Show only:</span>
          <QueryNav2 queryNav={tableNav} />
        </div>
      </div>
      <div className="flex flex-col justify-between items-end gap-2 mb-6">
        <SearchComp onSubmit={() => console.log("searching...")} />
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
            {selectOn ? "Deselect" : "Select"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;

interface IProps {
  tableNav: { name: string; value: string; text: string }[];
  selectOn: boolean;
  setSelectOn: Dispatch<SetStateAction<boolean>>;
  selectedRows: string[];
  setSelectedRows: Dispatch<SetStateAction<string[]>>;
}
