import { Client } from "@/lib/axios";
import { productFormType, productSubFormType, productType } from "./types";

// Product endpoints
export const createProduct = async ({
  serviceCategoryId,
  formInfo,
}: {
  serviceCategoryId: string;
  formInfo: productType;
}) => {
  const client = await Client();
  return await client.post(`/service/product/${serviceCategoryId}`, formInfo);
};

export const updateProduct = async ({
  id,
  formInfo,
}: {
  id: string;
  formInfo: productType;
}) => {
  const client = await Client();
  return await client.put(`/service/product/${id}`, formInfo);
};

export const deleteProduct = async (id: string) => {
  const client = await Client();
  return await client.delete(`/service/product/${id}`);
};

export const getProduct = async (id: string) => {
  const client = await Client();
  return await client.get(`/service/product/${id}`);
};

export const getServiceProducts = async (serviceCategoryId: string) => {
  const client = await Client();
  return await client.get(
    `/service/product/allByServiceCategory/${serviceCategoryId}`
  );
};

export const getAllProducts = async () => {
  const client = await Client();
  return await client.get(`/service/product`);
};

// Product form endpoints
export const createProductForm = async ({
  serviceId,
  formInfo,
}: {
  serviceId: string;
  formInfo: productFormType;
}) => {
  const client = await Client();
  return await client.post(`/service/product/form/${serviceId}`, formInfo);
};

export const updateProductForm = async ({
  id,
  formInfo,
}: {
  id: string;
  formInfo: productFormType;
}) => {
  const client = await Client();
  return await client.put(`/service/product/form/${id}`, formInfo);
};

export const deleteProductForm = async (id: string) => {
  const client = await Client();
  return await client.delete(`/service/product/form/${id}`);
};

export const getProductForm = async (productId: string) => {
  const client = await Client();
  return await client.get(`/service/product/formByService/${productId}`);
};

export const getServiceProductForms = async (serviceId: string) => {
  const client = await Client();
  return await client.get(`/service/product/form/${serviceId}`);
};

export const getAllServicesProductsForm = async () => {
  const client = await Client();
  return await client.get(`/service/product/form/all`);
};

// Product sub-form endpoints
export const createProductSubForm = async ({
  serviceFormId,
  formInfo,
}: {
  serviceFormId: string;
  formInfo: productSubFormType;
}) => {
  const client = await Client();
  return await client.post(
    `/service/product/subform/${serviceFormId}`,
    formInfo
  );
};

export const updateProductSubForm = async ({
  id,
  formInfo,
}: {
  id: string;
  formInfo: productSubFormType;
}) => {
  const client = await Client();
  return await client.put(`/service/product/subform/${id}`, formInfo);
};

export const deleteProductSubForm = async (id: string) => {
  const client = await Client();
  return await client.delete(`/service/product/subform/${id}`);
};

export const getProductSubForm = async (id: string) => {
  const client = await Client();
  return await client.get(`/service/product/subform/${id}`);
};

export const getProductSubForms = async (serviceFormId: string) => {
  const client = await Client();
  return await client.get(`/service/product/subforms/${serviceFormId}`);
};
