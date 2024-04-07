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
  endOfMonth,
  format,
  isAfter,
  isLeapYear,
  isSameMonth,
  isSameYear,
  isWithinInterval,
} from "date-fns";
import { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import useUserApi from "@/hooks/useUserApi";

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
  const [selecteService, setSelecteService] = useState("");

  const { getAllUsersQuery } = useUserApi();
  const usersResponse = getAllUsersQuery;
  const users = usersResponse.data?.data?.data?.map(
    (el: IUser) => !el.isStaff && !el.isPartner
  );

  const { getAllServicesQuery } = useServiceApi();
  const servicesResponse = getAllServicesQuery;
  const services = servicesResponse.data?.data?.data;

  const { getAllRequestsQuery } = useRequestApi();
  const requestsResponse = getAllRequestsQuery;
  const requests = requestsResponse.data?.data?.data;

  // Return all requests if filters are not completely selected, filter otherwise
  const filteredRequests =
    !monthFrom || !monthTo || !yearFrom || !yearTo
      ? requests
      : requests?.filter((el: IRequest) =>
          isWithinInterval(new Date(el.createdat), {
            start: new Date(monthFrom + " " + yearFrom),
            end: endOfMonth(new Date(monthTo + " " + yearTo)),
          })
        );

  console.log(filteredRequests);

  const allMonthsEnd = [
    "31, Jan",
    `${isLeapYear(yearTo) ? "29" : "28"}, Feb`,
    "31, Mar",
    "31, Apr",
    "31, May",
    "31, Jun",
    "31, Jul",
    "31, Aug",
    "31, Sep",
    "31, Oct",
    "31, Nov",
    "31, Dec",
  ].filter((el) =>
    monthFrom && yearFrom && yearTo
      ? isAfter(
          new Date(el + " " + yearTo),
          new Date(monthFrom + " " + yearFrom)
        )
      : true
  );

  const yearsEnd = ["2021", "2022", "2023", "2024", "2025", "2026"]?.filter(
    (el) => (yearFrom ? parseInt(el) >= parseInt(yearFrom) : true)
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
    selecteService,
    setSelecteService,
    users,
    services,
    filteredRequests,
    allMonthsEnd,
    yearsEnd,
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
