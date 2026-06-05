import { track } from "@vercel/analytics/server";
import { NextResponse } from "next/server";
import { parseContactForm } from "@/lib/contact-form";
import { MarketingEvents } from "@/lib/marketing/events";
import { sendContactBriefEmail, sendUserConfirmationEmail } from "@/lib/resend";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch (err) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const data = parseContactForm(body);
  if (!data) {
    return NextResponse.json({ error: "Invalid or missing form fields" }, { status: 400 });
  }

  try {
    // Send email to admin
    await sendContactBriefEmail(data);

    // Attempt to send confirmation to user (do not fail the request if it errors)
    try {
      await sendUserConfirmationEmail(data);
    } catch (userEmailErr) {
      console.error("[contact] Failed to send user confirmation email:", userEmailErr);
    }

    await track(MarketingEvents.lead, {
      utm_source: data.attribution?.utm_source ?? "direct",
      utm_campaign: data.attribution?.utm_campaign ?? "none",
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json(
      { error: "We could not send your brief. Please try again or contact us on WhatsApp." },
      { status: 500 },
    );
  }
}
