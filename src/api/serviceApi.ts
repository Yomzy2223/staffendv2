import { Client } from "@/lib/axios";

interface serviceType {
  name: string;
  description: string;
}

interface serviceFormType {
  question: string;
  type: string;
  compulsory: boolean;
  options?: {
    question: string;
    type: string;
    compulsory: boolean;
  }[];
}

// Service endpoints
export const createService = async (formInfo: serviceType) => {
  const client = await Client();
  return client.post("/services", formInfo);
};

export const updateService = async (id: string, formInfo: serviceType) => {
  const client = await Client();
  return client.put(`/services/${id}`, formInfo);
};

export const viewService = async (id: string) => {
  const client = await Client();
  return client.get(`/services/${id}`);
};

export const viewAllServices = async () => {
  const client = await Client();
  return client.get(`/services`);
};

export const deleteService = async (id: string) => {
  const client = await Client();
  return client.delete(`/services/${id}`);
};

export const createServiceForm = async (
  serviceCategoryId: string,
  formInfo: serviceFormType
) => {
  const client = await Client();
  return client.post(`/services/form/${serviceCategoryId}`, formInfo);
};

// Service form endpoints
export const updateServiceForm = async (
  id: string,
  formInfo: serviceFormType
) => {
  const client = await Client();
  return client.put(`/services/form/${id}`, formInfo);
};

export const viewServiceForm = async (id: string) => {
  const client = await Client();
  return client.get(`/services/form/${id}`);
};

export const viewAllServiceForm = async (serviceCategoryId: string) => {
  const client = await Client();
  return client.get(`/services/forms/${serviceCategoryId}`);
};

export const deleteServiceForm = async (id: string) => {
  const client = await Client();
  return client.delete(`/services/form/${id}`);
};
