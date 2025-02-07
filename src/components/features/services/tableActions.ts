import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { IRowInfo, ITableBody } from "@/components/tables/generalTable/constants";
import { format } from "date-fns";
import { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from "react";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { useGetAllServicesQuery } from "@/services/service";
import {
  useAssignRequestMutation,
  useGetAllRequestsQuery,
  useGetSearchRequestQuery,
  useGetServiceRequestsQuery,
  useUnAssignRequestMutation,
} from "@/services/request";

// Table information
export const useTableActions = ({
  activeServiceId,
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
  basePath,
}: {
  activeServiceId?: string;
  setOpenAssign: Dispatch<SetStateAction<boolean>>;
  setOpenUnAssign: Dispatch<SetStateAction<boolean>>;
  setOpenInfo: Dispatch<SetStateAction<boolean>>;
  setSelectedRequests: Dispatch<SetStateAction<string[]>>;
  setPartnerId: Dispatch<SetStateAction<string>>;
  itemsPerPage: number;
  activeStatus: string;
  dateFrom?: Date;
  dateTo?: Date;
  setPreview: Dispatch<SetStateAction<string>>;
  basePath: string;
}) => {
  const [searchValue, setSearchValue] = useState("");

  const { getReqStatusColor, deleteQueryStrings, isDesktop, setQueriesWithPath } =
    useGlobalFunctions();

  const searchParams = useSearchParams();

  const services = useGetAllServicesQuery();
  const servicesData = services.data?.data?.data || [];

  const selectedServiceId = searchParams.get("serviceId") || activeServiceId || "";
  const tablePage = parseInt(searchParams.get("page") || "1");

  const assignRequestMutation = useAssignRequestMutation();
  const unAssignRequestMutation = useUnAssignRequestMutation();
  const searchRequestQuery = useGetSearchRequestQuery({
    queryString: searchValue,
    page: tablePage,
    pageSize: itemsPerPage,
    startDate: dateFrom ? format(dateFrom, "yyyy-MM-dd") : "",
    endDate: dateTo ? format(dateTo, "yyyy-MM-dd") : "",
    serviceId: selectedServiceId,
  });

  const allRequestsResponse = useGetAllRequestsQuery({
    page: tablePage,
    pageSize: itemsPerPage,
    startDate: dateFrom ? format(dateFrom, "yyyy-MM-dd") : "",
    endDate: dateTo ? format(dateTo, "yyyy-MM-dd") : "",
    disabled: !!selectedServiceId,
  });
  const serviceRequestsResponse = useGetServiceRequestsQuery({
    serviceId: selectedServiceId || "",
    page: tablePage,
    pageSize: itemsPerPage,
    startDate: dateFrom ? format(dateFrom, "yyyy-MM-dd") : "",
    endDate: dateTo ? format(dateTo, "yyyy-MM-dd") : "",
  });

  const allRequests = allRequestsResponse.data?.data;
  const serviceRequests = serviceRequestsResponse.data?.data;
  const searchRequests = searchRequestQuery.data?.data;

  const requests =
    searchValue || activeStatus
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
    searchRequestQuery.isLoading;

  const requestsErrorMsg =
    allRequestsResponse.error?.message ||
    serviceRequestsResponse.error?.message ||
    searchRequestQuery.error?.message;

  const serviceTableNav = servicesData?.map((service) => ({
    name: "serviceId",
    value: service.id,
    text: service.name,
  }));

  const handleSearch = (value?: string) => {
    if (!value) return;
    setSearchValue(value);
  };

  useEffect(() => {
    if (searchRequestQuery.isSuccess) deleteQueryStrings(["page"]);
  }, [searchRequestQuery.isSuccess, searchValue]);

  const handleSearchChange = (value: string) => {
    handleSearch(value);
    setSearchValue(value);
  };

  const handleSearchSubmit = (value: string) => {
    setSearchValue(value);
  };

  const handleClick = (e: MouseEvent<HTMLTableRowElement>, rowId: string, rowInfo: IRowInfo[]) => {
    isDesktop ? setPreview(rowId) : goToDetailsPage(rowId);
  };

  const goToDetailsPage = (rowId: string) => {
    setQueriesWithPath({
      path: `/services/requests/${rowId}`,
      queries: [{ name: "basePath", value: basePath }],
    });
  };

  const handleAssignClick = (e: MouseEvent<HTMLTableCellElement>, rowId: string, text: string) => {
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
    setPartnerId(requests?.find((el) => el.id === rowId)?.partnerInCharge || "");
  };

  const handleViewClick = (e: MouseEvent<HTMLTableCellElement>, rowId: string, text: string) => {
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
    requests?.map((request, i: number): ITableBody => {
      const assigned = request.status === "ASSIGNED";
      const completed = request.status === "COMPLETED";
      const assignable = request.status === "SUBMITTED" || request.status === "REJECTED";

      let actionText = "";
      if (assignable) actionText = "Assign";
      if (request.status === "PENDING") actionText = "Not submitted yet";
      if (assigned) actionText = "Unassign";
      if (request.status === "ACCEPTED") actionText = "Processing...";
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
                "text-primary underline not-italic": assignable || assigned || completed,
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
    requestsErrorMsg,
    handleSearch,
    goToDetailsPage,
  };
};

const cellClassName =
  "[&_span]:bg-yellow-300 [&_span]:px-[10px] [&_span]:py-[2px] [&_span]:rounded-md  text-xs";
