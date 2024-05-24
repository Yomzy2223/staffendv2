import { Client, TRoot } from "..";
import {
  TAllReqPayload,
  TBusinessInfoCreate,
  TBusinessInfoGet,
  TRequestForm,
  TRequestAll,
  TRequestGet,
  TSearchReqArgs,
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
  return await client.get<TRoot<TRequestForm[]>>(
    `/productRequest/form/${requestId}`
  );
};

export const getBusinessDetails = async (requestId: string) => {
  const client = await Client();
  return await client.get<TRoot<TBusinessInfoGet>>(
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

export const getSearchRequest = async ({
  queryString,
  page,
  pageSize,
  serviceId,
  startDate,
  endDate,
}: TSearchReqArgs) => {
  const client = await Client();
  let url = `/productRequest/general/search?queryString=${queryString}`;

  if (page && pageSize) url = url + `&page=${page}&pageSize=${pageSize}`;
  if (serviceId) url = url + `&serviceId=${serviceId}`;
  if (startDate && endDate)
    url = url + `&startDate=${startDate}&endDate=${endDate}`;

  return await client.get<TRoot<TRequestAll[]>>(url);
};

export const getRequestBusiness = async (requestId: string) => {
  const client = await Client();
  return client.get<TRoot<TBusinessInfoGet[]>>(
    `/businessRequest/request/${requestId}`
  );
};

export const updateBusinessInfo = async ({
  id,
  formInfo,
}: {
  id: string;
  formInfo: TBusinessInfoCreate;
}) => {
  const client = await Client();
  return client.post<TRoot<TBusinessInfoGet>>(
    `/businessRequest/${id}`,
    formInfo
  );
};
