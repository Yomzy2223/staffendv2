import { Client } from "@/lib/axios";
import { IForm, ISubForm } from "./types";

// Partner form endpoints
export const createPartnerForm = async ({
  country,
  formInfo,
}: {
  country: string;
  formInfo: IForm;
}) => {
  const client = await Client();
  return await client.post(`/partner/form/${country}`, formInfo);
};

export const updatePartnerForm = async ({
  id,
  formInfo,
}: {
  id: string;
  formInfo: IForm;
}) => {
  const client = await Client();
  return await client.put(`/partner/form/${id}`, formInfo);
};

export const deletePartnerForm = async (id: string) => {
  const client = await Client();
  return await client.delete(`/partner/form/${id}`);
};

export const getPartnerForm = async (id: string) => {
  const client = await Client();
  return await client.get(`/partner/form/${id}`);
};

export const getCountryPartnerForm = async (country: string) => {
  const client = await Client();
  return await client.get(`/partner/forms/${country}`);
};

export const createPartnerSubForm = async ({
  formId,
  formInfo,
}: {
  formId: string;
  formInfo: ISubForm;
}) => {
  const client = await Client();
  return await client.post(`/partner/subform/${formId}`, formInfo);
};

export const updatePartnerSubForm = async ({
  id,
  formInfo,
}: {
  id: string;
  formInfo: ISubForm;
}) => {
  const client = await Client();
  return await client.put(`/partner/subform/${id}`, formInfo);
};

export const deletePartnerSubForm = async (id: string) => {
  const client = await Client();
  return await client.delete(`/partner/subform/${id}`);
};

export const getPartnerSubForm = async (id: string) => {
  const client = await Client();
  return await client.get(`/partner/subform/${id}`);
};
