import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useResponse } from "..";
import {
  assignRequest,
  completeRequest,
  deleteRequest,
  getAllRequests,
  getBusinessDetails,
  getRequest,
  getRequestBusiness,
  getRequestForm,
  getSearchRequest,
  getServiceRequests,
  unAssignRequest,
  updateBusinessInfo,
} from "./operations";
import { TAllReqPayload, TSearchReqArgs, TServiceReqPayload } from "./types";

export const useDeleteRequestMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRequest,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["request"] });
    },
  });
};

export const useGetRequestQuery = (id: string) =>
  useQuery({
    queryKey: ["request", id],
    queryFn: ({ queryKey }) => getRequest(queryKey[1]),
    enabled: !!id,
  });

export const useGetServiceRequestsQuery = (arg: TServiceReqPayload) =>
  useQuery({
    queryKey: ["request", arg],
    queryFn: ({ queryKey }) => getServiceRequests(queryKey[1] as TServiceReqPayload),
    enabled: !!arg.serviceId,
  });

export const useGetAllRequestsQuery = (arg: TAllReqPayload) =>
  useQuery({
    queryKey: ["request", arg],
    queryFn: ({ queryKey }) => getAllRequests(queryKey[1] as TAllReqPayload),
    enabled: !arg.disabled,
  });

export const useGetRequestFormQuery = (requestId: string) =>
  useQuery({
    queryKey: ["request", requestId],
    queryFn: ({ queryKey }) => getRequestForm(queryKey[1]),
    enabled: !!requestId,
  });

export const useGetBusinessDetailsQuery = (requestId: string) =>
  useQuery({
    queryKey: ["request", requestId],
    queryFn: ({ queryKey }) => getBusinessDetails(queryKey[1]),
    enabled: !!requestId,
  });

export const useAssignRequestMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: assignRequest,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["request"] });
    },
  });
};

export const useUnAssignRequestMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unAssignRequest,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["request"] });
    },
  });
};

export const useCompleteRequestMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completeRequest,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["request"] });
    },
  });
};

export const useGetSearchRequestQuery = (args: TSearchReqArgs) =>
  useQuery({
    queryKey: ["request", args],
    queryFn: ({ queryKey }) => getSearchRequest(queryKey[1] as TSearchReqArgs),
    enabled: !!args.queryString,
  });

export const useGetRequestBusinessQuery = ({ requestId }: { requestId: string }) => {
  return useQuery({
    queryKey: ["request", requestId],
    queryFn: ({ queryKey }) => getRequestBusiness(queryKey[1]),
    enabled: !!requestId,
  });
};

export const useUpdateBusinessInfoMutation = () => {
  const queryClient = useQueryClient();
  const { handleError } = useResponse();

  return useMutation({
    mutationKey: ["update business info"],
    mutationFn: updateBusinessInfo,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["business info"] });
    },
  });
};
