"use client";

import React, { useState } from "react";
import { ITableBody } from "./constants";
import PaginatedItems from "./pagination";
import { useSearchParams } from "next/navigation";
import DoChecks from "@/components/DoChecks";
import TableSection from "./tableSection";
import HeaderSection from "./headerSection";
import TableSkeleton from "../skeleton/TableSkeleton";

const GeneralTable = ({
  title,
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
  errorMsg,
  preview,
}: IProps) => {
  const [selectOn, setSelectOn] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const tablePage = parseInt(searchParams.get("page") || "1");

  const offset = itemsPerPage ? (tablePage - 1) * itemsPerPage : 0;

  const tableBodyPreview = tableBody.map((row) => ({
    ...row,
    rowInfo: row.rowInfo.slice(0, 3),
  }));

  return (
    <div className="flex flex-col flex-1 max-w-full pb-0 bg-background rounded-lg shadow-md px-4 lg:px-6">
      <HeaderSection
        title={title}
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
        errorText={errorMsg}
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

        {itemsLength && itemsPerPage && itemsLength > itemsPerPage ? (
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
        ) : (
          ""
        )}
      </DoChecks>
    </div>
  );
};

export default GeneralTable;

interface IProps {
  title: string;
  tableHeaders: string[];
  tableBody: ITableBody[];
  tableNav: string[];
  onRowSelect: (selected: string[]) => void;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (value: string) => void;
  handleFilter: (value?: string) => void;
  dataLoading?: boolean;
  errorMsg?: string;
  preview?: string;
  itemsPerPage?: number;
  itemsLength?: number;
}
