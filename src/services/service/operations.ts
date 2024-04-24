import { Client, TRoot } from "..";
import {
  TFormCreate,
  TService,
  TServiceCreate,
  TServiceGet,
  TSubFormCreate,
} from "./types";

// Service endpoints
export const createService = async (formInfo: TServiceCreate) => {
  const client = await Client();
  return await client.post<TRoot<TService>>("/services", formInfo);
};

export const updateService = async ({
  id,
  formInfo,
}: {
  id: string;
  formInfo: TServiceCreate;
}) => {
  const client = await Client();
  return await client.put<TRoot<TService>>(`/services/${id}`, formInfo);
};

export const deleteService = async (id: string) => {
  const client = await Client();
  return await client.delete(`/services/${id}`);
};

export const getService = async (id: string) => {
  const client = await Client();
  return await client.get<TRoot<TServiceGet>>(`/services/${id}`);
};

export const getAllServices = async () => {
  const client = await Client();
  return await client.get<TRoot<TService[]>>(`/services`);
};

// Service form endpoints
export const createServiceForm = async ({
  serviceId,
  formInfo,
}: {
  serviceId: string;
  formInfo: TFormCreate;
}) => {
  const client = await Client();
  return await client.post(`/services/form/${serviceId}`, formInfo);
};

export const updateServiceForm = async ({
  id,
  formInfo,
}: {
  id: string;
  formInfo: TFormCreate;
}) => {
  const client = await Client();
  return await client.put(`/services/form/${id}`, formInfo);
};

export const deleteServiceForm = async (id: string) => {
  const client = await Client();
  return await client.delete<TRoot>(`/services/form/${id}`);
};

export const getServiceForm = async (id: string) => {
  const client = await Client();
  return await client.get(`/services/form/${id}`);
};

export const getServiceForms = async (serviceId: string) => {
  const client = await Client();
  return await client.get(`/services/forms/${serviceId}`);
};

// Service subform endpoints
export const createServiceSubForm = async ({
  formId,
  formInfo,
}: {
  formId: string;
  formInfo: TSubFormCreate;
}) => {
  const client = await Client();
  return await client.post(`/services/subform/${formId}`, formInfo);
};

export const createMultipleServiceSubForms = async ({
  formId,
  formInfo,
}: {
  formId: string;
  formInfo: TSubFormCreate[];
}) => {
  const client = await Client();
  return await client.post(`/services/subforms/${formId}`, {
    subform: formInfo,
  });
};

export const updateServiceSubForm = async ({
  id,
  formInfo,
}: {
  id: string;
  formInfo: TSubFormCreate;
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
