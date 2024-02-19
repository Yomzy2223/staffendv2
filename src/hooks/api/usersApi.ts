import { Client } from "@/lib/axios";

interface signInType {
  email: string;
  password: string;
}

interface signUpType extends signInType {
  fullName: string;
  referral: string;
  isPartner: boolean;
  isStaff: boolean;
}

interface resetType {
  token: string;
  password: string;
}

export const signUp = async (formInfo: signUpType) => {
  const client = await Client();
  return await client.post("/users", formInfo);
};

export const signIn = async (formInfo: signInType) => {
  const client = await Client();
  return await client.post("/users/login", formInfo);
};

export const forgotPassword = async (email: string) => {
  const client = await Client();
  return await client.post("/users/forgotpassword", { email });
};

export const resetPassword = async (formInfo: resetType) => {
  const client = await Client();
  return await client.post("/users/passwordreset", formInfo);
};

export const verifyUserEmail = async (token: string) => {
  const client = await Client();
  return await client.post(`/users/verification/${token}`);
};

export const updateUser = async ({ id, formInfo }: { id: string; formInfo: signUpType }) => {
  const client = await Client();
  return await client.put(`/users/${id}`, formInfo);
};

export const deleteUser = async (id: string) => {
  const client = await Client();
  return await client.delete(`/users/${id}`);
};

export const getUser = async (id: string) => {
  const client = await Client();
  return await client.get(`/users/${id}`);
};

export const getAllUsers = async () => {
  const client = await Client();
  return await client.get(`/users`);
};
