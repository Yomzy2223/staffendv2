import {
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
} from "@/hooks/api/serviceApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useGlobalFucntions } from "./globalFunctions";
import { useResponse } from "./useResponse";

const useServiceApi = () => {
  const { handleError, handleSuccess } = useResponse();
  const { setQuery } = useGlobalFucntions();
  const queryClient = useQueryClient();

  const createServiceMutation = useMutation({
    mutationFn: createService,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      setQuery("serviceId", data.data.data.id);
      queryClient.invalidateQueries({ queryKey: ["service"] });
    },
    retry: 3,
  });

  const updateServiceMutation = useMutation({
    mutationFn: updateService,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["service"] });
    },
    retry: 3,
  });

  const deleteServiceMutation = useMutation({
    mutationFn: deleteService,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["service"] });
    },
    retry: 3,
  });

  const useGetServiceQuery = (id: string) =>
    useQuery({
      queryKey: ["service", id],
      queryFn: ({ queryKey }) => getService(queryKey[1]),
      enabled: id ? true : false,
    });

  const getAllServicesQuery = useQuery({
    queryKey: ["service"],
    queryFn: getAllServices,
  });

  const createServiceFormMutation = useMutation({
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

  const updateServiceFormMutation = useMutation({
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

  const deleteServiceFormMutation = useMutation({
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

  const useGetServiceFormQuery = (id: string) =>
    useQuery({
      queryKey: ["Service Form", id],
      queryFn: ({ queryKey }) => getServiceForm(queryKey[1]),
      enabled: id ? true : false,
    });

  const useGetServiceFormsQuery = (serviceCategoryId: string) =>
    useQuery({
      queryKey: ["Service Form", serviceCategoryId],
      queryFn: ({ queryKey }) => getServiceForms(queryKey[1]),
      enabled: serviceCategoryId ? true : false,
    });

  const createServiceSubFormMutation = useMutation({
    mutationFn: createServiceSubForm,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["Service Form"] });
    },
    retry: 3,
  });

  const updateServiceSubFormMutation = useMutation({
    mutationFn: updateServiceSubForm,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["Service Form"] });
    },
    retry: 3,
  });

  const deleteServiceSubFormMutation = useMutation({
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

  const useGetServiceSubFormQuery = (id: string) =>
    useQuery({
      queryKey: ["Service Form", id],
      queryFn: ({ queryKey }) => getServiceSubForm(queryKey[1]),
      enabled: id ? true : false,
    });

  const useGetServiceSubFormsQuery = (serviceCategoryId: string) =>
    useQuery({
      queryKey: ["Service Form", serviceCategoryId],
      queryFn: ({ queryKey }) => getServiceSubForms(queryKey[1]),
      enabled: serviceCategoryId ? true : false,
    });

  return {
    createServiceMutation,
    updateServiceMutation,
    deleteServiceMutation,
    useGetServiceQuery,
    getAllServicesQuery,
    createServiceFormMutation,
    updateServiceFormMutation,
    deleteServiceFormMutation,
    useGetServiceFormQuery,
    useGetServiceFormsQuery,
    createServiceSubFormMutation,
    updateServiceSubFormMutation,
    deleteServiceSubFormMutation,
    useGetServiceSubFormQuery,
    useGetServiceSubFormsQuery,
  };
};

export default useServiceApi;
