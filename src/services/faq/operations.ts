import { Client, TRoot } from "..";
import { TCreateFAQ, TFAQ } from "./types";

export const createFAQ = async (formInfo: TCreateFAQ) => {
  const client = await Client();
  const payload = {};
  return await client.post<TRoot<TFAQ>>(`/faqs`, formInfo);
};

export const updateFAQ = async ({
  id,
  formInfo,
}: {
  id: string;
  formInfo: TCreateFAQ;
}) => {
  const client = await Client();
  return await client.put<TRoot<TFAQ>>(`/faqs/${id}`, formInfo);
};

export const deleteFAQ = async (id: string) => {
  const client = await Client();
  return await client.delete<TRoot>(`/faqs/${id}`);
};

export const getFAQ = async (id: string) => {
  const client = await Client();
  return await client.get<TRoot<TFAQ>>(`/faqs/${id}`);
};

export const getProductFAQs = async (productId: string) => {
  const client = await Client();
  return await client.get<TRoot<TFAQ[]>>(`/faqs/product/${productId}`);
};

export const getServiceFAQs = async (serviceId: string) => {
  const client = await Client();
  return (await client.get)<TRoot<TFAQ[]>>(`/faqs/service/${serviceId}`);
};

export const getAllFAQs = async () => {
  const client = await Client();
  return await client.get<TRoot<TFAQ[]>>(`/faqs`);
};
