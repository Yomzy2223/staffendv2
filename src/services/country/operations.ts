import { Client } from "..";
import { TCountry } from "./types";

export const createCountry = async ({ formInfo }: { formInfo: TCountry }) => {
  const client = await Client();
  return await client.post(`/countries`, formInfo);
};

export const updateCountry = async ({ id, formInfo }: { id: string; formInfo: TCountry }) => {
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
