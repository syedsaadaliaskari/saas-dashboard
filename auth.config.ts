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
      const role = auth?.user?.role;
      const tenantId = auth?.user?.tenantId;
      const isAdmin = role === "ADMIN";

      const isAuthPage =
        nextUrl.pathname.startsWith("/signin") ||
        nextUrl.pathname.startsWith("/signup");
      const isOnboarding = nextUrl.pathname.startsWith("/onboarding");
      const isAdminRoute = nextUrl.pathname.startsWith("/admin");
      const isUserRoute = nextUrl.pathname.startsWith("/user");

      if (!isLoggedIn) {
        if (isAuthPage || isOnboarding) return true;
        return false;
      }

      if (isAuthPage) {
        if (isAdmin) return Response.redirect(new URL("/admin", nextUrl));
        return Response.redirect(new URL("/user", nextUrl));
      }

      if (isOnboarding && tenantId) {
        if (isAdmin) return Response.redirect(new URL("/admin", nextUrl));
        return Response.redirect(new URL("/user", nextUrl));
      }

      if (!tenantId && !isOnboarding) {
        return Response.redirect(new URL("/onboarding", nextUrl));
      }

      if (isUserRoute && isAdmin) {
        return Response.redirect(new URL("/admin", nextUrl));
      }

      if (isAdminRoute && !isAdmin) {
        return Response.redirect(new URL("/user", nextUrl));
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
