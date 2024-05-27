import { Client, TRoot } from "..";
import { TResetPassword, TSignIn, TSignUp, TUser, TUserDocCreate, TUserDocGet } from "./types";

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

export const updateUser = async ({ id, formInfo }: { id: string; formInfo: TSignUp }) => {
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
  return await client.get<TRoot<TUser[]>>(`/users?isPartner=${isPartner}&isStaff=${isStaff}`);
};

//

//

//

export const approveUserDoc = async (id: string) => {
  const client = await Client();
  return client.put<TRoot>(`/userDocument/approve/${id}`);
};

export const getUserDoc = async (id: string) => {
  const client = await Client();
  return client.get<TRoot<TUserDocGet>>(`/userDocument/${id}`);
};

export const getUserRequestDoc = async (requestId: string) => {
  const client = await Client();
  return client.get<TRoot<TUserDocGet[]>>(`/userDocument/request/${requestId}`);
};

export const getUserBusinessDoc = async (businessId: string) => {
  const client = await Client();
  return client.get<TRoot<TUserDocGet>>(`/userDocument/business/${businessId}`);
};
