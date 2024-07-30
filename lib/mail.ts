import { Resend } from "resend";
import { Email } from "../components/email";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;
const from_email = process.env.NEXT_PUBLIC_EMAIL!;

export const sendOrderEmail = async (
  id: string,
  name: string,
  email: string,
  phone: string,
  address: string,
  data: any
) => {
  await resend.emails.send({
    from: from_email,
    to: "tunglam030699@gmail.com",
    subject: `New order - ${id}`,
    react: Email({ name, email, phone, address, data }),
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: from_email,
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: from_email,
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: from_email,
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};
