"use client";

import QueryNav2 from "@/components/navigation/queryNav2";
import SearchComp from "@/components/search";
import { cn } from "@/lib/utils";
import { Button, Checkbox, Table } from "flowbite-react";
import React, { useState } from "react";
import { ITableBody } from "./constants";
import { v4 as uuidv4 } from "uuid";
import PaginatedItems, { IPagination } from "./pagination";
import { useSearchParams } from "next/navigation";
import DoChecks from "@/components/DoChecks";

const GeneralTable = ({
  tableHeaders,
  tableBody,
  tableNav,
  itemsPerPage,
  itemsLength,
  onSelect,
}: IProps) => {
  const [select, setSelect] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const tablePage = parseInt(searchParams.get("page") || "1");

  const offset = (tablePage - 1) * itemsPerPage;

  // The selected rows from the current page
  const selectedFromCurrent = tableBody?.map((row: ITableBody) =>
    selectedRows.find((el) => el === row.rowId)
  );
  const allSelected = !selectedFromCurrent?.some((el) => el === undefined); // If all is selected

  //
  const handleSelect = (row: ITableBody, isSelected: boolean) => {
    const included = [...selectedRows, row.rowId];
    const removed = selectedRows.filter((el) => el !== row.rowId);
    onSelect(isSelected ? removed : included);
    setSelectedRows(isSelected ? removed : included);
  };

  const handleSelectAll = () => {
    const included = [
      ...new Set([...selectedRows, ...tableBody.map((row) => row.rowId)]),
    ];
    const removed = selectedRows.filter(
      (el) => !tableBody.find((row: ITableBody) => row.rowId === el)
    );
    setSelectedRows(allSelected ? removed : included);
  };

  console.log(allSelected);
  return (
    <div className="max-w-full overflow-auto">
      <div className="flex justify-between gap-6 sticky left-0 py-1">
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
            {select && (
              <p className="text-foreground-5 text-sm">
                Selected ({selectedRows.length})
              </p>
            )}
            <Button
              color="transparent"
              size="fit"
              className="text-primary"
              onClick={() => {
                setSelect(select ? false : true);
                select && setSelectedRows([]);
              }}
            >
              {select ? "Deselect" : "Select"}
            </Button>
          </div>
        </div>
      </div>

      <DoChecks items={tableBody}>
        <Table hoverable striped>
          <Table.Head>
            {select && (
              <Table.HeadCell>
                <Checkbox
                  className="cursor-pointer"
                  onChange={handleSelectAll}
                  checked={allSelected}
                />
              </Table.HeadCell>
            )}
            {tableHeaders.map((el) => (
              <Table.HeadCell key={el} className="whitespace-nowrap">
                {el}
              </Table.HeadCell>
            ))}
          </Table.Head>

          <Table.Body>
            {tableBody.map((row, i) => {
              const isSelected = !!selectedRows.find((el) => el === row.rowId);

              return (
                <Table.Row
                  key={row.rowId}
                  {...row.rowProps}
                  onClick={(e) =>
                    select
                      ? handleSelect(row, isSelected)
                      : row?.handleClick &&
                        row.handleClick(e, row.rowId, row.rowInfo)
                  }
                  className={cn({ "cursor-pointer": row?.handleClick })}
                >
                  {select && (
                    <Table.Cell>
                      <Checkbox
                        className="cursor-pointer"
                        checked={isSelected}
                        onChange={() => handleSelect(row, isSelected)}
                      />
                    </Table.Cell>
                  )}
                  {row.rowInfo.map((cell) => (
                    <Table.Cell
                      key={uuidv4()}
                      {...cell?.cellProps}
                      onClick={(e) => {
                        !select &&
                          cell?.handleClick &&
                          cell.handleClick(e, row.rowId, cell.text);
                      }}
                      className={cn(
                        "whitespace-nowrap",
                        cell?.cellProps?.className,
                        { "cursor-pointer": cell?.handleClick || select }
                      )}
                    >
                      <span>{cell.text}</span>
                    </Table.Cell>
                  ))}
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>

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
