import { useGlobalFunctions } from "./globalFunctions";
import { useResponse } from "./useResponse";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteRequest,
  getRequest,
  getAllRequests,
  updateRequest,
  getServiceRequests,
} from "./api/requestApi";

const useRequestApi = () => {
  const { handleError, handleSuccess } = useResponse();
  const { setQuery } = useGlobalFunctions();
  const queryClient = useQueryClient();

  const updateRequestMutation = useMutation({
    mutationFn: updateRequest,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["request"] });
    },
    retry: 3,
  });

  const deleteRequestMutation = useMutation({
    mutationFn: deleteRequest,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["request"] });
    },
    retry: 3,
  });

  const useGetRequestQuery = (id: string) =>
    useQuery({
      queryKey: ["request", id],
      queryFn: ({ queryKey }) => getRequest(queryKey[1]),
      enabled: id ? true : false,
    });

  const useGetServiceRequestQuery = (serviceId: string) =>
    useQuery({
      queryKey: ["request", serviceId],
      queryFn: ({ queryKey }) => getServiceRequests(queryKey[1]),
      enabled: serviceId ? true : false,
    });

  const getAllRequestsQuery = useQuery({
    queryKey: ["request"],
    queryFn: getAllRequests,
  });

  return {
    updateRequestMutation,
    deleteRequestMutation,
    useGetRequestQuery,
    useGetServiceRequestQuery,
    getAllRequestsQuery,
  };
};

export default useRequestApi;
