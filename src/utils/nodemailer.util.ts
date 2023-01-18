import { createTransport } from "nodemailer";
import { IEmailRequest } from "../interfaces/email.interface";
import "dotenv/config";

const sendEmail = async ({
  subject,
  text,
  html,
  to,
}: IEmailRequest): Promise<void> => {
  const transporter = createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    requireTLS: true,
  });

  await transporter
    .sendMail({
      from: process.env.SMTP_USER,
      to: to,
      subject: subject,
      html: html,
      text: text,
    })
    .then(() => {
      console.log("Email send with success");
    })
    .catch((err) => {
      console.log(err);
      throw new Error("Error sending email, try again later");
    });
};

export { sendEmail };
