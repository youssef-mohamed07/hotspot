import { NextResponse } from "next/server";
import { parseContactForm } from "@/lib/contact-form";
import { sendContactBriefEmail } from "@/lib/sendgrid";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const data = parseContactForm(body);
  if (!data) {
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
  }

  try {
    await sendContactBriefEmail(data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json(
      { error: "We could not send your brief. Please try again or contact us on WhatsApp." },
      { status: 500 },
    );
  }
}
