import { Client } from "@/lib/axios";
import { IRequest } from "./types";

// Request endpoints
export const updateRequest = async ({
  id,
  formInfo,
}: {
  id: string;
  formInfo: IRequest;
}) => {
  const client = await Client();
  return await client.put(`/productRequest${id}`, formInfo);
};

export const deleteRequest = async (id: string) => {
  const client = await Client();
  return await client.delete(`/productRequest${id}`);
};

export const getRequest = async (id: string) => {
  const client = await Client();
  return await client.get(`/productRequest/${id}`);
};

export const getServiceRequests = async (serviceId: string) => {
  const client = await Client();
  return await client.get(`/productRequest`);
};

export const getAllRequests = async () => {
  const client = await Client();
  return await client.get(`/productRequest`);
};

export const assignRequest = async ({
  formInfo,
}: {
  formInfo: {
    userId: string;
    requestIds: string[];
  };
}) => {
  const client = await Client();
  return await client.post(`/productRequest/assign`, formInfo);
};
