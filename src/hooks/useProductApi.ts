import {
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
      queryClient.invalidateQueries({ queryKey: ["productForm"] });
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
      queryClient.invalidateQueries({ queryKey: ["productForm"] });
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
      queryClient.invalidateQueries({ queryKey: ["productForm"] });
    },
    retry: 3,
  });

  const useGetProductFormsQuery = (id: string) =>
    useQuery({
      queryKey: ["productForm", id],
      queryFn: ({ queryKey }) => getProductForm(queryKey[1]),
    });

  const useGetServiceProductFormsQuery = (serviceId: string) =>
    useQuery({
      queryKey: ["productForm", serviceId],
      queryFn: ({ queryKey }) => getServiceProductForms(queryKey[1]),
    });

  const getAllServicesProductsFormQuery = useQuery({
    queryKey: ["product"],
    queryFn: getAllServicesProductsForm,
  });

  const createProductSubFormMutation = useMutation({
    mutationFn: createProductSubForm,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["productForm"] });
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
      queryClient.invalidateQueries({ queryKey: ["productForm"] });
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
      queryClient.invalidateQueries({ queryKey: ["productForm"] });
    },
    retry: 3,
  });

  const useGetProductSubFormQuery = (id: string) =>
    useQuery({
      queryKey: ["productForm", id],
      queryFn: ({ queryKey }) => getProductSubForm(queryKey[1]),
    });

  const useGetProductFormSubFormsQuery = (serviceFormId: string) =>
    useQuery({
      queryKey: ["productForm", serviceFormId],
      queryFn: ({ queryKey }) => getProductSubForm(queryKey[1]),
    });

  return {
    createProductMutation,
    updateProductMutation,
    deleteProductMutation,
    useGetProductQuery,
    getAllProductsQuery,

    createProductFormMutation,
    updateProductFormMutation,
    deleteProductFormMutation,
    useGetProductFormsQuery,
    useGetServiceProductFormsQuery,
    getAllServicesProductsFormQuery,

    createProductSubFormMutation,
    updateProductSubFormMutation,
    deleteProductSubFormMutation,
    useGetProductSubFormQuery,
    useGetProductFormSubFormsQuery,
  };
};

export default useProductApi;
