import { Client, TFormCreate, TRoot, TSubFormCreate, TSubFormGet } from "..";
import { TOnboardFormGet, TOnboardFormQA, TOnboardFormRes } from "./types";

export const createOnboardForm = async ({
  country,
  formInfo,
}: {
  country: string;
  formInfo: TFormCreate;
}) => {
  const client = await Client();
  return await client.post<TRoot<TOnboardFormRes>>(`/onboard/form/${country}`, formInfo);
};

export const updateOnboardForm = async ({
  id,
  formInfo,
}: {
  id: string;
  formInfo: TFormCreate;
}) => {
  const client = await Client();
  return await client.put<TRoot<TOnboardFormRes>>(`/onboard/form/${id}`, formInfo);
};

export const deleteOnboardForm = async (id: string) => {
  const client = await Client();
  return await client.delete<TRoot>(`/onboard/form/${id}`);
};

export const getOnboardForm = async (id: string) => {
  const client = await Client();
  return await client.get<TRoot<TOnboardFormGet>>(`/onboard/form/${id}`);
};

export const getCountryOnboardForm = async (country: string) => {
  const client = await Client();
  return await client.get<TRoot<TOnboardFormGet[]>>(`/onboard/forms/${country.toLowerCase()}`);
};

export const createOnboardSubForm = async ({
  formId,
  formInfo,
}: {
  formId: string;
  formInfo: TSubFormCreate;
}) => {
  const client = await Client();
  return await client.post<TRoot<TSubFormGet>>(`/onboard/subform/${formId}`, formInfo);
};

export const updateOnboardSubForm = async ({
  id,
  formInfo,
}: {
  id: string;
  formInfo: TSubFormCreate;
}) => {
  const client = await Client();
  return await client.put<TRoot<TSubFormGet>>(`/onboard/subform/${id}`, formInfo);
};

export const deleteOnboardSubForm = async (id: string) => {
  const client = await Client();
  return await client.delete<TRoot>(`/onboard/subform/${id}`);
};

export const getOnboardSubForm = async (id: string) => {
  const client = await Client();
  return await client.get<TRoot<TSubFormGet>>(`/onboard/subform/${id}`);
};

export const getOnboardFormQA = async (userId: string) => {
  const client = await Client();
  return await client.get<TRoot<TOnboardFormQA[]>>(`/onboard/formAnswer/${userId}`);
};
