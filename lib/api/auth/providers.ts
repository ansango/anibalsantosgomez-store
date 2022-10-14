import { sendVerification } from "../../mail/sendVerification";
import { type Provider } from "next-auth/providers";
import Email from "next-auth/providers/email";
import Google from "next-auth/providers/google";

export const EmailProvider = Email({
  server: {
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || "587", 10),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  },
  from: process.env.EMAIL_FROM || "",
  sendVerificationRequest({
    identifier: email,
    url,
    provider: { server, from },
  }) {
    sendVerification({
      identifier: email,
      url,
      provider: { server, from },
      theme: {
        brandColor: "#346df1",
        buttonText: "#fff",
      },
    });
  },
});

const GoogleProvider = Google({
  clientId: process.env.GOOGLE_CLIENT_ID || "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  authorization: {
    params: {
      prompt: "consent",
      access_type: "offline",
      response_type: "code",
    },
  },
});

export const providers: Provider[] = [EmailProvider, GoogleProvider];
