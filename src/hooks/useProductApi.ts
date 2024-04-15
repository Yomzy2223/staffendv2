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
} from "@/hooks/api/productApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useResponse } from "./useResponse";

const useProductApi = () => {
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
    retry: 3,
  });

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
    retry: 3,
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
    retry: 3,
  });

  const useGetProductQuery = (id: string) =>
    useQuery({
      queryKey: ["product", id],
      queryFn: ({ queryKey }) => getProduct(queryKey[1]),
      enabled: !!id,
    });

  const useGetServiceProductsQuery = (serviceId: string) =>
    useQuery({
      queryKey: ["product", serviceId],
      queryFn: ({ queryKey }) => getServiceProducts(queryKey[1]),
      enabled: !!serviceId,
    });

  const getAllProductsQuery = useQuery({
    queryKey: ["product"],
    queryFn: getAllProducts,
  });

  const createProductFormMutation = useMutation({
    mutationFn: createProductForm,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["Product Form"] });
    },
    retry: 3,
  });

  const updateProductFormMutation = useMutation({
    mutationFn: updateProductForm,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["Product Form"] });
    },
    retry: 3,
  });

  const deleteProductFormMutation = useMutation({
    mutationFn: deleteProductForm,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["Product Form"] });
    },
    retry: 3,
  });

  const useGetProductFormsQuery = (productId: string) =>
    useQuery({
      queryKey: ["Product Form", productId],
      queryFn: ({ queryKey }) => getProductForm(queryKey[1]),
      enabled: !!productId,
    });

  const useGetServiceProductFormsQuery = (serviceId: string) =>
    useQuery({
      queryKey: ["Product Form", serviceId],
      queryFn: ({ queryKey }) => getServiceProductForms(queryKey[1]),
      enabled: !!serviceId,
    });

  const getAllServicesProductsFormQuery = useQuery({
    queryKey: ["Product Form"],
    queryFn: getAllServicesProductsForm,
  });

  const createProductSubFormMutation = useMutation({
    mutationFn: createProductSubForm,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["Product Form"] });
    },
    retry: 3,
  });

  const createMultipleProductSubFormsMutation = useMutation({
    mutationFn: createMultipleProductSubForms,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["Product Form"] });
    },
    retry: 3,
  });

  const updateProductSubFormMutation = useMutation({
    mutationFn: updateProductSubForm,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["Product Form"] });
    },
    retry: 3,
  });

  const deleteProductSubFormMutation = useMutation({
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

  const useGetProductSubFormQuery = (id: string) =>
    useQuery({
      queryKey: ["Product Form", id],
      queryFn: ({ queryKey }) => getProductSubForm(queryKey[1]),
      enabled: !!id,
    });

  const useGetProductFormSubFormsQuery = (formId: string) =>
    useQuery({
      queryKey: ["Product Form", formId],
      queryFn: ({ queryKey }) => getProductSubForm(queryKey[1]),
      enabled: !!formId,
    });

  return {
    createProductMutation,
    updateProductMutation,
    deleteProductMutation,
    useGetProductQuery,
    useGetServiceProductsQuery,
    getAllProductsQuery,

    createProductFormMutation,
    updateProductFormMutation,
    deleteProductFormMutation,
    useGetProductFormsQuery,
    useGetServiceProductFormsQuery,
    getAllServicesProductsFormQuery,

    createProductSubFormMutation,
    createMultipleProductSubFormsMutation,
    updateProductSubFormMutation,
    deleteProductSubFormMutation,
    useGetProductSubFormQuery,
    useGetProductFormSubFormsQuery,
  };
};

export default useProductApi;
