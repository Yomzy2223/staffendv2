export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/", "/services/:path*", "/countries", "/faq", "/partners"],
};
