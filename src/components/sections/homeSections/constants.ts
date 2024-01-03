import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

export const serviceQueryNav = [
  {
    name: "service-date-range",
    value: "weekly",
  },
  {
    name: "service-date-range",
    value: "monthly",
  },
  {
    name: "service-date-range",
    value: "yearly",
  },
];

export const serviceQueryNav2 = [
  {
    name: "service",
    value: "onboard",
  },
  {
    name: "service",
    value: "launch",
  },
  {
    name: "service",
    value: "manage",
  },
  {
    name: "service",
    value: "tax",
  },
];

export const paymentQueryNav = [
  {
    name: "payment-date-range",
    value: "weekly",
  },
  {
    name: "payment-date-range",
    value: "monthly",
  },
  {
    name: "payment-date-range",
    value: "yearly",
  },
];

const cellClassName =
  "[&_span]:bg-yellow-300 [&_span]:px-[10px] [&_span]:py-[2px] [&_span]:rounded-md";

export const useTableInfo = () => {
  const router = useRouter();
  const pathname = usePathname();

  const onClick = () => router.push(pathname + "/reg1");

  // Services table header
  const tableHeaders = [
    "S/N",
    "BUSINESS NAME",
    "STATUS",
    "SERVICE TYPE",
    "DATE",
  ];

  // Services table body
  const tableBody = [
    {
      rowProps: { onClick },
      rowInfo: [
        { text: "01" },
        { text: "Sayo oil and gas" },
        {
          text: "Submitted",
          cellProps: {
            className: cn(
              cellClassName,
              "[&_span]:bg-success [&_span]:text-success-foreground"
            ),
          },
        },
        { text: "Manage" },
        { text: "April 23, 2021" },
      ],
    },
    {
      rowProps: { onClick },
      rowInfo: [
        { text: "01" },
        { text: "Sayo oil and gas" },
        {
          text: "Submitted",
          cellProps: {
            className: cn(
              cellClassName,
              "[&_span]:bg-success [&_span]:text-success-foreground"
            ),
          },
        },
        { text: "Manage" },
        { text: "April 23, 2021" },
      ],
    },
    {
      rowProps: { onClick },
      rowInfo: [
        { text: "01" },
        { text: "Sayo oil and gas" },
        {
          text: "Done",
          cellProps: {
            className: cn(
              cellClassName,
              "[&_span]:bg-primary/20 [&_span]:text-primary"
            ),
          },
        },
        { text: "Manage" },
        { text: "April 23, 2021" },
      ],
    },
    {
      rowProps: { onClick },
      rowInfo: [
        { text: "01" },
        { text: "Sayo oil and gas" },
        {
          text: "In progress",
          cellProps: {
            className: cn(
              cellClassName,
              "[&_span]:bg-secondary/20 [&_span]:text-secondary"
            ),
          },
        },
        { text: "Manage" },
        { text: "April 23, 2021" },
      ],
    },
    {
      rowProps: { onClick },
      rowInfo: [
        { text: "01" },
        { text: "Sayo oil and gas" },
        {
          text: "Submitted",
          cellProps: {
            className: cn(
              cellClassName,
              "[&_span]:bg-primary/20 [&_span]:text-primary"
            ),
          },
        },
        { text: "Manage" },
        { text: "April 23, 2021" },
      ],
    },
    {
      rowProps: { onClick },
      rowInfo: [
        { text: "01" },
        { text: "Sayo oil and gas" },
        {
          text: "Submitted",
          cellProps: {
            className: cn(
              cellClassName,
              "[&_span]:bg-primary/20 [&_span]:text-primary"
            ),
          },
        },
        { text: "Manage" },
        { text: "April 23, 2021" },
      ],
    },
  ];

  return {
    tableHeaders,
    tableBody,
  };
};
