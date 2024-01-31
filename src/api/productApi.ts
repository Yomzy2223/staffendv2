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

export const updateProduct = async ({ id, formInfo }: { id: string; formInfo: productType }) => {
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

export const getProductForm = async (id: string) => {
  const client = await Client();
  return await client.get(`/service/product/form/${id}`);
};

export const getServiceProductForms = async (serviceId: string) => {
  const client = await Client();
  return await client.get(`/service/product/form/${serviceId}`);
};

export const getAllServicesProductsForm = async () => {
  const client = await Client();
  return await client.get(`/service/product/form/all`);
};
