import {
  useGetRequestQuery,
  useUnAssignRequestMutation,
} from "@/services/request";

export const useActions = ({ requestId }: { requestId: string }) => {
  const unAssignRequestMutation = useUnAssignRequestMutation();
  const requestResponse = useGetRequestQuery(requestId);
  const request = requestResponse.data?.data?.data;

  return {
    request,
    requestResponse,
    unAssignRequestMutation,
  };
};
