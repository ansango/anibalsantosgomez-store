/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
export const textBody = ({
  text,
  url,
  host,
}: {
  text: string;
  url: string;
  host: string;
}) => {
  return `${text} ${host}\n${url}\n\n`;
};
