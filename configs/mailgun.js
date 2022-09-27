import dotenv from "dotenv";
dotenv.config();

export const mailgunConfig = () => {
  const emailConfig = {
    username: "api",
    key: process.env.MAILGUN_API_KEY,
    domain: process.env.DOMAIN,
    url: process.env.URL,
  };
  return emailConfig;
};
