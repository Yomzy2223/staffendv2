import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCountry,
  deleteCountry,
  getCountries,
  getCountry,
  updateCountry,
} from "./api/countryApi";
import { useResponse } from "./useResponse";

export const useCountryApi = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  const createCountryMutation = useMutation({
    mutationFn: createCountry,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["country"] });
    },
    retry: 3,
  });

  const updateCountryMutation = useMutation({
    mutationFn: updateCountry,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["country"] });
    },
    retry: 3,
  });

  const deleteCountryMutation = useMutation({
    mutationFn: deleteCountry,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["country"] });
    },
    retry: 3,
  });

  const useGetCountryQuery = (id: string) =>
    useQuery({
      queryKey: ["country", id],
      queryFn: ({ queryKey }) => getCountry(queryKey[1]),
      enabled: id ? true : false,
    });

  const getAllCountriesQuery = useQuery({
    queryKey: ["product"],
    queryFn: getCountries,
  });

  return {
    createCountryMutation,
    updateCountryMutation,
    deleteCountryMutation,
    useGetCountryQuery,
    getAllCountriesQuery,
  };
};
