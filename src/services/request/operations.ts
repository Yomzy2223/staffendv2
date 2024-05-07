import { Client, TRoot } from "..";
import {
  TAllReqPayload,
  TBusinessData,
  TRequesForm,
  TRequestAll,
  TRequestGet,
  TSearchReqPayload,
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
  startDate,
  endDate,
}: TServiceReqPayload) => {
  const client = await Client();
  let url = `/productRequest/service/${serviceId}?`;
  if (page && pageSize) url = url + `page=${page}&pageSize=${pageSize}&`;
  if (startDate && endDate)
    url = url + `startDate=${startDate}&endDate=${endDate}`;

  return await client.get<TRoot<TRequestAll[]>>(url);
};

export const getAllRequests = async ({
  page,
  pageSize,
  startDate,
  endDate,
}: TAllReqPayload) => {
  const client = await Client();
  let url = `/productRequest?`;
  if (page && pageSize) url = url + `page=${page}&pageSize=${pageSize}&`;
  if (startDate && endDate)
    url = url + `startDate=${startDate}&endDate=${endDate}`;
  return await client.get<TRoot<TRequestAll[]>>(url);
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
  page,
  pageSize,
}: TSearchReqPayload) => {
  const client = await Client();
  let url = `/productRequest/search?`;
  if (page && pageSize) url = url + `page=${page}&pageSize=${pageSize}`;

  return await client.post<TRoot<TRequestAll[]>>(url, formInfo);
};

// Request form endpoints
