import { Client } from "@/lib/axios";
import { TRoot } from "..";
import { TResetPassword, TSignIn, TSignUp, TUser } from "./types";

export const signUp = async (formInfo: TSignUp) => {
  const client = await Client();
  return await client.post<TRoot<TUser>>("/users", formInfo);
};

export const signIn = async (formInfo: TSignIn) => {
  const client = await Client();
  return await client.post<TRoot<TUser>>("/users/login", formInfo);
};

export const forgotPassword = async (email: string) => {
  const client = await Client();
  return await client.post("/users/forgotpassword", { email });
};

export const resetPassword = async (formInfo: TResetPassword) => {
  const client = await Client();
  return await client.post("/users/passwordreset", formInfo);
};

export const verifyUserEmail = async (token: string) => {
  const client = await Client();
  return await client.post(`/users/verification/${token}`);
};

export const updateUser = async ({
  id,
  formInfo,
}: {
  id: string;
  formInfo: TSignUp;
}) => {
  const client = await Client();
  return await client.put(`/users/${id}`, formInfo);
};

export const deleteUser = async (id: string) => {
  const client = await Client();
  return await client.delete(`/users/${id}`);
};

export const getUser = async (id: string) => {
  const client = await Client();
  return await client.get<TRoot<TUser>>(`/users/${id}`);
};

export const getAllUsers = async ({
  isPartner = false,
  isStaff = false,
}: {
  isPartner?: boolean;
  isStaff?: boolean;
}) => {
  const client = await Client();
  return await client.get<TRoot<TUser[]>>(
    `/users?isPartner=${isPartner}&isStaff=${isStaff}`
  );
};
