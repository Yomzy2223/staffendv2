import useServiceApi from "@/hooks/useServiceApi";
import { useParams, useSearchParams } from "next/navigation";
import slugify from "slugify";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { IRequest, IServiceFull, IUser } from "@/hooks/api/types";
import useRequestApi from "@/hooks/useRequestApi";
import {
  IRowInfo,
  ITableBody,
} from "@/components/tables/generalTable/constants";
import {
  differenceInDays,
  differenceInMonths,
  endOfMonth,
  format,
  isAfter,
  isBefore,
  isLeapYear,
  isSameMonth,
  isSameYear,
  isValid,
  isWithinInterval,
  startOfMonth,
  subMonths,
} from "date-fns";
import { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import useUserApi from "@/hooks/useUserApi";
import { allMonths, allYears } from "./constants";

export const useRouteActions = () => {
  const { getAllServicesQuery } = useServiceApi();
  const { data } = getAllServicesQuery;
  const services = data?.data?.data;

  const { serviceId } = useParams();

  const getServicesRoute = () => {
    if (services) {
      return services.map((service: IServiceFull) => ({
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

// Dashboard Overview Actions
export const useOverviewActions = () => {
  const [monthFrom, setMonthFrom] = useState("");
  const [monthTo, setMonthTo] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [selectedService, setSelectedService] = useState("");

  const { getAllUsersQuery } = useUserApi();
  const usersResponse = getAllUsersQuery;
  const users =
    usersResponse.data?.data?.data?.map(
      (el: IUser) => !el.isStaff && !el.isPartner
    ) || [];

  const { getAllServicesQuery } = useServiceApi();
  const servicesResponse = getAllServicesQuery;
  const services =
    servicesResponse.data?.data?.data?.map((el: IServiceFull) => el?.name) ||
    [];

  const { useGetServiceRequestQuery } = useRequestApi();
  const requestsResponse = useGetServiceRequestQuery(
    selectedService || services?.[0]
  );
  const requests = requestsResponse.data?.data?.data;

  // Date range selected
  let dateFrom = new Date(monthFrom + " " + yearFrom);
  let dateTo = new Date(monthTo + " " + yearTo);

  if (!monthFrom || !yearFrom) dateFrom = startOfMonth(new Date());
  if (!monthTo || !yearTo) dateTo = new Date();

  // Update currentTo and currentFrom when range is completely selected
  const rangeSelected = monthFrom && yearFrom && monthTo && yearTo;
  const currentTo = rangeSelected ? dateTo : new Date();
  const currentFrom = rangeSelected ? dateFrom : startOfMonth(new Date());

  let monthsDiff = differenceInMonths(dateTo, dateFrom) + 1; // Complements for the last month
  if (!rangeSelected) monthsDiff = 1;

  // Return all requests if filters are not completely selected, filter otherwise
  const filteredRequests = requests?.filter((el: IRequest) =>
    isWithinInterval(new Date(el.createdat), {
      start: currentFrom,
      end: currentTo,
    })
  );

  // Return last month requests if filters are not completely selected, filter otherwise
  const requestsVs = requests?.filter((el: IRequest) =>
    isWithinInterval(new Date(el.createdat), {
      // Same months difference (with selected range) backwards
      start: subMonths(currentFrom, monthsDiff),
      end: subMonths(currentTo, monthsDiff),
    })
  );

  // The requests within the selected date range
  const requestsByStatus = {
    draft: filteredRequests?.filter(
      (el: IRequest) => el.requeststatus === "PENDING"
    ),
    paidDraft: filteredRequests?.filter(
      (el: IRequest) => el.requeststatus === "PENDING" && el.paid
    ),
    submitted: filteredRequests?.filter(
      (el: IRequest) => el.requeststatus === "SUBMITTED"
    ),
    inProgress: filteredRequests?.filter(
      (el: IRequest) =>
        el.requeststatus === "ASSIGNED" || el.requeststatus === "REJECTED"
    ),
    completed: filteredRequests?.filter(
      (el: IRequest) => el.requeststatus === "COMPLETED"
    ),
  };

  // The requests to be compared with
  const requestsVsByStatus = {
    draft: requestsVs?.filter((el: IRequest) => el.requeststatus === "PENDING"),
    paidDraft: requestsVs?.filter(
      (el: IRequest) => el.requeststatus === "PENDING" && el.paid
    ),
    submitted: requestsVs?.filter(
      (el: IRequest) => el.requeststatus === "SUBMITTED"
    ),
    inProgress: requestsVs?.filter(
      (el: IRequest) =>
        el.requeststatus === "ASSIGNED" || el.requeststatus === "REJECTED"
    ),
    completed: requestsVs?.filter(
      (el: IRequest) => el.requeststatus === "COMPLETED"
    ),
  };

  // Return the months in a specified year, up until the current month
  const getMonthsInYear = (year: string, startDate?: string) => {
    return [
      `${startDate || "31"}, Jan`,
      `${startDate ? "01" : isLeapYear(yearTo) ? "29" : "28"}, Feb`,
      `${startDate || "31"}, Mar`,
      `${startDate || "30"}, Apr`,
      `${startDate || "31"}, May`,
      `${startDate || "30"}, Jun`,
      `${startDate || "31"}, Jul`,
      `${startDate || "31"}, Aug`,
      `${startDate || "30"}, Sep`,
      `${startDate || "31"}, Oct`,
      `${startDate || "30"}, Nov`,
      `${startDate || "31"}, Dec`,
    ].filter((el) =>
      year
        ? differenceInDays(new Date(el + " " + year), new Date()) <= 0 || // Filter out months greater than current date
          isSameMonth(new Date(el + " " + year), new Date())
        : true
    );
  };

  const allMonthsStart = getMonthsInYear(yearFrom, "01");

  // Conditionally generates the months
  const allMonthsEnd = getMonthsInYear(yearTo)
    .map((el) =>
      yearTo // Update the date of the current month if current year is selected
        ? isSameMonth(new Date(el + " " + yearTo), new Date())
          ? new Date().getDate().toString().padStart(2, "0") + el.slice(2)
          : el
        : el
    )
    ?.filter((el) =>
      monthFrom && yearFrom && yearTo
        ? isAfter(new Date(el + " " + yearTo), dateFrom) // Return  only months after the selected date from
        : true
    );

  const years = allYears?.filter(
    (el) => parseInt(el) <= new Date().getFullYear() // Filter out years greater than the current year
  );
  const yearsEnd = years.filter(
    (el) => (yearFrom ? parseInt(el) >= parseInt(yearFrom) : true) // Filter out years less than the selected year from
  );

  return {
    monthFrom,
    setMonthFrom,
    monthTo,
    setMonthTo,
    yearFrom,
    setYearFrom,
    yearTo,
    setYearTo,
    selectedService,
    setSelectedService,
    users,
    servicesResponse,
    services,
    requestsByStatus,
    requestsVsByStatus,
    allMonthsStart,
    allMonthsEnd,
    years,
    yearsEnd,
    monthsDiff,
    currentFrom,
    currentTo,
  };
};

// Table information
export const useTableInfo = ({
  setOpen,
  setSelectedRequests,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedRequests: Dispatch<SetStateAction<string[]>>;
}) => {
  const { getReqStatusColor } = useGlobalFunctions();

  const router = useRouter();
  const searchParams = useSearchParams();

  const { getAllServicesQuery } = useServiceApi();
  const services = getAllServicesQuery;
  const servicesData = services.data?.data?.data || [];

  const selectedServiceId =
    searchParams.get("serviceId") || servicesData[0]?.id;

  const {
    useGetServiceRequestQuery,
    assignRequestMutation,
    getAllRequestsQuery,
  } = useRequestApi();
  const serviceRequests = useGetServiceRequestQuery(selectedServiceId);
  const allRequests = getAllRequestsQuery;

  const allRequestsData = allRequests.data?.data?.data;
  const serviceRequestsData = serviceRequests.data?.data?.data;

  const serviceTableNav = servicesData?.map((service: IServiceFull) => ({
    name: "serviceId",
    value: service.id,
    text: service.name,
  }));

  const handleClick = (
    e: MouseEvent<HTMLTableRowElement>,
    rowId: string,
    rowInfo: IRowInfo[]
  ) => {
    router.push(`/services/request/${rowId}`);
  };

  const handleAssignClick = (
    e: MouseEvent<HTMLTableCellElement>,
    rowId: string,
    text: string
  ) => {
    e.stopPropagation();
    setOpen(true);
    setSelectedRequests([rowId]);
  };
  // Services table header
  const tableHeaders = [
    "S/N",
    "BUSINESS NAME",
    "PRODUCT NAME",
    "STATUS",
    "CURRENT STATE",
    "PAYMENT STATUS",
    "DATE",
    "ACTION",
  ];

  // Services table body
  const tableBody =
    serviceRequestsData?.map(
      (request: IRequest, i: number): ITableBody => ({
        rowId: request.id,
        handleClick,
        rowInfo: [
          { text: i.toString().padStart(2, "0") },
          { text: request?.businessname || "" },
          { text: request?.servicename },
          {
            text: request.requeststatus,
            cellProps: {
              className: cn(
                cellClassName,
                getReqStatusColor(request.requeststatus)
              ),
            },
          },
          { text: request.currentState },
          { text: request.paid ? "Paid" : "Not Paid Yet" },
          { text: format(request.createdat, "MMMM dd, yyyy") },
          {
            text: "Assign",
            handleClick: handleAssignClick,
            cellProps: { className: "text-primary underline" },
          },
        ],
      })
    ) || [];

  return {
    serviceTableNav,
    tableHeaders,
    tableBody,
    assignRequestMutation,
  };
};

const cellClassName =
  "[&_span]:bg-yellow-300 [&_span]:px-[10px] [&_span]:py-[2px] [&_span]:rounded-md  text-xs";
