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
  return await client.post(`/products/${serviceCategoryId}`, formInfo);
};

export const updateProduct = async ({
  id,
  formInfo,
}: {
  id: string;
  formInfo: productType;
}) => {
  const client = await Client();
  return await client.put(`/products/${id}`, formInfo);
};

export const deleteProduct = async (id: string) => {
  const client = await Client();
  return await client.delete(`/products/${id}`);
};

export const getProduct = async (id: string) => {
  const client = await Client();
  return await client.get(`/products/${id}`);
};

export const getServiceProducts = async (serviceId: string) => {
  const client = await Client();
  return await client.get(`/products/service/${serviceId}`);
};

export const getAllProducts = async () => {
  const client = await Client();
  return await client.get(`/products`);
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
  return await client.post(`/products/form/${serviceId}`, formInfo);
};

export const updateProductForm = async ({
  id,
  formInfo,
}: {
  id: string;
  formInfo: productFormType;
}) => {
  const client = await Client();
  return await client.put(`/products/form/${id}`, formInfo);
};

export const deleteProductForm = async (id: string) => {
  const client = await Client();
  return await client.delete(`/products/form/${id}`);
};

export const getProductForm = async (productId: string) => {
  const client = await Client();
  return await client.get(`/products/formByProduct/${productId}`);
};

export const getServiceProductForms = async (serviceId: string) => {
  const client = await Client();
  return await client.get(`/products/form/${serviceId}`);
};

export const getAllServicesProductsForm = async () => {
  const client = await Client();
  return await client.get(`/products/form/all`);
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
  return await client.post(`/products/subform/${serviceFormId}`, formInfo);
};

export const updateProductSubForm = async ({
  id,
  formInfo,
}: {
  id: string;
  formInfo: productSubFormType;
}) => {
  const client = await Client();
  return await client.put(`/products/subform/${id}`, formInfo);
};

export const deleteProductSubForm = async (id: string) => {
  const client = await Client();
  return await client.delete(`/products/subform/${id}`);
};

export const getProductSubForm = async (id: string) => {
  const client = await Client();
  return await client.get(`/products/subform/${id}`);
};

export const getProductSubForms = async (serviceFormId: string) => {
  const client = await Client();
  return await client.get(`/products/subforms/${serviceFormId}`);
};
