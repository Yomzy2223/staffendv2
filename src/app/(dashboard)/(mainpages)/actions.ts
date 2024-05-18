import {
  compareAsc,
  differenceInDays,
  format,
  isWithinInterval,
  subDays,
} from "date-fns";
import useUserApi from "@/hooks/useUserApi";
import { useParams } from "next/navigation";
import slugify from "slugify";
import { useGetAllServicesQuery } from "@/services/service";
import { useGetServiceRequestsQuery } from "@/services/request";
import { TRequestAll } from "@/services/request/types";

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
  const { useGetAllUsersQuery } = useUserApi();
  const usersResponse = useGetAllUsersQuery({});
  const users = usersResponse.data?.data?.data || [];

  const servicesRes = useGetAllServicesQuery();
  const services = servicesRes.data?.data?.data || [];
  const servicesNames = services?.map((el) => el?.name);
  const activeService = services?.find(
    (el) => el.name === (selectedService || servicesNames?.[0])
  );

  // Return filtered requests
  const requestsRes = useGetServiceRequestsQuery({
    serviceId: activeService?.id || "",
    startDate: dateFrom ? format(dateFrom, "yyyy-MM-dd") : "",
    endDate: dateTo ? format(dateTo, "yyyy-MM-dd") : "",
  });
  const requests = requestsRes.data?.data?.data;

  // Return filtered requests
  const requestsVsRes = useGetServiceRequestsQuery({
    serviceId: activeService?.id || "",
    startDate: compareFrom ? format(compareFrom, "yyyy-MM-dd") : "",
    endDate: compareTo ? format(compareTo, "yyyy-MM-dd") : "",
  });
  const requestsVs = requestsVsRes.data?.data?.data;

  // The requests within the selected date range
  const requestsByStatus: IReq = {
    all: requests || [],
    unPaidDrafts:
      requests?.filter((el) => el.status === "PENDING" && !el.paid) || [],
    paidDrafts:
      requests?.filter((el) => el.status === "PENDING" && el.paid) || [],
    submitted: requests?.filter((el) => el.status === "SUBMITTED") || [],
    inProgress:
      requests?.filter(
        (el) => el.status === "ASSIGNED" || el.status === "REJECTED"
      ) || [],
    completed: requests?.filter((el) => el.status === "COMPLETED") || [],
  };

  // The requests to be compared with
  const requestsVsByStatus: IReq = {
    all: requestsVs || [],
    unPaidDrafts: requestsVs?.filter((el) => el.paid) || [],
    paidDrafts:
      requestsVs?.filter((el) => el.status === "PENDING" && el.paid) || [],
    submitted: requestsVs?.filter((el) => el.status === "SUBMITTED") || [],
    inProgress:
      requestsVs?.filter(
        (el) => el.status === "ASSIGNED" || el.status === "REJECTED"
      ) || [],
    completed: requestsVs?.filter((el) => el.status === "COMPLETED") || [],
  };

  const getDateData = (reqs?: TRequestAll[], from?: Date, to?: Date) => {
    const sortedReqs = reqs?.sort((a, b) =>
      compareAsc(a?.createdAt, b?.createdAt)
    );
    const daysDiff = to && from ? differenceInDays(to, from) + 1 : 0; // Complements for the last day
    const firstDate = new Date(sortedReqs?.[0]?.createdAt || "");
    const lastDate = new Date(
      sortedReqs?.[sortedReqs?.length - 1]?.createdAt || ""
    );
    const reqsDaysDiff =
      firstDate && lastDate ? differenceInDays(lastDate, firstDate) + 1 : 0;
    return {
      firstDate,
      lastDate,
      daysDiff: daysDiff ? daysDiff : reqsDaysDiff,
    };
  };

  return {
    activeService,
    servicesNames,
    servicesRes,
    users,
    requestsByStatus,
    requestsVsByStatus,
    reqsDateData: getDateData(requests, dateFrom, dateTo),
    compareDateData: getDateData(requestsVs, compareFrom, compareTo),
  };
};

// Route actions
export const useRouteActions = () => {
  const { data } = useGetAllServicesQuery();
  const services = data?.data?.data;

  const { serviceId } = useParams();

  const getServicesRoute = () => {
    if (services) {
      return services.map((service) => ({
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
      name: "FAQ",
      to: "/faq",
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

export interface IReq {
  unPaidDrafts: TRequestAll[];
  paidDrafts: TRequestAll[];
  submitted: TRequestAll[];
  inProgress: TRequestAll[];
  completed: TRequestAll[];
  all: TRequestAll[];
}
