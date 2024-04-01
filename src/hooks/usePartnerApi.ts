import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPartnerForm,
  createPartnerSubForm,
  deletePartnerForm,
  deletePartnerSubForm,
  getCountryPartnerForm,
  getPartnerForm,
  getPartnerSubForm,
  updatePartnerForm,
  updatePartnerSubForm,
} from "./api/partnerApi";
import { useResponse } from "./useResponse";

const usePartnerApi = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  const createPartnerFormMutation = useMutation({
    mutationFn: createPartnerForm,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["partner"] });
    },
    retry: 3,
  });

  const updatePartnerFormMutation = useMutation({
    mutationFn: updatePartnerForm,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["partner"] });
    },
    retry: 3,
  });

  const deletePartnerFormMutation = useMutation({
    mutationFn: deletePartnerForm,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["partner"] });
    },
    retry: 3,
  });

  const useGetPartnerFormQuery = (country: string) =>
    useQuery({
      queryKey: ["partner", country],
      queryFn: ({ queryKey }) => getPartnerForm(queryKey[1]),
      enabled: country ? true : false,
    });

  const useGetCountryPartnerFormsQuery = (country: string) =>
    useQuery({
      queryKey: ["partner", country],
      queryFn: ({ queryKey }) => getCountryPartnerForm(queryKey[1]),
      enabled: country ? true : false,
    });

  const createPartnerSubFormMutation = useMutation({
    mutationFn: createPartnerSubForm,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["partner"] });
    },
    retry: 3,
  });

  const updatePartnerSubFormMutation = useMutation({
    mutationFn: updatePartnerSubForm,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["partner"] });
    },
    retry: 3,
  });

  const deletePartnerSubFormMutation = useMutation({
    mutationFn: deletePartnerSubForm,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["partner"] });
    },
    retry: 3,
  });

  const useGetPartnerSubFormQuery = (id: string) =>
    useQuery({
      queryKey: ["partner", id],
      queryFn: ({ queryKey }) => getPartnerSubForm(queryKey[1]),
      enabled: id ? true : false,
    });

  return {
    createPartnerFormMutation,
    updatePartnerFormMutation,
    deletePartnerFormMutation,
    useGetPartnerFormQuery,
    useGetCountryPartnerFormsQuery,
    createPartnerSubFormMutation,
    updatePartnerSubFormMutation,
    deletePartnerSubFormMutation,
    useGetPartnerSubFormQuery,
  };
};

export default usePartnerApi;
