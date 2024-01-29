import NextAuth, { Awaitable, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  providers: [
    GoogleProvider({
      id: "google",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      profile(profile) {
        return { id: profile.sub, ...profile };
      },
    }),
    CredentialsProvider({
      id: "signIn",
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      authorize(credentials, req) {
        return credentials as Awaitable<User>;
      },
    }),
  ],
  callbacks: {
    // async signIn({ user, account, email, credentials, profile }) {
    //   return true;
    // },
    async redirect({ baseUrl, url }) {
      return baseUrl;
    },
    async jwt({ token, account, profile, user, session, trigger }) {
      if (account) {
        token.expires_at = account.expires_at;
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token;
      }
      if (user) {
        token.user = user;
        return token as Awaitable<JWT>;
      }
      if (profile) {
        token.fullname = profile.name;
        token.firstname = profile.given_name;
        token.lastname = profile.family_name;
        token.email = profile.email;
        token.picture = profile.picture;
        token.expires_at = profile.exp;
      }
      return token as Awaitable<JWT>;
    },
    async session({ newSession, session, token, trigger, user }) {
      // console.log(newSession, session, token, trigger, user);
      session.user = {
        email: token.email,
        fullname: token.fullname,
        firstname: token.firstname,
        lastname: token.lastname,
        picture: token.picture,
      };
      session.expires_at = token.expires_at;
      session.access_token = token.access_token;
      session.refresh_token = token.refresh_token;
      console.log("Returning session", session);
      return session as Awaitable<Session>;
    },
  },
});

export { handler as GET, handler as POST };
