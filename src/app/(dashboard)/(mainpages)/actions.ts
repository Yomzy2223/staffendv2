import useServiceApi from "@/hooks/useServiceApi";
import { IRequest, IServiceFull } from "@/hooks/api/types";
import useRequestApi from "@/hooks/useRequestApi";
import { differenceInDays, isWithinInterval, subDays } from "date-fns";
import useUserApi from "@/hooks/useUserApi";
import { useParams } from "next/navigation";
import slugify from "slugify";

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

  const { getAllServicesQuery } = useServiceApi();
  const servicesRes = getAllServicesQuery;
  const services = servicesRes.data?.data?.data || [];
  const servicesNames = services?.map((el: IServiceFull) => el?.name);
  const serviceId = services?.find(
    (el: IServiceFull) => el.name === selectedService || servicesNames?.[0]
  )?.id;

  const { useGetServiceRequestQuery } = useRequestApi();
  const requestsResponse = useGetServiceRequestQuery({ serviceId });
  const requests = requestsResponse.data?.data?.data;

  //   let monthsDiff = differenceInMonths(dateTo, dateFrom) + 1; // Complements for the last month
  let daysDiff = differenceInDays(dateTo, dateFrom) + 1; // Complements for the last day

  // Return filtered requests
  const filteredRequests = requests?.filter((el: IRequest) =>
    isWithinInterval(new Date(el.createdAt), {
      start: dateFrom,
      end: dateTo,
    })
  );

  // Return filtered requests
  const requestsVs = requests?.filter((el: IRequest) =>
    isWithinInterval(new Date(el.createdAt), {
      // Same days difference (with selected range) backwards
      start: subDays(dateFrom, daysDiff),
      end: subDays(dateTo, daysDiff),
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

  return {
    servicesRes,
    users,
    requestsByStatus,
    requestsVsByStatus,
    daysDiff,
  };
};

// Route actions
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
