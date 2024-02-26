import { Client } from "@/lib/axios";
import { ICountry } from "./types";

// Country endpoints
export const createCountry = async ({ formInfo }: { formInfo: ICountry }) => {
  const client = await Client();
  return await client.post(`/countries`, formInfo);
};

export const updateCountry = async ({
  id,
  formInfo,
}: {
  id: string;
  formInfo: ICountry;
}) => {
  const client = await Client();
  return await client.put(`/countries/${id}`, formInfo);
};

export const deleteCountry = async (id: string) => {
  const client = await Client();
  return await client.delete(`/countries/${id}`);
};

export const getCountry = async (id: string) => {
  const client = await Client();
  return await client.get(`/countries/${id}`);
};

export const getCountries = async () => {
  const client = await Client();
  return await client.get(`/countries`);
};
