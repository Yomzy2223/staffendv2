import { IRequest } from "@/hooks/api/types";
import useRequestApi from "@/hooks/useRequestApi";
import { isSameMonth, subMonths } from "date-fns";

export const useActions = ({ serviceId }: { serviceId: string }) => {
  const { useGetServiceRequestQuery } = useRequestApi();
  const request = useGetServiceRequestQuery(serviceId as string);

  const requestsData: IRequest[] = request.data?.data?.data;

  const pendingRequests = requestsData?.filter(
    (el: IRequest) => el.status === "PENDING"
  );

  const submittedRequests = requestsData?.filter(
    (el: IRequest) => el.status === "SUBMITTED"
  );
  const completedRequests = requestsData?.filter(
    (el: IRequest) => el.status === "COMPLETED"
  );

  const thisMonthReq = {
    pending: pendingRequests?.filter((el: IRequest) =>
      isSameMonth(el.createdAt, new Date())
    ),
    submitted: submittedRequests?.filter((el: IRequest) =>
      isSameMonth(el.submittedAt, new Date())
    ),
    completed: completedRequests?.filter((el: IRequest) =>
      isSameMonth(el.completedAt, new Date())
    ),
  };

  const lastMonthReq = {
    pending: pendingRequests?.filter((el: IRequest) =>
      isSameMonth(el.createdAt, subMonths(new Date(), 1))
    ),
    submitted: submittedRequests?.filter((el: IRequest) =>
      isSameMonth(el.submittedAt, subMonths(new Date(), 1))
    ),
    completed: completedRequests?.filter((el: IRequest) =>
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
