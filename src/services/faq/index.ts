import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useResponse } from "..";
import {
  createFAQ,
  deleteFAQ,
  getAllFAQs,
  getFAQ,
  getProductFAQs,
  getServiceFAQs,
  updateFAQ,
} from "./operations";

export const useCreateFAQMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFAQ,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["FAQ"] });
    },
  });
};

export const useUpdateFAQMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFAQ,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["FAQ"] });
    },
  });
};

export const useDeleteFAQMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFAQ,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["FAQ"] });
    },
  });
};

export const useGetFAQQuery = (id: string) =>
  useQuery({
    queryKey: ["FAQ", id],
    queryFn: ({ queryKey }) => getFAQ(queryKey[1]),
    enabled: !!id,
  });

export const useGetProductFAQsQuery = (productId: string) =>
  useQuery({
    queryKey: ["FAQ", productId],
    queryFn: ({ queryKey }) => getProductFAQs(queryKey[1]),
    enabled: !!productId,
  });

export const useGetServiceFAQsQuery = (serviceId: string) =>
  useQuery({
    queryKey: ["FAQ", serviceId],
    queryFn: ({ queryKey }) => getServiceFAQs(queryKey[1]),
    enabled: !!serviceId,
  });

export const useGetAllFAQsQuery = () =>
  useQuery({
    queryKey: ["FAQ"],
    queryFn: getAllFAQs,
  });
