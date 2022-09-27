import { mailgunConfig } from "../configs/mailgun.js";
import Mailgun from "mailgun.js";
import formData from "form-data";

const mailgun = new Mailgun(formData);
const mg = mailgun.client(mailgunConfig());

export const signupSuccess = (name, email, password) => {
  const data = {
    from: "Fixa  <info@mg.fixa.com.ng>",
    to: email,
    subject: "Hello",
    template: "signin-success",
    "h:X-Mailgun-Variables": JSON.stringify({ name, email, password }),
    "h:Reply-To": "reply-to@example.com",
  };

  sendmessage(data);
};

export const verifyemail = (email, link) => {
  const data = {
    from: "Fixa  <info@mg.fixa.com.ng>",
    to: email,
    subject: "verify email",
    template: "forgot-password",
    "h:X-Mailgun-Variables": JSON.stringify({ link }),
    "h:Reply-To": "reply-to@example.com",
  };

  sendmessage(data);
};

export const forgotPassword = (email, link) => {
  const data = {
    from: "Fixa  <info@mg.fixa.com.ng>",
    to: email,
    subject: "password reset",
    template: "forgot-password",
    "h:X-Mailgun-Variables": JSON.stringify({ link }),
    "h:Reply-To": "reply-to@example.com",
  };

  sendmessage(data);
};

const sendmessage = (data) => {
  mg.messages
    .create(emailConfig.domain, data)
    .then((msg) => console.log(msg)) // logs response data
    .catch((err) => console.log(err)); // logs any error
};
