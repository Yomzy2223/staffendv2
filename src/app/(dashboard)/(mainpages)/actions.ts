import { compareAsc, differenceInDays, format, isValid } from "date-fns";
import { useParams } from "next/navigation";
import slugify from "slugify";
import { useGetAllServicesQuery } from "@/services/service";
import { useGetAllRequestsQuery, useGetServiceRequestsQuery } from "@/services/request";
import { TRequestAll } from "@/services/request/types";
import { useGetAllUsersQuery } from "@/services/users";

// Requests Actions
export const useRequestActions = ({
  dateFrom,
  dateTo,
  compareFrom,
  compareTo,
  selectedService,
}: {
  dateFrom?: Date;
  dateTo?: Date;
  compareFrom?: Date;
  compareTo?: Date;
  selectedService: string;
}) => {
  const usersResponse = useGetAllUsersQuery({});
  const users = usersResponse.data?.data?.data || [];

  const servicesRes = useGetAllServicesQuery();
  const services = servicesRes.data?.data?.data || [];
  const servicesNames = services?.sort((a, b) => a.priority - b.priority)?.map((el) => el?.name);
  const activeService = services?.find((el) => el.name === selectedService);
  // (el) => el.name === (selectedService || servicesNames?.[0])

  const allRequestsRes = useGetAllRequestsQuery({
    startDate: dateFrom ? format(dateFrom, "yyyy-MM-dd") : "",
    endDate: dateTo ? format(dateTo, "yyyy-MM-dd") : "",
  });
  const allRequests = allRequestsRes.data?.data?.data;

  // Return filtered requests
  const servicesRequestsRes = useGetServiceRequestsQuery({
    serviceId: activeService?.id || "",
    startDate: dateFrom ? format(dateFrom, "yyyy-MM-dd") : "",
    endDate: dateTo ? format(dateTo, "yyyy-MM-dd") : "",
  });

  const servicesRequests = servicesRequestsRes.data?.data?.data;

  const requests = activeService ? servicesRequests : allRequests;

  const allRequestsVsRes = useGetAllRequestsQuery({
    startDate: compareFrom ? format(compareFrom, "yyyy-MM-dd") : "",
    endDate: compareTo ? format(compareTo, "yyyy-MM-dd") : "",
  });
  const allRequestsVs = allRequestsVsRes.data?.data?.data;

  // Return filtered requests
  const servicesRequestsVsRes = useGetServiceRequestsQuery({
    serviceId: activeService?.id || "",
    startDate: compareFrom ? format(compareFrom, "yyyy-MM-dd") : "",
    endDate: compareTo ? format(compareTo, "yyyy-MM-dd") : "",
  });
  const servicesRequestsVs = servicesRequestsVsRes.data?.data?.data;

  const requestsVs = activeService ? servicesRequestsVs : allRequestsVs;

  // The requests within the selected date range
  const requestsByStatus: IReq = {
    all: requests || [],
    allPaid: requests?.filter((el) => el.paid) || [],
    unPaidDrafts: requests?.filter((el) => el.status === "PENDING" && !el.paid) || [],
    paidDrafts: requests?.filter((el) => el.status === "PENDING" && el.paid) || [],
    submitted: requests?.filter((el) => el.status === "SUBMITTED") || [],
    inProgress:
      requests?.filter((el) => el.status === "ASSIGNED" || el.status === "REJECTED") || [],
    completed: requests?.filter((el) => el.status === "COMPLETED") || [],
  };

  // The requests to be compared with
  const requestsVsByStatus: IReq = {
    all: requestsVs || [],
    allPaid: requestsVs?.filter((el) => el.paid) || [],
    unPaidDrafts: requestsVs?.filter((el) => el.paid) || [],
    paidDrafts: requestsVs?.filter((el) => el.status === "PENDING" && el.paid) || [],
    submitted: requestsVs?.filter((el) => el.status === "SUBMITTED") || [],
    inProgress:
      requestsVs?.filter((el) => el.status === "ASSIGNED" || el.status === "REJECTED") || [],
    completed: requestsVs?.filter((el) => el.status === "COMPLETED") || [],
  };

  const getDateData = (reqs?: TRequestAll[], from?: Date, to?: Date) => {
    const sortedReqs = reqs?.sort((a, b) => compareAsc(a?.createdAt, b?.createdAt)) || [];
    const daysDiff = to && from ? differenceInDays(to, from) + 1 : 0; // 1 complements for the last day
    const firstDate = new Date(sortedReqs?.[0]?.createdAt);
    const lastDate = new Date(sortedReqs?.[sortedReqs?.length - 1]?.createdAt);
    const reqsDaysDiff = firstDate && lastDate ? differenceInDays(lastDate, firstDate) + 1 : 0;

    return {
      firstDate: isValid(firstDate) ? firstDate : new Date(),
      lastDate: isValid(lastDate) ? lastDate : new Date(),
      daysDiff: daysDiff ? daysDiff : reqsDaysDiff,
    };
  };

  const requestsLoading = allRequestsRes.isLoading || servicesRequestsRes.isLoading;
  const requestsVsLoading = allRequestsVsRes.isLoading || servicesRequestsVsRes.isLoading;

  return {
    activeService,
    servicesNames,
    servicesRes,
    users,
    requestsByStatus,
    requestsVsByStatus,
    reqsDateData: getDateData(requests, dateFrom, dateTo),
    compareDateData: getDateData(requestsVs, compareFrom, compareTo),
    requestsLoading,
    requestsVsLoading,
  };
};

// Dashboard navigation routes
export const navRoutes = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "Services",
    to: "/services",
    type: "select",
  },
  {
    name: "Countries",
    to: "/countries",
  },
  {
    name: "FAQ",
    to: "/faq",
  },
  {
    name: "Partners",
    to: "/partners",
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
    to: "/resources",
  },
];

export interface IReq {
  all: TRequestAll[];
  unPaidDrafts: TRequestAll[];
  paidDrafts: TRequestAll[];
  submitted: TRequestAll[];
  inProgress: TRequestAll[];
  completed: TRequestAll[];
  allPaid: TRequestAll[];
}
