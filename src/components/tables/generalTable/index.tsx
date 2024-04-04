"use client";

import QueryNav2 from "@/components/navigation/queryNav2";
import SearchComp from "@/components/search";
import { cn } from "@/lib/utils";
import { Table } from "flowbite-react";
import React from "react";
import { ITableBody } from "./constants";

const GeneralTable = ({ tableHeaders, tableBody, tableNav }: IProps) => {
  return (
    <div className="max-w-full overflow-auto">
      <div className="flex justify-between gap-6 sticky left-0">
        <div>
          <p className="sb-text-24 font-semibold mb-3">Recent services</p>
          <div className="flex flex-col gap-3 text-sm font-normal mb-6 md:gap-4 md:flex-row md:items-center">
            <span>Show only:</span>
            <QueryNav2 queryNav={tableNav} />
          </div>
        </div>
        <SearchComp onSubmit={() => console.log("searching...")} />
      </div>

      <Table hoverable striped>
        <Table.Head>
          {tableHeaders.map((el) => (
            <Table.HeadCell key={el} className="whitespace-nowrap">
              {el}
            </Table.HeadCell>
          ))}
        </Table.Head>

        <Table.Body>
          {tableBody.map((row, i) => (
            <Table.Row
              key={row.rowId}
              {...row.rowProps}
              onClick={(e) =>
                row?.handleClick && row.handleClick(e, row.rowId, row.rowInfo)
              }
              className={cn({ "cursor-pointer": row?.handleClick })}
            >
              {row.rowInfo.map((cell) => (
                <Table.Cell
                  key={row.rowId + cell.text}
                  {...cell?.cellProps}
                  onClick={(e) =>
                    cell?.handleClick &&
                    cell.handleClick(e, row.rowId, cell.text)
                  }
                  className={cn(
                    "whitespace-nowrap",
                    cell?.cellProps?.className,
                    { "cursor-pointer": cell?.handleClick }
                  )}
                >
                  <span>{cell.text}</span>
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default GeneralTable;

interface IProps {
  tableHeaders: string[];
  tableBody: ITableBody[];
  tableNav: { name: string; value: string; text: string }[];
}
