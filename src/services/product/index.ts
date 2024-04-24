import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useResponse } from "..";
import {
  createMultipleProductSubForms,
  createProduct,
  createProductForm,
  createProductSubForm,
  deleteProduct,
  deleteProductForm,
  deleteProductSubForm,
  getAllProducts,
  getAllServicesProductsForm,
  getProduct,
  getProductForm,
  getProductSubForm,
  getServiceProductForms,
  getServiceProducts,
  updateProduct,
  updateProductForm,
  updateProductSubForm,
} from "./operations";

export const useCreateProductMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
};

export const useUpdateProductMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
};

export const useDeleteProductMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
};

export const useGetProductQuery = (id: string) =>
  useQuery({
    queryKey: ["product", id],
    queryFn: ({ queryKey }) => getProduct(queryKey[1]),
    enabled: !!id,
  });

export const useGetServiceProductsQuery = (serviceId: string) =>
  useQuery({
    queryKey: ["product", serviceId],
    queryFn: ({ queryKey }) => getServiceProducts(queryKey[1]),
    enabled: !!serviceId,
  });

export const useGetAllProductsQuery = () =>
  useQuery({
    queryKey: ["product"],
    queryFn: getAllProducts,
  });

export const useCreateProductFormMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProductForm,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["Product Form"] });
    },
  });
};

export const useUpdateProductFormMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProductForm,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["Product Form"] });
    },
  });
};

export const useDeleteProductFormMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProductForm,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["Product Form"] });
    },
  });
};

export const useGetProductFormsQuery = (productId: string) =>
  useQuery({
    queryKey: ["Product Form", productId],
    queryFn: ({ queryKey }) => getProductForm(queryKey[1]),
    enabled: !!productId,
  });

export const useGetServiceProductFormsQuery = (serviceId: string) =>
  useQuery({
    queryKey: ["Product Form", serviceId],
    queryFn: ({ queryKey }) => getServiceProductForms(queryKey[1]),
    enabled: !!serviceId,
  });

export const useGetAllServicesProductsFormQuery = () =>
  useQuery({
    queryKey: ["Product Form"],
    queryFn: getAllServicesProductsForm,
  });

export const useCreateProductSubFormMutation = () => {
  const { handleError } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProductSubForm,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["Product Form"] });
    },
    retry: 3,
  });
};

export const useCreateMultipleProductSubFormsMutation = () => {
  const { handleError } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMultipleProductSubForms,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["Product Form"] });
    },
    retry: 3,
  });
};

export const useUpdateProductSubFormMutation = () => {
  const { handleError } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProductSubForm,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["Product Form"] });
    },
    retry: 3,
  });
};

export const useDeleteProductSubFormMutation = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProductSubForm,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["Product Form"] });
    },
    retry: 3,
  });
};

export const useGetProductSubFormQuery = (id: string) =>
  useQuery({
    queryKey: ["Product Form", id],
    queryFn: ({ queryKey }) => getProductSubForm(queryKey[1]),
    enabled: !!id,
  });

export const useGetProductFormSubFormsQuery = (formId: string) =>
  useQuery({
    queryKey: ["Product Form", formId],
    queryFn: ({ queryKey }) => getProductSubForm(queryKey[1]),
    enabled: !!formId,
  });
