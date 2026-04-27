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
      const isUserRoute = nextUrl.pathname.startsWith("/user");
      const isAdmin = auth?.user?.role === "ADMIN";

      if (isUserRoute && isAdmin) {
        return Response.redirect(new URL("/admin/dashboard", nextUrl));
      }

      if (isAdminRoute && !isAdmin) {
        return Response.redirect(new URL("/user/dashboard", nextUrl));
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.tenantId = user.tenantId;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.role = token.role as string;
        session.user.tenantId = token.tenantId as string;
      }
      return session;
    },
  },
};
