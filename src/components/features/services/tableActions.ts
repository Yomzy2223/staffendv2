import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
  IRowInfo,
  ITableBody,
} from "@/components/tables/generalTable/constants";
import { compareAsc, format } from "date-fns";
import { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { useGetAllServicesQuery } from "@/services/service";
import {
  useAssignRequestMutation,
  useGetAllRequestsQuery,
  useGetServiceRequestsQuery,
  useSearchRequestMutation,
  useUnAssignRequestMutation,
} from "@/services/request";

// Table information
export const useTableActions = ({
  setOpenAssign,
  setOpenUnAssign,
  setOpenInfo,
  setSelectedRequests,
  setPartnerId,
  itemsPerPage,
  activeStatus,
  dateFrom,
  dateTo,
  setPreview,
}: {
  setOpenAssign: Dispatch<SetStateAction<boolean>>;
  setOpenUnAssign: Dispatch<SetStateAction<boolean>>;
  setOpenInfo: Dispatch<SetStateAction<boolean>>;
  setSelectedRequests: Dispatch<SetStateAction<string[]>>;
  setPartnerId: Dispatch<SetStateAction<string>>;
  itemsPerPage: number;
  activeStatus: string;
  dateFrom: Date;
  dateTo: Date;
  setPreview: Dispatch<SetStateAction<string>>;
}) => {
  const [searchValue, setSearchValue] = useState("");

  const { getReqStatusColor, deleteQueryStrings, isDesktop } =
    useGlobalFunctions();

  const router = useRouter();
  const searchParams = useSearchParams();

  const services = useGetAllServicesQuery();
  const servicesData = services.data?.data?.data || [];

  const selectedServiceId = searchParams.get("serviceId");
  const tablePage = parseInt(searchParams.get("page") || "1");

  const assignRequestMutation = useAssignRequestMutation();
  const unAssignRequestMutation = useUnAssignRequestMutation();
  const searchRequestMutation = useSearchRequestMutation();
  const allRequestsResponse = useGetAllRequestsQuery({
    page: tablePage,
    pageSize: itemsPerPage,
    startDate: format(dateFrom, "yyyy-MM-dd"),
    endDate: format(dateTo, "yyyy-MM-dd"),
  });
  const serviceRequestsResponse = useGetServiceRequestsQuery({
    serviceId: selectedServiceId || "",
    page: tablePage,
    pageSize: itemsPerPage,
    startDate: format(dateFrom, "yyyy-MM-dd"),
    endDate: format(dateTo, "yyyy-MM-dd"),
  });

  const allRequests = allRequestsResponse.data?.data;
  const serviceRequests = serviceRequestsResponse.data?.data;
  const searchRequests = searchRequestMutation.data?.data;

  const requests = searchValue
    ? searchRequests?.data
    : selectedServiceId
    ? serviceRequests?.data
    : allRequests?.data;

  const totalRequests = searchValue
    ? searchRequests?.total
    : selectedServiceId
    ? serviceRequests?.total
    : allRequests?.total;

  const requestsLoading =
    allRequestsResponse.isLoading ||
    serviceRequestsResponse.isLoading ||
    searchRequestMutation.isPending;

  let filteredRequests = requests
    ?.sort((a, b) => compareAsc(new Date(b?.createdAt), new Date(a?.createdAt)))
    ?.filter((request) => {
      if (!activeStatus) return true;
      if (activeStatus.toLowerCase() === "unpaid drafts")
        return request.status === "PENDING" && !request.paid;
      else if (activeStatus.toLowerCase() === "paid drafts")
        return request.status === "PENDING" && request.paid;
      else if (activeStatus.toLowerCase() === "submitted")
        return request.status === "SUBMITTED";
      else if (activeStatus.toLowerCase() === "assigned")
        return request.status === "ASSIGNED";
      else if (activeStatus.toLowerCase() === "rejected")
        return request.status === "REJECTED";
      else if (activeStatus.toLowerCase() === "in progress")
        return request.status === "ASSIGNED";
      else if (activeStatus.toLowerCase() === "completed")
        return request.status === "COMPLETED";
    });

  // filteredRequests = requests?.filter((el: IRequest) =>
  //   isWithinInterval(new Date(el.createdAt), {
  //     start: dateFrom,
  //     end: dateTo,
  //   })
  // );

  const serviceTableNav = servicesData?.map((service) => ({
    name: "serviceId",
    value: service.id,
    text: service.name,
  }));

  const handleSearchChange = (value: string) => {
    searchRequestMutation.mutate(
      {
        formInfo: { queryString: value, serviceId: selectedServiceId || "" },
        page: tablePage,
        pageSize: itemsPerPage,
      },
      {
        onSuccess: () => deleteQueryStrings(["page"]),
      }
    );
    setSearchValue(value);
  };

  const handleSearchSubmit = (value: string) => {
    setSearchValue(value);
  };

  const handleClick = (
    e: MouseEvent<HTMLTableRowElement>,
    rowId: string,
    rowInfo: IRowInfo[]
  ) => {
    isDesktop ? setPreview(rowId) : router.push(`/services/requests/${rowId}`);
  };

  const handleAssignClick = (
    e: MouseEvent<HTMLTableCellElement>,
    rowId: string,
    text: string
  ) => {
    e.stopPropagation();
    setOpenAssign(true);
    setSelectedRequests([rowId]);
  };

  const handleUnAssignClick = (
    e: MouseEvent<HTMLTableCellElement>,
    rowId: string,
    text: string
  ) => {
    e.stopPropagation();
    setOpenUnAssign(true);
    setSelectedRequests([rowId]);
    setPartnerId(
      requests?.find((el) => el.id === rowId)?.partnerInCharge || ""
    );
  };

  const handleViewClick = (
    e: MouseEvent<HTMLTableCellElement>,
    rowId: string,
    text: string
  ) => {
    e.stopPropagation();
    setOpenInfo(true);
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
    filteredRequests?.map((request, i: number): ITableBody => {
      const assigned = request.status === "ASSIGNED";
      const completed = request.status === "COMPLETED";
      const assignable =
        request.status === "SUBMITTED" || request.status === "REJECTED";

      let actionText = "";
      if (assignable) actionText = "Assign";
      if (request.status === "PENDING") actionText = "Not submitted yet";
      if (assigned) actionText = "Unassign";
      if (completed) actionText = "Partner info";

      const currentNumber = (tablePage - 1) * itemsPerPage + i + 1;

      return {
        rowId: request.id,
        handleClick,
        rowInfo: [
          {
            text: currentNumber.toString().padStart(2, "0"),
          },
          { text: request?.companyName || "No registered name" },
          { text: request?.serviceName },
          {
            text: request.status,
            cellProps: {
              className: cn(cellClassName, getReqStatusColor(request.status)),
            },
          },
          { text: request.currentState },
          { text: request.paid ? "Paid" : "Not Paid Yet" },
          { text: format(request.createdAt, "MMMM dd, yyyy") },
          {
            text: actionText,
            handleClick: assignable
              ? handleAssignClick
              : assigned
              ? handleUnAssignClick
              : completed
              ? handleViewClick
              : (e) => {
                  e.stopPropagation();
                },
            cellProps: {
              className: cn(" text-foreground-5 italic", {
                "text-primary underline not-italic":
                  assignable || assigned || completed,
              }),
            },
          },
        ],
      };
    }) || [];

  return {
    serviceTableNav,
    tableHeaders,
    tableBody,
    assignRequestMutation,
    unAssignRequestMutation,
    totalRequests,
    handleSearchChange,
    handleSearchSubmit,
    requestsLoading,
  };
};

const cellClassName =
  "[&_span]:bg-yellow-300 [&_span]:px-[10px] [&_span]:py-[2px] [&_span]:rounded-md  text-xs";
