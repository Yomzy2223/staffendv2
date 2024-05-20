import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useResponse } from "..";
import {
  createMultipleServiceSubForms,
  createService,
  createServiceForm,
  createServiceSubForm,
  deleteService,
  deleteServiceForm,
  deleteServiceSubForm,
  getAllServices,
  getService,
  getServiceForm,
  getServiceForms,
  getServiceSubForm,
  getServiceSubForms,
  updateService,
  updateServiceForm,
  updateServiceSubForm,
} from "./operations";

export const useCreateServiceMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const { setQuery } = useGlobalFunctions();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createService,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      setQuery("serviceId", data.data.data.id);
      queryClient.invalidateQueries({ queryKey: ["service"] });
    },
  });
};

export const useUpdateServiceMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateService,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["service"] });
    },
  });
};

export const useDeleteServiceMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteService,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["service"] });
    },
  });
};

export const useGetServiceQuery = (id: string) =>
  useQuery({
    queryKey: ["service", id],
    queryFn: ({ queryKey }) => getService(queryKey[1]),
    enabled: !!id,
  });

export const useGetAllServicesQuery = () =>
  useQuery({
    queryKey: ["service"],
    queryFn: getAllServices,
  });

//
// SERVICE FORM HOOKS
export const useCreateServiceFormMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createServiceForm,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["Service Form"] });
    },
    retry: 3,
  });
};

export const useUpdateServiceFormMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateServiceForm,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["Service Form"] });
    },
    retry: 3,
  });
};

export const useDeleteServiceFormMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteServiceForm,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["Service Form"] });
    },
    retry: 3,
  });
};

export const useGetServiceFormQuery = (id: string) =>
  useQuery({
    queryKey: ["Service Form", id],
    queryFn: ({ queryKey }) => getServiceForm(queryKey[1]),
    enabled: !!id,
  });

export const useGetServiceFormsQuery = (serviceId: string) =>
  useQuery({
    queryKey: ["Service Form", serviceId],
    queryFn: ({ queryKey }) => getServiceForms(queryKey[1]),
    enabled: !!serviceId,
  });

//
// SERVICE SUBFORM HOOKS
export const useCreateServiceSubFormMutation = () => {
  const { handleError } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createServiceSubForm,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["Service Form"] });
    },
    retry: 3,
  });
};

export const useCreateMultipleServiceSubFormsMutation = () => {
  const { handleError } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMultipleServiceSubForms,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["Service Form"] });
    },
    retry: 3,
  });
};

export const useUpdateServiceSubFormMutation = () => {
  const { handleError } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateServiceSubForm,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["Service Form"] });
    },
    retry: 3,
  });
};

export const useDeleteServiceSubFormMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteServiceSubForm,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["Service Form"] });
    },
    retry: 3,
  });
};

export const useGetServiceSubFormQuery = (id: string) =>
  useQuery({
    queryKey: ["Service Form", id],
    queryFn: ({ queryKey }) => getServiceSubForm(queryKey[1]),
    enabled: !!id,
  });

export const useGetServiceSubFormsQuery = (serviceId: string) =>
  useQuery({
    queryKey: ["Service Form", serviceId],
    queryFn: ({ queryKey }) => getServiceSubForms(queryKey[1]),
    enabled: !!serviceId,
  });
