import { resendClient, sender } from "../lib/resend";
import { createWelcomeEmailTemplate } from "./emailTemplate";

export const sendWelcomeEmail = async (email, name, cientURL) => {
    const {data, error} =  await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: "Welcome to TMchat!",
        html: createWelcomeEmailTemplate(name, cientURL),
    })
}