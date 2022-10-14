import { basicTemplate } from "./templates/basic";
import { textBody } from "./textBody";
import { type Theme } from "next-auth";
import { createTransport } from "nodemailer";

export async function sendVerification({
  identifier,
  url,
  provider,
  theme,
}: {
  identifier: string;
  url: string;
  provider: any;
  theme: Theme;
}) {
  const { host } = new URL(url);
  const transport = createTransport(provider.server);
  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: `Sign in to ${host}`,
    text: textBody({ text: "Sign in to", url, host }),
    html: basicTemplate({ url, host, theme }),
  });
  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
  }
}
