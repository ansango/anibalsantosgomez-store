import { NextAuthOptions, PagesOptions, type SessionOptions } from "next-auth";
import { type Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { providers } from "./providers";
import { callbacks } from "./callbacks";
import { events } from "./events";

const adapter: Adapter = PrismaAdapter(new PrismaClient());

const session: Partial<SessionOptions> = {
  strategy: "database",
  maxAge: 60 * 60 * 24 * 30,
};

const pages: Partial<PagesOptions> = {
  signIn: "/signin",
};

const secret: string | undefined = process.env.NEXT_AUTH_SECRET;

const authOptions: NextAuthOptions = {
  providers,
  session,
  adapter,
  callbacks,
  events,
  pages,
  secret,
  useSecureCookies: false, // set to true in production
};

export default authOptions;
