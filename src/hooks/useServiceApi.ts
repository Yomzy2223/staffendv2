import {
  createService,
  createServiceForm,
  deleteService,
  deleteServiceForm,
  getAllServices,
  getService,
  getServiceForm,
  updateService,
  updateServiceForm,
} from "@/api/serviceApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useResponse } from "./useResponse";

const useServiceApi = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  const createServiceMutation = useMutation({
    mutationFn: createService,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
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
      queryClient.invalidateQueries({ queryKey: ["serviceForm"] });
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
      queryClient.invalidateQueries({ queryKey: ["serviceForm"] });
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
      queryClient.invalidateQueries({ queryKey: ["serviceForm"] });
    },
    retry: 3,
  });

  const useGetServiceFormQuery = (id: string) =>
    useQuery({
      queryKey: ["serviceForm", id],
      queryFn: ({ queryKey }) => getServiceForm(queryKey[1]),
    });

  const useGetAllServiceFormQuery = (serviceCategoryId: string) =>
    useQuery({
      queryKey: ["serviceForm", serviceCategoryId],
      queryFn: ({ queryKey }) => getServiceForm(queryKey[1]),
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
    useGetAllServiceFormQuery,
  };
};

export default useServiceApi;
