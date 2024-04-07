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
import { format } from "date-fns";
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
  const { getAllUsersQuery } = useUserApi();
  const { data } = getAllUsersQuery;
  const users = data?.data?.data?.map(
    (el: IUser) => !el.isStaff && !el.isPartner
  );

  return {
    users,
  };
};

// Table information
export const useTableInfo = ({
  setOpen,
  selectedPartnerId,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedPartnerId: string;
}) => {
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);

  const { getReqStatusColor } = useGlobalFunctions();

  const router = useRouter();
  const searchParams = useSearchParams();

  const { getAllUsersQuery } = useUserApi();
  const users = getAllUsersQuery;
  const usersData = users.data?.data?.data;
  const partners = usersData?.filter((el: IUser) => !el.isPartner);

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

  const handleAssignRequests = () => {
    assignRequestMutation.mutate(
      {
        formInfo: {
          userId: selectedPartnerId,
          requestIds: selectedRequests,
        },
      },
      {
        onSuccess: () => {
          setSelectedRequests([]);
          setOpen(false);
        },
      }
    );
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
    partners,
    selectedRequests,
    handleAssignRequests,
    assignRequestMutation,
  };
};

const cellClassName =
  "[&_span]:bg-yellow-300 [&_span]:px-[10px] [&_span]:py-[2px] [&_span]:rounded-md  text-xs";
