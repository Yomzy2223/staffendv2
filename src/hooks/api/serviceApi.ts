import { Client } from "@/lib/axios";
import { IService, IServiceForm, IServiceSubForm } from "./types";

// Service endpoints
export const createService = async (formInfo: IService) => {
  const client = await Client();
  return await client.post("/services", formInfo);
};

export const updateService = async ({
  id,
  formInfo,
}: {
  id: string;
  formInfo: IService;
}) => {
  const client = await Client();
  return await client.put(`/services/${id}`, formInfo);
};

export const deleteService = async (id: string) => {
  const client = await Client();
  return await client.delete(`/services/${id}`);
};

export const getService = async (id: string) => {
  const client = await Client();
  return await client.get(`/services/${id}`);
};

export const getAllServices = async () => {
  const client = await Client();
  return await client.get(`/services`);
};

export const createServiceForm = async ({
  serviceCategoryId,
  formInfo,
}: {
  serviceCategoryId: string;
  formInfo: IServiceForm;
}) => {
  const client = await Client();
  return await client.post(`/services/form/${serviceCategoryId}`, formInfo);
};

// Service form endpoints
export const updateServiceForm = async ({
  id,
  formInfo,
}: {
  id: string;
  formInfo: IServiceForm;
}) => {
  const client = await Client();
  return await client.put(`/services/form/${id}`, formInfo);
};

export const deleteServiceForm = async (id: string) => {
  const client = await Client();
  return await client.delete(`/services/form/${id}`);
};

export const getServiceForm = async (id: string) => {
  const client = await Client();
  return await client.get(`/services/form/${id}`);
};

export const getServiceForms = async (serviceCategoryId: string) => {
  const client = await Client();
  return await client.get(`/services/forms/${serviceCategoryId}`);
};

export const createServiceSubForm = async ({
  formId,
  formInfo,
}: {
  formId: string;
  formInfo: IServiceSubForm;
}) => {
  const client = await Client();
  return await client.post(`/services/subform/${formId}`, formInfo);
};

export const updateServiceSubForm = async ({
  id,
  formInfo,
}: {
  id: string;
  formInfo: IServiceSubForm;
}) => {
  const client = await Client();
  return await client.put(`/services/subform/${id}`, formInfo);
};

export const deleteServiceSubForm = async (id: string) => {
  const client = await Client();
  return await client.delete(`/services/subform/${id}`);
};

export const getServiceSubForm = async (id: string) => {
  const client = await Client();
  return await client.get(`/services/subform/${id}`);
};

export const getServiceSubForms = async (formId: string) => {
  const client = await Client();
  return await client.get(`/services/subforms/${formId}`);
};
