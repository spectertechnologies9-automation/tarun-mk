import { NextResponse } from "next/server";
import { validateContact, type ContactInput } from "@/lib/validate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * CONTACT FORM BACKEND
 * ---------------------------------------------------------------
 * Configure ONE of the following in your hosting environment variables:
 *
 *  A) Resend (recommended)
 *       RESEND_API_KEY=re_xxx
 *       CONTACT_TO_EMAIL=you@example.com
 *       CONTACT_FROM_EMAIL="Portfolio <contact@your-verified-domain.com>"   (optional)
 *
 *  B) Formspree (or any compatible JSON endpoint)
 *       FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxx
 *
 * If neither is configured the API answers 503 `not_configured` and the form
 * tells the visitor honestly that the message was NOT sent — it never fakes success.
 */

// Very small in-memory rate limit (per server instance). Good enough as a first line of defence.
const hits = new Map<string, { n: number; t: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.t > WINDOW_MS) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  h.n += 1;
  return h.n > MAX_HITS;
}

function clean(v: unknown, max: number): string {
  return typeof v === "string" ? v.slice(0, max) : "";
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const input: ContactInput = {
    name: clean(body.name, 200),
    email: clean(body.email, 300),
    company: clean(body.company, 200),
    subject: clean(body.subject, 300),
    message: clean(body.message, 6000),
  };
  const errors = validateContact(input);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, error: "validation", fields: errors }, { status: 422 });
  }

  const text = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Company: ${input.company || "-"}`,
    `Subject: ${input.subject}`,
    "",
    input.message,
  ].join("\n");

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const formspree = process.env.FORMSPREE_ENDPOINT;

  try {
    if (resendKey && to) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
          to: [to],
          reply_to: input.email,
          subject: `[Portfolio] ${input.subject}`,
          text,
        }),
      });
      if (!res.ok) {
        return NextResponse.json({ ok: false, error: "provider_error" }, { status: 502 });
      }
      return NextResponse.json({ ok: true });
    }

    if (formspree) {
      const res = await fetch(formspree, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...input, _replyto: input.email }),
      });
      if (!res.ok) {
        return NextResponse.json({ ok: false, error: "provider_error" }, { status: 502 });
      }
      return NextResponse.json({ ok: true });
    }
  } catch {
    return NextResponse.json({ ok: false, error: "provider_error" }, { status: 502 });
  }

  return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
}
