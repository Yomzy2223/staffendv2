import { IRequest } from "@/hooks/api/types";
import useRequestApi from "@/hooks/useRequestApi";
import { isSameMonth, subMonths } from "date-fns";

export const useActions = ({ serviceId }: { serviceId: string }) => {
  const { useGetServiceRequestQuery } = useRequestApi();
  const request = useGetServiceRequestQuery(serviceId as string);

  const requestsData: IRequest[] = request.data?.data?.data;

  const pendingRequests = requestsData?.filter(
    (el: IRequest) => el.requeststatus === "PENDING"
  );

  const submittedRequests = requestsData?.filter(
    (el: IRequest) => el.requeststatus === "SUBMITTED"
  );
  const completedRequests = requestsData?.filter(
    (el: IRequest) => el.requeststatus === "COMPLETED"
  );

  const thisMonthReq = {
    pending: pendingRequests?.filter((el: IRequest) =>
      isSameMonth(el.createdat, new Date())
    ),
    submitted: submittedRequests?.filter((el: IRequest) =>
      isSameMonth(el.submittedat, new Date())
    ),
    completed: completedRequests?.filter((el: IRequest) =>
      isSameMonth(el.completedat, new Date())
    ),
  };

  const lastMonthReq = {
    pending: pendingRequests?.filter((el: IRequest) =>
      isSameMonth(el.createdat, subMonths(new Date(), 1))
    ),
    submitted: submittedRequests?.filter((el: IRequest) =>
      isSameMonth(el.submittedat, subMonths(new Date(), 1))
    ),
    completed: completedRequests?.filter((el: IRequest) =>
      isSameMonth(el.completedat, subMonths(new Date(), 1))
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
