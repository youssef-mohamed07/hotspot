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
};

export function parseContactForm(body: unknown): ContactFormData | null {
  if (!body || typeof body !== "object") return null;

  const raw = body as Record<string, unknown>;
  const str = (key: keyof ContactFormData) =>
    typeof raw[key] === "string" ? (raw[key] as string).trim() : "";

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

  return `
    <div style="font-family:system-ui,sans-serif;max-width:560px">
      <h2 style="color:#18181b;margin:0 0 16px">New activation brief</h2>
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
        ${row("Notes", data.notes.replace(/\n/g, "<br>"))}
      </table>
    </div>
  `;
}

export function buildContactEmailText(data: ContactFormData) {
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
    ["Notes", data.notes],
  ].filter(([, v]) => v);

  return `New activation brief\n\n${lines.map(([k, v]) => `${k}: ${v}`).join("\n")}`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
