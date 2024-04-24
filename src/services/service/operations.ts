import { Client, TRoot } from "..";
import {
  TForm,
  TFormCreate,
  TFormGet,
  TService,
  TServiceCreate,
  TServiceGet,
  TSubFormCreate,
  TSubFormGet,
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
  return await client.post<TRoot<TForm>>(
    `/services/form/${serviceId}`,
    formInfo
  );
};

export const updateServiceForm = async ({
  id,
  formInfo,
}: {
  id: string;
  formInfo: TFormCreate;
}) => {
  const client = await Client();
  return await client.put<TRoot<TForm>>(`/services/form/${id}`, formInfo);
};

export const deleteServiceForm = async (id: string) => {
  const client = await Client();
  return await client.delete<TRoot>(`/services/form/${id}`);
};

export const getServiceForm = async (id: string) => {
  const client = await Client();
  return await client.get<TRoot<TFormGet>>(`/services/form/${id}`);
};

export const getServiceForms = async (serviceId: string) => {
  const client = await Client();
  return await client.get<TRoot<TFormGet[]>>(`/services/forms/${serviceId}`);
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
  return await client.post<TRoot<TSubFormGet>>(
    `/services/subform/${formId}`,
    formInfo
  );
};

export const createMultipleServiceSubForms = async ({
  formId,
  formInfo,
}: {
  formId: string;
  formInfo: TSubFormCreate[];
}) => {
  const client = await Client();
  return await client.post<TRoot<TSubFormGet[]>>(
    `/services/subforms/${formId}`,
    {
      subform: formInfo,
    }
  );
};

export const updateServiceSubForm = async ({
  id,
  formInfo,
}: {
  id: string;
  formInfo: TSubFormCreate;
}) => {
  const client = await Client();
  return await client.put<TRoot<TSubFormGet>>(
    `/services/subform/${id}`,
    formInfo
  );
};

export const deleteServiceSubForm = async (id: string) => {
  const client = await Client();
  return await client.delete<TRoot>(`/services/subform/${id}`);
};

export const getServiceSubForm = async (id: string) => {
  const client = await Client();
  return await client.get<TRoot<TSubFormGet>>(`/services/subform/${id}`);
};

export const getServiceSubForms = async (formId: string) => {
  const client = await Client();
  return await client.get<TRoot<TSubFormGet[]>>(`/services/subforms/${formId}`);
};
