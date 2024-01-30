import axios from "axios";
import { getServerSession } from "next-auth";

export const Client = async () => {
  const session = await getServerSession();

  const client = axios.create({
    baseURL:
      process.env.NODE_ENV === "production"
        ? "https://iapkmjspxh.us-east-1.awsapprunner.com/"
        : "https://h2rwx2fbhm.us-east-1.awsapprunner.com/",
    headers: {
      "Content-Type": "application/json",
      Authorization: session?.access_token
        ? `Bearer ${session.access_token}`
        : ``,
    },
  });
  return client;
};
