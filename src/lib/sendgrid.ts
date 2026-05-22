import sgMail from "@sendgrid/mail";
import {
  buildContactEmailHtml,
  buildContactEmailText,
  type ContactFormData,
} from "@/lib/contact-form";
import { siteConfig } from "@/lib/site";

function getSendGridConfig() {
  const apiKey = process.env.SENDGRID_API_KEY;
  const from = process.env.SENDGRID_FROM_EMAIL;
  const to = process.env.SENDGRID_TO_EMAIL ?? siteConfig.email;

  if (!apiKey || !from) {
    return null;
  }

  return { apiKey, from, to };
}

export async function sendContactBriefEmail(data: ContactFormData) {
  const config = getSendGridConfig();
  if (!config) {
    throw new Error("Email service is not configured.");
  }

  sgMail.setApiKey(config.apiKey);

  await sgMail.send({
    to: config.to,
    from: { email: config.from, name: siteConfig.name },
    replyTo: data.email,
    subject: `New brief: ${data.company} — ${data.name}`,
    text: buildContactEmailText(data),
    html: buildContactEmailHtml(data),
  });
}
