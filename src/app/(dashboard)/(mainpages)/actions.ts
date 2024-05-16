import { differenceInDays, isWithinInterval, subDays } from "date-fns";
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
  selectedService,
}: {
  dateFrom: Date;
  dateTo: Date;
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

  const requestsResponse = useGetServiceRequestsQuery({
    serviceId: activeService?.id || "",
  });
  const requests = requestsResponse.data?.data?.data;

  let daysDiff = differenceInDays(dateTo, dateFrom) + 1; // Complements for the last day

  // Return filtered requests
  const filteredRequests = requests?.filter((el) =>
    isWithinInterval(new Date(el.createdAt), {
      start: dateFrom,
      end: dateTo,
    })
  );

  // Return filtered requests
  const requestsVs = requests?.filter((el) =>
    isWithinInterval(new Date(el.createdAt), {
      // Same days difference (with selected range) backwards
      start: subDays(dateFrom, daysDiff),
      end: subDays(dateTo, daysDiff),
    })
  );

  // The requests within the selected date range
  const requestsByStatus: IReq = {
    allPaid: filteredRequests?.filter((el) => el.paid) || [],
    unPaidDrafts:
      filteredRequests?.filter((el) => el.status === "PENDING" && !el.paid) ||
      [],
    paidDrafts:
      filteredRequests?.filter((el) => el.status === "PENDING" && el.paid) ||
      [],
    submitted:
      filteredRequests?.filter((el) => el.status === "SUBMITTED") || [],
    inProgress:
      filteredRequests?.filter(
        (el) => el.status === "ASSIGNED" || el.status === "REJECTED"
      ) || [],
    completed:
      filteredRequests?.filter((el) => el.status === "COMPLETED") || [],
  };

  // The requests to be compared with
  const requestsVsByStatus: IReq = {
    allPaid: filteredRequests?.filter((el) => el.paid) || [],
    unPaidDrafts:
      requestsVs?.filter((el) => el.status === "PENDING" && !el.paid) || [],
    paidDrafts:
      requestsVs?.filter((el) => el.status === "PENDING" && el.paid) || [],
    submitted: requestsVs?.filter((el) => el.status === "SUBMITTED") || [],
    inProgress:
      requestsVs?.filter(
        (el) => el.status === "ASSIGNED" || el.status === "REJECTED"
      ) || [],
    completed: requestsVs?.filter((el) => el.status === "COMPLETED") || [],
  };

  return {
    activeService,
    servicesNames,
    servicesRes,
    users,
    requestsByStatus,
    requestsVsByStatus,
    daysDiff,
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
  allPaid: TRequestAll[];
}
