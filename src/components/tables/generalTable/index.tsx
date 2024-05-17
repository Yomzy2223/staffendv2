"use client";

import React, { useState } from "react";
import { ITableBody } from "./constants";
import PaginatedItems, { IPagination } from "./pagination";
import { useSearchParams } from "next/navigation";
import DoChecks from "@/components/DoChecks";
import TableSection from "./tableSection";
import HeaderSection from "./headerSection";
import CardWrapper from "@/components/wrappers/cardWrapper";
import TableSkeleton from "./TableSkeleton";

const GeneralTable = ({
  tableHeaders,
  tableBody,
  tableNav,
  itemsPerPage,
  itemsLength,
  onRowSelect,
  onSearchChange,
  onSearchSubmit,
  handleFilter,
  dataLoading,
  preview,
}: IProps) => {
  const [selectOn, setSelectOn] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const tablePage = parseInt(searchParams.get("page") || "1");

  const offset = (tablePage - 1) * itemsPerPage;

  const tableBodyPreview = tableBody.map((row) => ({
    ...row,
    rowInfo: row.rowInfo.slice(0, 3),
  }));

  return (
    <CardWrapper className="flex flex-col flex-1 max-w-full pb-0">
      <HeaderSection
        selectOn={selectOn}
        setSelectOn={setSelectOn}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        tableNav={tableNav}
        onSearchChange={onSearchChange}
        onSearchSubmit={onSearchSubmit}
        handleFilter={handleFilter}
        preview={preview}
      />

      <DoChecks
        items={tableBody}
        emptyText="No data"
        className="flex flex-col justify-between flex-1 max-w-full overflow-auto"
        Skeleton={<TableSkeleton />}
        isLoading={dataLoading}
      >
        <TableSection
          onSelect={onRowSelect}
          selectOn={selectOn}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          tableBody={preview ? tableBodyPreview : tableBody}
          tableHeaders={preview ? tableHeaders.slice(0, 3) : tableHeaders}
          preview={preview}
        />

        {itemsLength > itemsPerPage && (
          <div className="flex flex-col justify-between gap-4 sticky left-0 p-4 md:flex-row md:items-center md:py-5">
            <p className="inline-flex gap-1 text-sm text-foreground-5">
              Showing
              <span className="text-foreground font-medium whitespace-nowrap">
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
    </CardWrapper>
  );
};

export default GeneralTable;

interface IProps extends IPagination {
  tableHeaders: string[];
  tableBody: ITableBody[];
  tableNav: string[];
  // tableNav: { name: string; value: string; text: string }[];
  onRowSelect: (selected: string[]) => void;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (value: string) => void;
  handleFilter: (value?: string) => void;
  dataLoading?: boolean;
  preview?: string;
}
