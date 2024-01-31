import { NextRequest } from "next/server";

export { default } from "next-auth/middleware";

export const config = {
  matcher: "/",
};

export const middleware = async (req: NextRequest) => {
  console.log("From middleware", req);
};
