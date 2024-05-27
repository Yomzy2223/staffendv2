import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useResponse } from "..";
import {
  createOnboardForm,
  createOnboardSubForm,
  deleteOnboardForm,
  deleteOnboardSubForm,
  getCountryOnboardForm,
  getOnboardForm,
  getOnboardFormQA,
  getOnboardSubForm,
  updateOnboardForm,
  updateOnboardSubForm,
} from "./operations";

export const useCreateOnboardFormMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOnboardForm,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["Onboard Form"] });
    },
  });
};

export const useUpdateOnboardFormMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOnboardForm,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["Onboard Form"] });
    },
  });
};

export const useDeleteOnboardFormMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOnboardForm,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["Onboard Form"] });
    },
  });
};

export const useGetOnboardFormQuery = (id: string) =>
  useQuery({
    queryKey: ["Onboard Form", id],
    queryFn: ({ queryKey }) => getOnboardForm(queryKey[1]),
    enabled: !!id,
  });

export const useGetCountryOnboardFormsQuery = (id: string) =>
  useQuery({
    queryKey: ["Onboard Form", id],
    queryFn: ({ queryKey }) => getCountryOnboardForm(queryKey[1]),
    enabled: !!id,
  });

// ONBOARD SUBFORM HOOKS
export const useCreateOnboardSubFormMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOnboardSubForm,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["Onboard Form"] });
    },
  });
};

export const useUpdateOnboardSubFormMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOnboardSubForm,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["Onboard Form"] });
    },
  });
};

export const useDeleteOnboardSubFormMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOnboardSubForm,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["Onboard Form"] });
    },
  });
};

export const useGetOnboardSubFormQuery = (id: string) =>
  useQuery({
    queryKey: ["Onboard Form", id],
    queryFn: ({ queryKey }) => getOnboardSubForm(queryKey[1]),
    enabled: !!id,
  });

export const useGetOnboardFormQAQuery = (userId: string) =>
  useQuery({
    queryKey: ["Onboard Form", userId],
    queryFn: ({ queryKey }) => getOnboardFormQA(queryKey[1]),
    enabled: !!userId,
  });
