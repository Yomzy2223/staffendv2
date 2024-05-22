import { Client, TFormCreate, TRoot, TSubFormCreate, TSubFormGet } from "..";
import { TPartnerFormGet, TPartnerFormQA, TPartnerFormRes } from "./types";

// Partner form endpoints
export const createPartnerForm = async ({
  country,
  formInfo,
}: {
  country: string;
  formInfo: TFormCreate;
}) => {
  const client = await Client();
  return await client.post<TRoot<TPartnerFormRes>>(
    `/partner/form/${country}`,
    formInfo
  );
};

export const updatePartnerForm = async ({
  id,
  formInfo,
}: {
  id: string;
  formInfo: TFormCreate;
}) => {
  const client = await Client();
  return await client.put<TRoot<TPartnerFormRes>>(
    `/partner/form/${id}`,
    formInfo
  );
};

export const deletePartnerForm = async (id: string) => {
  const client = await Client();
  return await client.delete<TRoot>(`/partner/form/${id}`);
};

export const getPartnerForm = async (id: string) => {
  const client = await Client();
  return await client.get<TRoot<TPartnerFormGet>>(`/partner/form/${id}`);
};

export const getCountryPartnerForm = async (country: string) => {
  const client = await Client();
  return await client.get<TRoot<TPartnerFormGet[]>>(
    `/partner/forms/${country?.toLowerCase()}`
  );
};

export const createPartnerSubForm = async ({
  formId,
  formInfo,
}: {
  formId: string;
  formInfo: TSubFormCreate;
}) => {
  const client = await Client();
  return await client.post<TRoot<TSubFormGet>>(
    `/partner/subform/${formId}`,
    formInfo
  );
};

export const updatePartnerSubForm = async ({
  id,
  formInfo,
}: {
  id: string;
  formInfo: TSubFormCreate;
}) => {
  const client = await Client();
  return await client.put<TRoot<TSubFormGet>>(
    `/partner/subform/${id}`,
    formInfo
  );
};

export const deletePartnerSubForm = async (id: string) => {
  const client = await Client();
  return await client.delete<TRoot>(`/partner/subform/${id}`);
};

export const getPartnerSubForm = async (id: string) => {
  const client = await Client();
  return await client.get<TRoot<TSubFormGet>>(`/partner/subform/${id}`);
};

export const getPartnerFormQA = async (userId: string) => {
  const client = await Client();
  return await client.get<TRoot<TPartnerFormQA[]>>(
    `/partner/formAnswer/${userId}`
  );
};

export const activatePartner = async (userId: string) => {
  const client = await Client();
  return await client.post<TRoot>(`/partner/activate/${userId}`);
};

export const deActivatePartner = async (userId: string) => {
  const client = await Client();
  return await client.post<TRoot>(`/partner/deactivate/${userId}`);
};

export const declinePartner = async (userId: string) => {
  const client = await Client();
  return await client.post<TRoot>(`/partner/decline/${userId}`);
};
