import { Client } from "@/lib/axios";

interface serviceType {
  name: string;
  description: string;
}

interface serviceFormType {
  title: string;
  description: string;
  type: string;
  compulsory: boolean;
}

interface serviceSubFormType {
  question: string;
  type: string;
  options?: string[];
  compulsory: boolean;
  fileName?: string;
  fileDescription?: string;
  fileLink?: string;
  fileType?: string;
}

// Service endpoints
export const createService = async (formInfo: serviceType) => {
  const client = await Client();
  return await client.post("/services", formInfo);
};

export const updateService = async ({
  id,
  formInfo,
}: {
  id: string;
  formInfo: serviceType;
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
  formInfo: serviceFormType;
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
  formInfo: serviceFormType;
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
  formInfo: serviceSubFormType;
}) => {
  const client = await Client();
  return await client.post(`/services/subform/${formId}`, formInfo);
};

export const updateServiceSubForm = async ({
  id,
  formInfo,
}: {
  id: string;
  formInfo: serviceSubFormType;
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
