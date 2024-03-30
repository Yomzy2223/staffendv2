import { Client } from "@/lib/axios";
import { IPartnerForm } from "./types";

// Partner form endpoints
export const createPartnerForm = async ({
  country,
  formInfo,
}: {
  country: string;
  formInfo: IPartnerForm;
}) => {
  const client = await Client();
  return await client.post(`/partner/form/${country}`, formInfo);
};

export const updatePartnerForm = async ({
  id,
  country,
  formInfo,
}: {
  id: string;
  country: string;
  formInfo: IPartnerForm;
}) => {
  const client = await Client();
  return await client.put(`/partner/form/${id}/${country}`, formInfo);
};

export const deletePartnerForm = async (id: string) => {
  const client = await Client();
  return await client.delete(`/partner/form/${id}`);
};

export const getPartnerForm = async (country: string) => {
  const client = await Client();
  return await client.get(`/partner/form/${country}`);
};

export const getAllPartnerForm = async () => {
  const client = await Client();
  return await client.get(`/partner/form`);
};
