"use client";

import { AlertCircle, Check, Loader2, Send } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { links } from "@/config/site";
import { validateContact, type ContactInput, type FieldErrors } from "@/lib/validate";

type State = { kind: "idle" } | { kind: "sending" } | { kind: "success" } | { kind: "error"; message: string };

const empty: ContactInput = { name: "", email: "", company: "", subject: "", message: "" };

export function ContactForm() {
  const [values, setValues] = useState<ContactInput>(empty);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<State>({ kind: "idle" });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name as keyof ContactInput]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setState({ kind: "idle" });
      return;
    }

    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: FieldErrors };

      // Success is shown ONLY when the server confirms the message was handed off.
      if (res.ok && data.ok === true) {
        setValues(empty);
        setState({ kind: "success" });
        return;
      }
      if (data.fields) setErrors(data.fields);

      const message =
        data.error === "not_configured"
          ? "Message not sent — the contact form isn’t connected yet. Please use WhatsApp or call instead."
          : data.error === "rate_limited"
            ? "Too many attempts. Please wait a few minutes or use WhatsApp."
            : data.error === "validation"
              ? "Please check the highlighted fields."
              : "Message not sent due to a server problem. Please try again or use WhatsApp.";
      setState({ kind: "error", message });
    } catch {
      setState({ kind: "error", message: "Message not sent — network error. Please check your connection and try again." });
    }
  }

  const sending = state.kind === "sending";

  const field = (name: keyof ContactInput, label: string, props: { type?: string; required?: boolean; autoComplete?: string } = {}) => (
    <div>
      <label htmlFor={`cf-${name}`} className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-ink/60">
        {label} {props.required ? <span className="text-cobalt">*</span> : <span className="text-white/30">(optional)</span>}
      </label>
      <input
        id={`cf-${name}`}
        name={name}
        type={props.type ?? "text"}
        value={values[name]}
        onChange={onChange}
        autoComplete={props.autoComplete}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `cf-${name}-err` : undefined}
        className={`field ${errors[name] ? "!border-red-500" : ""}`}
        disabled={sending}
      />
      {errors[name] ? (
        <p id={`cf-${name}-err`} className="mt-1.5 text-xs text-red-600">
          {errors[name]}
        </p>
      ) : null}
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-[1.75rem] bg-paper p-6 text-ink sm:p-9" aria-label="Contact form">
      <h3 className="mb-6 font-display text-2xl font-bold tracking-tight">Send a message</h3>

      <div className="grid gap-5 sm:grid-cols-2">
        {field("name", "Name", { required: true, autoComplete: "name" })}
        {field("email", "Email", { type: "email", required: true, autoComplete: "email" })}
        {field("company", "Company", { autoComplete: "organization" })}
        {field("subject", "Subject", { required: true })}
      </div>

      <div className="mt-5">
        <label htmlFor="cf-message" className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-ink/60">
          Message <span className="text-cobalt">*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={onChange}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "cf-message-err" : undefined}
          className={`field resize-y ${errors.message ? "!border-red-500" : ""}`}
          disabled={sending}
        />
        {errors.message ? (
          <p id="cf-message-err" className="mt-1.5 text-xs text-red-600">
            {errors.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot — hidden from people and assistive tech */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={sending} className="btn btn-ink min-h-14 px-8 disabled:opacity-60">
          {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          {sending ? "Sending…" : "Send Message"}
        </button>

        <div aria-live="polite" className="text-sm">
          {state.kind === "success" ? (
            <p className="flex items-center gap-2 text-emerald-700">
              <Check size={16} /> Message sent. Thank you — I’ll get back to you soon.
            </p>
          ) : null}
          {state.kind === "error" ? (
            <p className="flex items-start gap-2 text-red-600">
              <AlertCircle size={16} className="mt-0.5 flex-none" />
              <span>
                {state.message}{" "}
                <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                  Open WhatsApp
                </a>
              </span>
            </p>
          ) : null}
        </div>
      </div>
    </form>
  );
}
