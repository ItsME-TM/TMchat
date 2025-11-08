import nodemailer from "nodemailer";
import {ENV} from "../lib/env.js";
import dotenv from "dotenv";


dotenv.config();


export const sender = {
  email: ENV.EMAIL_FROM || "no-reply@example.com",
  name: ENV.EMAIL_FROM_NAME || "TMchat",
};

let transporterPromise;

// Create (and cache) a transporter. Uses SMTP env if provided, otherwise falls back to Ethereal test SMTP.
async function getTransporter() {
  if (transporterPromise) return transporterPromise;

  transporterPromise = (async () => {
    const hasSmtpEnv =
      ENV.SMTP_HOST || ENV.SMTP_USER || ENV.SMTP_PASS;

    if (hasSmtpEnv) {
      const host = ENV.SMTP_HOST || "smtp.gmail.com";
      const port = Number(ENV.SMTP_PORT || 587);
      const secure =
        String(ENV.SMTP_SECURE || "false").toLowerCase() === "true" ||
        port === 465;
      const authUser = ENV.SMTP_USER;
      const authPass = ENV.SMTP_PASS;

      return nodemailer.createTransport({
        host,
        port,
        secure,
        auth:
          authUser && authPass ? { user: authUser, pass: authPass } : undefined,
      });
    }

    // Dev/test fallback: Ethereal (free, non-delivering test inbox with preview URL)
    const testAccount = await nodemailer.createTestAccount();
    // If sender email wasn't provided, use the Ethereal user as from-address
    if (!ENV.EMAIL_FROM) {
      sender.email = testAccount.user;
    }
    return nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  })();

  return transporterPromise;
}

// Compatibility wrapper that mimics `resendClient.emails.send({ from, to, subject, html })`
export const resendClient = {
  emails: {
    send: async ({ from, to, subject, html }) => {
      try {
        const transporter = await getTransporter();
        const mailOptions = {
          from,
          to,
          subject,
          html,
        };
        const info = await transporter.sendMail(mailOptions);
        let previewUrl = null;
        try {
          previewUrl = nodemailer.getTestMessageUrl(info);
        } catch (e) {
          // ignore if not a test account
        }
        return {
          data: {
            messageId: info.messageId,
            accepted: info.accepted,
            rejected: info.rejected,
            response: info.response,
            previewUrl,
          },
          error: null,
        };
      } catch (error) {
        return { data: null, error };
      }
    },
  },
};
