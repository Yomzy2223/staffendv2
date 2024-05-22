import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useResponse } from "..";
import {
  activatePartner,
  createPartnerForm,
  createPartnerSubForm,
  deActivatePartner,
  declinePartner,
  deletePartnerForm,
  deletePartnerSubForm,
  getCountryPartnerForm,
  getPartnerForm,
  getPartnerFormQA,
  getPartnerSubForm,
  updatePartnerForm,
  updatePartnerSubForm,
} from "./operations";

export const useCreatePartnerFormMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPartnerForm,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["Partner Form"] });
    },
  });
};

export const useUpdatePartnerFormMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePartnerForm,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["Partner Form"] });
    },
  });
};

export const useDeletePartnerFormMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePartnerForm,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["Partner Form"] });
    },
  });
};

export const useGetPartnerFormQuery = (id: string) =>
  useQuery({
    queryKey: ["Partner Form", id],
    queryFn: ({ queryKey }) => getPartnerForm(queryKey[1]),
    enabled: !!id,
  });

export const useGetCountryPartnerFormsQuery = (id: string) =>
  useQuery({
    queryKey: ["Partner Form", id],
    queryFn: ({ queryKey }) => getCountryPartnerForm(queryKey[1]),
    enabled: !!id,
  });

// PARTNER SUBFORM HOOKS
export const useCreatePartnerSubFormMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPartnerSubForm,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["Partner Form"] });
    },
  });
};

export const useUpdatePartnerSubFormMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePartnerSubForm,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["Partner Form"] });
    },
  });
};

export const useDeletePartnerSubFormMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePartnerSubForm,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["Partner Form"] });
    },
  });
};

export const useGetPartnerSubFormQuery = (id: string) =>
  useQuery({
    queryKey: ["Partner Form", id],
    queryFn: ({ queryKey }) => getPartnerSubForm(queryKey[1]),
    enabled: !!id,
  });

export const useGetPartnerFormQAQuery = (userId: string) =>
  useQuery({
    queryKey: ["Partner Form", userId],
    queryFn: ({ queryKey }) => getPartnerFormQA(queryKey[1]),
    enabled: !!userId,
  });

export const useActivatePartnerMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: activatePartner,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["Partner Form"] });
    },
  });
};

export const useDeactivatePartnerMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deActivatePartner,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["Partner Form"] });
    },
  });
};

export const useDeclinePartnerMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: declinePartner,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["Partner Form"] });
    },
  });
};
