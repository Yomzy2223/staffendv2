import { Client, TRoot } from "..";
import {
  TForm,
  TFormCreate,
  TFormGet,
  TSubFormCreate,
  TSubFormGet,
} from "../service/types";
import { TProductGet, TProductCreate } from "./types";

// Product endpoints
export const createProduct = async ({
  serviceId,
  formInfo,
}: {
  serviceId: string;
  formInfo: TProductCreate;
}) => {
  const client = await Client();
  return await client.post<TRoot<TProductGet>>(
    `/products/${serviceId}`,
    formInfo
  );
};

export const updateProduct = async ({
  id,
  formInfo,
}: {
  id: string;
  formInfo: TProductCreate;
}) => {
  const client = await Client();
  return await client.put<TRoot<TProductGet>>(`/products/${id}`, formInfo);
};

export const deleteProduct = async (id: string) => {
  const client = await Client();
  return await client.delete<TRoot>(`/products/${id}`);
};

export const getProduct = async (id: string) => {
  const client = await Client();
  return await client.get<TRoot<TProductGet>>(`/products/${id}`);
};

export const getServiceProducts = async (serviceId: string) => {
  const client = await Client();
  return await client.get<TRoot<TProductGet[]>>(
    `/products/service/${serviceId}`
  );
};

export const getAllProducts = async () => {
  const client = await Client();
  return await client.get<TRoot<TProductGet[]>>(`/products`);
};

// Product form endpoints
export const createProductForm = async ({
  productId,
  formInfo,
}: {
  productId: string;
  formInfo: TFormCreate;
}) => {
  const client = await Client();
  return await client.post<TRoot<TForm>>(
    `/products/form/${productId}`,
    formInfo
  );
};

export const updateProductForm = async ({
  id,
  formInfo,
}: {
  id: string;
  formInfo: TFormCreate;
}) => {
  const client = await Client();
  return await client.put<TRoot<TForm>>(`/products/form/${id}`, formInfo);
};

export const deleteProductForm = async (id: string) => {
  const client = await Client();
  return await client.delete<TRoot>(`/products/form/${id}`);
};

export const getProductForm = async (productId: string) => {
  const client = await Client();
  return await client.get<TRoot<TFormGet>>(
    `/products/formByProduct/${productId}`
  );
};

export const getServiceProductForms = async (serviceId: string) => {
  const client = await Client();
  return await client.get<TRoot<TFormGet[]>>(`/products/form/${serviceId}`);
};

export const getAllServicesProductsForm = async () => {
  const client = await Client();
  return await client.get<TRoot<TFormGet[]>>(`/products/form/all`);
};

// Product sub-form endpoints
export const createProductSubForm = async ({
  formId,
  formInfo,
}: {
  formId: string;
  formInfo: TSubFormCreate;
}) => {
  const client = await Client();
  return await client.post<TRoot<TSubFormGet>>(
    `/products/subform/${formId}`,
    formInfo
  );
};

export const createMultipleProductSubForms = async ({
  formId,
  formInfo,
}: {
  formId: string;
  formInfo: TSubFormCreate[];
}) => {
  const client = await Client();
  return await client.post<TRoot<TSubFormGet>>(`/products/subforms/${formId}`, {
    subform: formInfo,
  });
};

export const updateProductSubForm = async ({
  id,
  formInfo,
}: {
  id: string;
  formInfo: TSubFormCreate;
}) => {
  const client = await Client();
  return await client.put<TRoot<TSubFormGet>>(
    `/products/subform/${id}`,
    formInfo
  );
};

export const deleteProductSubForm = async (id: string) => {
  const client = await Client();
  return await client.delete<TRoot>(`/products/subform/${id}`);
};

export const getProductSubForm = async (id: string) => {
  const client = await Client();
  return await client.get<TRoot<TSubFormGet>>(`/products/subform/${id}`);
};

export const getProductSubForms = async (formId: string) => {
  const client = await Client();
  return await client.get<TRoot<TSubFormGet[]>>(`/products/subforms/${formId}`);
};
