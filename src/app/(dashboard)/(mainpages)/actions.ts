import useServiceApi from "@/hooks/useServiceApi";
import { Service } from "custom-types";
import { useParams } from "next/navigation";
import slugify from "slugify";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

export const useActions = () => {
  const { getAllServicesQuery } = useServiceApi();
  const { data } = getAllServicesQuery;
  const services = data?.data?.data;

  const { serviceId } = useParams();

  const getServicesRoute = () => {
    if (services) {
      return services.map((service: Service) => ({
        name: service.name,
        to: `/services/${slugify(service.id)}`,
      }));
    }
  };

  // Dashboard navigation routes
  const navRoutes = [
    {
      name: "Home",
      to: "/",
    },
    {
      name: "Services",
      to: "/services",
      type: "select",
      options: getServicesRoute(),
      defaultValue:
        services?.find((el: any) => el.id === serviceId)?.name || "Services",
    },
    {
      name: "Countries",
      to: "/countries",
    },
    {
      name: "Hiring and Payroll",
      to: "/hiring-and-payroll",
    },
    {
      name: "Bank Accounts",
      to: "/bank-accounts",
    },
    {
      name: "Rewards",
      to: "/rewards",
    },
    {
      name: "Promocodes",
      to: "/promocodes",
    },
    {
      name: "User management",
      to: "/user-management",
    },
    {
      name: "Payment",
      to: "/payment",
    },
    {
      name: "Resources",
      to: "/promocodes",
    },
    {
      name: "Partners",
      to: "/partners",
    },
  ];

  return { navRoutes };
};

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
