"use client";

import { Table, TableHeadCell } from "flowbite-react";
import React from "react";

const GeneralTable = () => {
  return (
    <Table hoverable striped className="max-w-full">
      <Table.Head>
        {tableHeaders.map((el) => (
          <Table.HeadCell key={el}>{el}</Table.HeadCell>
        ))}
      </Table.Head>

      <Table.Body>
        {tableBody.map((row, i) => (
          <Table.Row key={i}>
            {row.map((cell) => (
              <Table.Cell
                key={cell.text}
                {...cell.cellProps}
                className="whitespace-nowrap"
              >
                {cell.text}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default GeneralTable;

const tableHeaders = ["S/N", "BUSINESS NAME", "STATUS", "SERVICE TYPE", "DATE"];
const tableBody = [
  [
    { text: "01", cellProps: {} },
    { text: "Sayo oil and gas", cellProps: {} },
    { text: "Submitted", cellProps: {} },
    { text: "Manage", cellProps: {} },
    { text: "April 23, 2021", cellProps: {} },
  ],
  [
    { text: "01", cellProps: {} },
    { text: "Sayo oil and gas", cellProps: {} },
    { text: "Submitted", cellProps: {} },
    { text: "Manage", cellProps: {} },
    { text: "April 23, 2021", cellProps: {} },
  ],
  [
    { text: "01", cellProps: {} },
    { text: "Sayo oil and gas", cellProps: {} },
    { text: "Submitted", cellProps: {} },
    { text: "Manage", cellProps: {} },
    { text: "April 23, 2021", cellProps: {} },
  ],
  [
    { text: "01", cellProps: {} },
    { text: "Sayo oil and gas", cellProps: {} },
    { text: "Submitted", cellProps: {} },
    { text: "Manage", cellProps: {} },
    { text: "April 23, 2021", cellProps: {} },
  ],
  [
    { text: "01", cellProps: {} },
    { text: "Sayo oil and gas", cellProps: {} },
    { text: "Submitted", cellProps: {} },
    { text: "Manage", cellProps: {} },
    { text: "April 23, 2021", cellProps: {} },
  ],
  [
    { text: "01", cellProps: {} },
    { text: "Sayo oil and gas", cellProps: {} },
    { text: "Submitted", cellProps: {} },
    { text: "Manage", cellProps: {} },
    { text: "April 23, 2021", cellProps: {} },
  ],
];
