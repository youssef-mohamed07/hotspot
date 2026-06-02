import { Resend } from "resend";
import {
  buildContactEmailHtml,
  buildContactEmailText,
  buildUserConfirmationEmailHtml,
  type ContactFormData,
} from "@/lib/contact-form";

function getResendConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const fromName = process.env.EMAIL_FROM_NAME || "Hotsspots";
  const fromAddress =
    process.env.EMAIL_FROM_ADDRESS || "noreply@cyberstage.hotsspots.com";
  const to = process.env.EMAIL_TO_ADDRESS;

  if (!apiKey || !fromAddress || !to) {
    return null;
  }

  return { apiKey, fromName, fromAddress, to };
}

export async function sendContactBriefEmail(data: ContactFormData) {
  const config = getResendConfig();
  if (!config) {
    throw new Error("[sendContactBriefEmail] Email service is not configured.");
  }

  const resend = new Resend(config.apiKey);

  const { data: result, error } = await resend.emails.send({
    to: config.to,
    from: `${config.fromName} <${config.fromAddress}>`,
    replyTo: data.email,
    subject: `New brief: ${data.company} — ${data.name}`,
    text: buildContactEmailText(data),
    html: buildContactEmailHtml(data),
  });

  if (error) {
    throw new Error(`Resend Error: ${error.message}`);
  }

  return result;
}

export async function sendUserConfirmationEmail(data: ContactFormData) {
  const config = getResendConfig();
  if (!config) {
    throw new Error(
      "[sendUserConfirmationEmail] Email service is not configured.",
    );
  }

  const resend = new Resend(config.apiKey);

  const { data: result, error } = await resend.emails.send({
    to: data.email,
    from: `HotSpot Team <${config.fromAddress}>`,
    subject: `We received your brief for ${data.company}`,
    html: buildUserConfirmationEmailHtml(data),
  });

  if (error) {
    throw new Error(`Resend User Confirmation Error: ${error.message}`);
  }

  return result;
}
