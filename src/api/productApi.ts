import { Client } from "@/lib/axios";

interface productType {
  name: string;
  type: string;
  code: string;
  description: string;
  country: string;
  price: string;
  timeline: string;
  feature: string[];
  numberOfShares: string;
}

interface productFormType {
  question: string;
  type: string;
  options: (string | number)[];
  compulsory: boolean;
  file: {
    name: string;
    description: string;
    link: string;
    type: string;
  };
  subForm: boolean;
  form: {
    question: string;
    type: string;
    options: [];
    compulsory: boolean;
    file: {
      name: string;
      description: string;
      link: string;
      type: string;
    };
  }[];
}

// Product endpoints
export const createProduct = async (
  serviceCategoryId: string,
  formInfo: productType
) => {
  const client = await Client();
  return client.post(`/service/product/${serviceCategoryId}`, formInfo);
};

export const updateProduct = async (id: string, formInfo: productType) => {
  const client = await Client();
  return client.put(`/service/product/${id}`, formInfo);
};

export const viewProduct = async (id: string) => {
  const client = await Client();
  return client.get(`/service/product/${id}`);
};

export const viewAllProducts = async () => {
  const client = await Client();
  return client.get(`/service/product`);
};

export const deleteProduct = async (id: string) => {
  const client = await Client();
  return client.delete(`/service/product/${id}`);
};

// Product form endpoints
export const createProductForm = async (
  serviceId: string,
  formInfo: productFormType
) => {
  const client = await Client();
  return client.post(`/service/product/form/${serviceId}`, formInfo);
};

export const updateProductForm = async (
  id: string,
  formInfo: productFormType
) => {
  const client = await Client();
  return client.put(`/service/product/form/${id}`, formInfo);
};

export const viewProductForm = async (id: string) => {
  const client = await Client();
  return client.get(`/service/product/form/${id}`);
};

export const viewServiceProductForms = async (serviceId: string) => {
  const client = await Client();
  return client.get(`/service/product/form/${serviceId}`);
};

export const viewAllServicesProductsForm = async () => {
  const client = await Client();
  return client.get(`/service/product/form/all`);
};

export const deleteServiceProductForm = async (id: string) => {
  const client = await Client();
  return client.delete(`/service/product/form/${id}`);
};
