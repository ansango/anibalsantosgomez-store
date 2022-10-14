import { type CallbacksOptions } from "next-auth";

export const callbacks: Partial<CallbacksOptions> = {
  async signIn({ user, account, profile, email, credentials }) {
    return true;
  },
  async redirect({ url, baseUrl }) {
    const isSignInPage = url.includes("signin");
    if (isSignInPage) {
      return `${baseUrl}/dashboard`;
    }
    return url;
  },
  async session({
    session,
    token,
    user,
  }: {
    session: any;
    token: any;
    user: any;
  }) {
    session.user.roles = user.roles;
    session.user.id = user.id;
    return session;
  },
};
