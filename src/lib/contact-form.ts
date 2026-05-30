import type { AttributionData } from "@/lib/marketing/attribution";

export type ContactFormData = {
  name: string;
  company: string;
  email: string;
  whatsapp: string;
  industry: string;
  campaignType: string;
  targetCities: string;
  campaignDate: string;
  budget: string;
  notes: string;
  contactMethod: string;
  meetingDate: string;
  attribution?: AttributionData;
};

export function parseContactForm(body: unknown): ContactFormData | null {
  if (!body || typeof body !== "object") return null;

  const raw = body as Record<string, unknown>;
  const str = (key: keyof ContactFormData) =>
    typeof raw[key] === "string" ? (raw[key] as string).trim() : "";

  const attribution =
    raw.attribution && typeof raw.attribution === "object"
      ? (raw.attribution as AttributionData)
      : undefined;

  const data: ContactFormData = {
    name: str("name"),
    company: str("company"),
    email: str("email"),
    whatsapp: str("whatsapp"),
    industry: str("industry"),
    campaignType: str("campaignType"),
    targetCities: str("targetCities"),
    campaignDate: str("campaignDate"),
    budget: str("budget"),
    notes: str("notes"),
    contactMethod: str("contactMethod"),
    meetingDate: str("meetingDate"),
    attribution,
  };

  if (
    !data.name ||
    !data.company ||
    !/\S+@\S+\.\S+/.test(data.email) ||
    !data.whatsapp ||
    !data.industry ||
    !data.campaignType ||
    !data.targetCities
  ) {
    return null;
  }

  return data;
}

export function buildUserConfirmationEmailHtml(data: ContactFormData) {
  const firstName = data.name.split(" ")[0];

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Brief Received</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #2a76a6 0%, #04285f 100%); padding: 40px 32px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 0.02em;">Brief Received</h1>
          <p style="color: rgba(255, 255, 255, 0.8); margin: 8px 0 0 0; font-size: 15px;">HotSpot Cyber Stage Activation</p>
        </div>

        <!-- Body -->
        <div style="padding: 40px 32px;">
          <p style="margin: 0 0 16px; color: #27272a; font-size: 16px; line-height: 1.6;">Hi ${escapeHtml(firstName)},</p>
          <p style="margin: 0 0 24px; color: #52525b; font-size: 16px; line-height: 1.6;">
            Thank you for reaching out. We have successfully received your activation brief for <strong>${escapeHtml(data.company)}</strong>.
          </p>

          <!-- Campaign Summary Box -->
          <div style="background-color: #fafafa; border: 1px solid #e4e4e7; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
            <p style="margin: 0 0 12px; color: #a1a1aa; text-transform: uppercase; font-size: 12px; font-weight: 700; letter-spacing: 0.05em;">Campaign Overview</p>
            
            <div style="margin-bottom: 8px;">
              <span style="color: #71717a; font-size: 14px; display: inline-block; width: 120px;">Type:</span>
              <span style="color: #27272a; font-size: 14px; font-weight: 500;">${escapeHtml(data.campaignType)}</span>
            </div>
            
            <div style="margin-bottom: 8px;">
              <span style="color: #71717a; font-size: 14px; display: inline-block; width: 120px;">Locations:</span>
              <span style="color: #27272a; font-size: 14px; font-weight: 500;">${escapeHtml(data.targetCities)}</span>
            </div>

            ${data.campaignDate ? `
            <div>
              <span style="color: #71717a; font-size: 14px; display: inline-block; width: 120px;">Date:</span>
              <span style="color: #27272a; font-size: 14px; font-weight: 500;">${escapeHtml(data.campaignDate)}</span>
            </div>
            ` : ""}
          </div>

          <p style="margin: 0 0 16px; color: #52525b; font-size: 16px; line-height: 1.6;">
            Our team is currently reviewing your requirements. We will be in touch within the next <strong>24 hours</strong> to discuss the scope, timeline, and next steps.
          </p>
          <p style="margin: 0; color: #52525b; font-size: 16px; line-height: 1.6;">
            Speak soon,<br>
            <span style="font-weight: 600; color: #27272a;">The HotSpot Team</span>
          </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #fafafa; border-top: 1px solid #e4e4e7; padding: 24px 32px; text-align: center;">
          <p style="margin: 0; color: #a1a1aa; font-size: 13px;">
            This is an automated confirmation email. You can reply directly to this email if you need to add any additional information to your brief.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function buildContactEmailHtml(data: ContactFormData) {
  const row = (label: string, value: string) =>
    value
      ? `<tr><td style="padding:8px 12px;font-weight:600;color:#52525b;vertical-align:top;width:160px">${label}</td><td style="padding:8px 12px;color:#18181b">${escapeHtml(value)}</td></tr>`
      : "";

  const timestamp = new Date().toLocaleString("en-US", { timeZone: "UTC", timeZoneName: "short" });

  return `
    <div style="font-family:system-ui,sans-serif;max-width:560px">
      <h2 style="color:#18181b;margin:0 0 4px">New activation brief</h2>
      <p style="color:#52525b;font-size:13px;margin:0 0 16px">Submitted on: ${timestamp}</p>
      <table style="width:100%;border-collapse:collapse;background:#fafafa;border-radius:12px">
        ${row("Name", data.name)}
        ${row("Company", data.company)}
        ${row("Email", data.email)}
        ${row("WhatsApp", data.whatsapp)}
        ${row("Industry", data.industry)}
        ${row("Campaign type", data.campaignType)}
        ${row("Target cities", data.targetCities)}
        ${row("Campaign date", data.campaignDate)}
        ${row("Budget", data.budget)}
        ${row("Contact Method", data.contactMethod || "-")}
        ${row("Meeting Date", data.meetingDate || "-")}
        ${row("Notes", data.notes.replace(/\n/g, "<br>"))}
      </table>
      ${attributionBlockHtml(data.attribution)}
    </div>
  `;
}

function attributionBlockHtml(attribution?: AttributionData) {
  if (!attribution) return "";
  const rows = [
    ["utm_source", attribution.utm_source],
    ["utm_medium", attribution.utm_medium],
    ["utm_campaign", attribution.utm_campaign],
    ["utm_content", attribution.utm_content],
    ["utm_term", attribution.utm_term],
    ["fbclid", attribution.fbclid],
    ["landing_page", attribution.landing_page],
    ["referrer", attribution.referrer],
  ].filter(([, v]) => v);

  if (rows.length === 0) return "";

  const inner = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;font-weight:600;color:#52525b">${label}</td><td style="padding:6px 12px;color:#18181b">${escapeHtml(value!)}</td></tr>`,
    )
    .join("");

  return `
    <h3 style="color:#18181b;margin:24px 0 12px;font-size:14px">Campaign attribution</h3>
    <table style="width:100%;border-collapse:collapse;background:#f4f4f5;border-radius:12px">${inner}</table>
  `;
}

export function buildContactEmailText(data: ContactFormData) {
  const timestamp = new Date().toLocaleString("en-US", { timeZone: "UTC", timeZoneName: "short" });

  const lines = [
    ["Name", data.name],
    ["Company", data.company],
    ["Email", data.email],
    ["WhatsApp", data.whatsapp],
    ["Industry", data.industry],
    ["Campaign type", data.campaignType],
    ["Target cities", data.targetCities],
    ["Campaign date", data.campaignDate],
    ["Budget", data.budget],
    ["Contact method", data.contactMethod],
    ["Meeting date", data.meetingDate],
    ["Notes", data.notes],
  ].filter(([, v]) => v);

  let text = `New activation brief\nSubmitted on: ${timestamp}\n\n${lines.map(([k, v]) => `${k}: ${v}`).join("\n")}`;

  if (data.attribution) {
    const attrLines = Object.entries(data.attribution).filter(([, v]) => v);
    if (attrLines.length > 0) {
      text += `\n\n--- Campaign attribution ---\n${attrLines.map(([k, v]) => `${k}: ${v}`).join("\n")}`;
    }
  }

  return text;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
