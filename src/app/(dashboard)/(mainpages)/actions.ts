import useServiceApi from "@/hooks/useServiceApi";
import { useParams } from "next/navigation";
import slugify from "slugify";
import { IRequest, IServiceFull } from "@/hooks/api/types";
import useRequestApi from "@/hooks/useRequestApi";
import {
  differenceInDays,
  differenceInMonths,
  isAfter,
  isLeapYear,
  isSameMonth,
  isWithinInterval,
  startOfMonth,
  subMonths,
} from "date-fns";
import { useState } from "react";
import useUserApi from "@/hooks/useUserApi";
import { allYears } from "./constants";

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

//
//

// Dashboard Overview Actions
export const useOverviewActions = () => {
  const [monthFrom, setMonthFrom] = useState("");
  const [monthTo, setMonthTo] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [selectedService, setSelectedService] = useState("");

  const { useGetAllUsersQuery } = useUserApi();
  const usersResponse = useGetAllUsersQuery({});
  const users = usersResponse.data?.data?.data || [];

  const { getAllServicesQuery } = useServiceApi();
  const servicesResponse = getAllServicesQuery;
  const services = servicesResponse.data?.data?.data || [];
  const servicesNames = services?.map((el: IServiceFull) => el?.name);

  const selectedServiceId = services?.find(
    (el: IServiceFull) => el.name === selectedService || servicesNames?.[0]
  )?.id;

  const { useGetServiceRequestQuery } = useRequestApi();
  const requestsResponse = useGetServiceRequestQuery({
    serviceId: selectedServiceId,
  });
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
    isWithinInterval(new Date(el.createdAt), {
      start: currentFrom,
      end: currentTo,
    })
  );

  // Return last month requests if filters are not completely selected, filter otherwise
  const requestsVs = requests?.filter((el: IRequest) =>
    isWithinInterval(new Date(el.createdAt), {
      // Same months difference (with selected range) backwards
      start: subMonths(currentFrom, monthsDiff),
      end: subMonths(currentTo, monthsDiff),
    })
  );

  // The requests within the selected date range
  const requestsByStatus = {
    draft: filteredRequests?.filter((el: IRequest) => el.status === "PENDING"),
    paidDraft: filteredRequests?.filter(
      (el: IRequest) => el.status === "PENDING" && el.paid
    ),
    submitted: filteredRequests?.filter(
      (el: IRequest) => el.status === "SUBMITTED"
    ),
    inProgress: filteredRequests?.filter(
      (el: IRequest) => el.status === "ASSIGNED" || el.status === "REJECTED"
    ),
    completed: filteredRequests?.filter(
      (el: IRequest) => el.status === "COMPLETED"
    ),
  };

  // The requests to be compared with
  const requestsVsByStatus = {
    draft: requestsVs?.filter((el: IRequest) => el.status === "PENDING"),
    paidDraft: requestsVs?.filter(
      (el: IRequest) => el.status === "PENDING" && el.paid
    ),
    submitted: requestsVs?.filter((el: IRequest) => el.status === "SUBMITTED"),
    inProgress: requestsVs?.filter(
      (el: IRequest) => el.status === "ASSIGNED" || el.status === "REJECTED"
    ),
    completed: requestsVs?.filter((el: IRequest) => el.status === "COMPLETED"),
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
    servicesNames,
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
