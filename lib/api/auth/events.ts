import { type EventCallbacks } from "next-auth";

export const events: Partial<EventCallbacks> = {
  async signIn({ user }) {
    /* on successful sign in */
  },
  async signOut({ session }) {
    /* on signout */
  },
  async createUser({ user }) {
    /* user created */
  },
  async updateUser({ user }) {
    /* user updated - e.g. their email was verified */
  },
  async linkAccount({ user }) {
    /* account (e.g. Twitter) linked to a user */
  },
  async session({ session }) {
    /* session is active */
  },
};
