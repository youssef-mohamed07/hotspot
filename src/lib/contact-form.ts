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
