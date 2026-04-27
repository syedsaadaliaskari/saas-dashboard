import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAuthPage =
        nextUrl.pathname.startsWith("/signin") ||
        nextUrl.pathname.startsWith("/signup");

      if (isAuthPage) return true;
      if (!isLoggedIn) return false;

      const isAdminRoute = nextUrl.pathname.startsWith("/admin");
      const isAdmin = auth?.user?.role === "ADMIN";

      if (isAdminRoute && !isAdmin) {
        return Response.redirect(new URL("/user", nextUrl));
      }

      return true;
    },
  },
};
