import useRequestApi from "@/hooks/useRequestApi";

export const useActions = ({ requestId }: { requestId: string }) => {
  const { useGetRequestQuery, unAssignRequestMutation } = useRequestApi();

  const requestResponse = useGetRequestQuery(requestId);
  const request = requestResponse.data?.data?.data;

  return {
    request,
    requestResponse,
    unAssignRequestMutation,
  };
};
