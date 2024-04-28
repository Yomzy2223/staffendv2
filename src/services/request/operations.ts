import { Client, TRoot } from "..";
import {
  TAllReqPayload,
  TBusinessData,
  TRequesForm,
  TRequestAll,
  TRequestGet,
  TServiceReqPayload,
} from "./types";
// import { IRequest } from "./types";

// Request endpoints
// export const updateRequest = async ({
//   id,
//   formInfo,
// }: {
//   id: string;
//   formInfo: IRequest;
// }) => {
//   const client = await Client();
//   return await client.put(`/productRequest${id}`, formInfo);
// };

export const deleteRequest = async (id: string) => {
  const client = await Client();
  return await client.delete<TRoot>(`/productRequest${id}`);
};

export const getRequest = async (id: string) => {
  const client = await Client();
  return await client.get<TRoot<TRequestGet>>(`/productRequest/${id}`);
};

export const getServiceRequests = async ({
  serviceId,
  page,
  pageSize,
}: TServiceReqPayload) => {
  const client = await Client();
  return await client.get<TRoot<TRequestAll[]>>(
    `/productRequest/service/${serviceId}?page=${page}&pageSize=${pageSize}`
  );
};

export const getAllRequests = async ({ page, pageSize }: TAllReqPayload) => {
  const client = await Client();
  let endpoint = `/productRequest`;
  if (page && pageSize)
    endpoint = `/productRequest?page=${page}&pageSize=${pageSize}`;
  return await client.get<TRoot<TRequestAll[]>>(endpoint);
};

export const getRequestForm = async (requestId: string) => {
  const client = await Client();
  return await client.get<TRoot<TRequesForm>>(
    `/productRequest/form/${requestId}`
  );
};

export const getBusinessDetails = async (requestId: string) => {
  const client = await Client();
  return await client.get<TRoot<TBusinessData>>(
    `/processRequest/request/${requestId}`
  );
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
  return await client.post<TRoot>(`/productRequest/assign`, formInfo);
};

export const unAssignRequest = async ({
  formInfo,
}: {
  formInfo: {
    userId: string;
    requestIds: string[];
  };
}) => {
  const client = await Client();
  return await client.put<TRoot>(`/productRequest/unassign`, formInfo);
};

export const searchRequest = async ({
  formInfo,
}: {
  formInfo: {
    queryString: string;
    serviceId: string;
  };
}) => {
  const client = await Client();
  return await client.post<TRoot<TRequestAll[]>>(
    `/productRequest/search`,
    formInfo
  );
};

// Request form endpoints
