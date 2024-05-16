import { useGetServiceRequestsQuery } from "@/services/request";
import { isSameMonth, subMonths } from "date-fns";

export const useActions = ({ serviceId }: { serviceId: string }) => {
  const request = useGetServiceRequestsQuery({ serviceId: serviceId });

  const requestsData = request.data?.data?.data;

  const pendingRequests = requestsData?.filter((el) => el.status === "PENDING");

  const submittedRequests = requestsData?.filter(
    (el) => el.status === "SUBMITTED"
  );
  const completedRequests = requestsData?.filter(
    (el) => el.status === "COMPLETED"
  );

  const thisMonthReq = {
    pending: pendingRequests?.filter((el) =>
      isSameMonth(el.createdAt, new Date())
    ),
    submitted: submittedRequests?.filter((el) =>
      isSameMonth(el.submittedAt, new Date())
    ),
    completed: completedRequests?.filter((el) =>
      isSameMonth(el.completedAt, new Date())
    ),
  };

  const lastMonthReq = {
    pending: pendingRequests?.filter((el) =>
      isSameMonth(el.createdAt, subMonths(new Date(), 1))
    ),
    submitted: submittedRequests?.filter((el) =>
      isSameMonth(el.submittedAt, subMonths(new Date(), 1))
    ),
    completed: completedRequests?.filter((el) =>
      isSameMonth(el.completedAt, subMonths(new Date(), 1))
    ),
  };

  return {
    requestsData,
    pendingRequests,
    submittedRequests,
    completedRequests,
    thisMonthReq,
    lastMonthReq,
  };
};
