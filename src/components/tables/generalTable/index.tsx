"use client";

import React, { useState } from "react";
import { ITableBody } from "./constants";
import PaginatedItems, { IPagination } from "./pagination";
import { useSearchParams } from "next/navigation";
import DoChecks from "@/components/DoChecks";
import TableSection from "./tableSection";
import HeaderSection from "./headerSection";

const GeneralTable = ({
  tableHeaders,
  tableBody,
  tableNav,
  itemsPerPage,
  itemsLength,
  onSelect,
}: IProps) => {
  const [selectOn, setSelectOn] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const tablePage = parseInt(searchParams.get("page") || "1");

  const offset = (tablePage - 1) * itemsPerPage;

  return (
    <div className="max-w-full overflow-auto">
      <HeaderSection
        selectOn={selectOn}
        setSelectOn={setSelectOn}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        tableNav={tableNav}
      />

      <DoChecks items={tableBody}>
        <TableSection
          onSelect={onSelect}
          selectOn={selectOn}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          tableBody={tableBody}
          tableHeaders={tableHeaders}
        />
        {itemsLength > itemsPerPage && (
          <div className="flex flex-col justify-between gap-4 sticky left-0 p-0 md:p-4 md:flex-row md:items-center md:py-5">
            <p className="inline-flex gap-1 text-sm text-foreground-5">
              Showing
              <span className="text-foreground font-medium">
                {offset + 1}-{offset + tableBody?.length}
              </span>
              of{" "}
              <span className="text-foreground font-medium">{itemsLength}</span>
            </p>
            <PaginatedItems
              itemsLength={itemsLength}
              itemsPerPage={itemsPerPage}
            />
          </div>
        )}
      </DoChecks>
    </div>
  );
};

export default GeneralTable;

interface IProps extends IPagination {
  tableHeaders: string[];
  tableBody: ITableBody[];
  tableNav: { name: string; value: string; text: string }[];
  onSelect: (selected: string[]) => void;
}
