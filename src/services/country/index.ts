import { useResponse } from "@/hooks/useResponse";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCountry,
  deleteCountry,
  getCountries,
  getCountry,
  updateCountry,
} from "./operations";

export const useCreateCountryMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  useMutation({
    mutationFn: createCountry,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["country"] });
    },
  });
};

export const useUpdateCountryMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  useMutation({
    mutationFn: updateCountry,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["country"] });
    },
  });
};

export const useDeleteCountryMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  useMutation({
    mutationFn: deleteCountry,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["country"] });
    },
  });
};

export const useGetCountryQuery = (id: string) =>
  useQuery({
    queryKey: ["country", id],
    queryFn: ({ queryKey }) => getCountry(queryKey[1]),
    enabled: !!id,
  });

export const useGetAllCountriesQuery = () =>
  useQuery({
    queryKey: ["country"],
    queryFn: getCountries,
  });
