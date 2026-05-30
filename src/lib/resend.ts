import { Resend } from "resend";
import {
  buildContactEmailHtml,
  buildContactEmailText,
  type ContactFormData,
} from "@/lib/contact-form";

function getResendConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const fromName = process.env.EMAIL_FROM_NAME || "Build8 Website";
  const fromAddress = process.env.EMAIL_FROM_ADDRESS || "noreply@build8.dev";
  const to = process.env.EMAIL_TO_ADDRESS;

  if (!apiKey || !fromAddress || !to) {
    return null;
  }

  return { apiKey, fromName, fromAddress, to };
}

export async function sendContactBriefEmail(data: ContactFormData) {
  const config = getResendConfig();
  if (!config) {
    throw new Error("Email service is not configured.");
  }

  const resend = new Resend(config.apiKey);

  const { data: result, error } = await resend.emails.send({
    to: config.to,
    from: `${config.fromName} <${config.fromAddress}>`,
    reply_to: data.email,
    subject: `New brief: ${data.company} — ${data.name}`,
    text: buildContactEmailText(data),
    html: buildContactEmailHtml(data),
  });

  if (error) {
    throw new Error(`Resend Error: ${error.message}`);
  }

  return result;
}
