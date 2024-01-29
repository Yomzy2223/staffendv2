import NextAuth from "next-auth/next";

interface User {
  email: string;
  fullname?: string;
  firstname: string;
  lastname: string;
  picture: string;
}

interface JWT {}

declare module "next-auth" {
  interface User extends User {}

  interface Session {
    user: typeof User;
    expires_at?: number;
    access_token?: string;
    refresh_token?: string;
  }

  interface Profile extends User {
    name: string;
    family_name: string;
    given_name: string;
    exp: number;
    picture: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends User {
    expires_at?: number;
    access_token?: string;
    refresh_token?: string;
  }
}
