import { expressWrapper, type NextHandler } from "next-connect";
import cors from "cors";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import authOptions from "../auth";
export const corsMiddleware = expressWrapper(cors());

export const session = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  const sessionData = await unstable_getServerSession(req, res, authOptions);
  if (!sessionData) {
    return res.status(403).end("You must be logged in.");
  }
  next();
};

export const sessionMiddleware = expressWrapper(session);
