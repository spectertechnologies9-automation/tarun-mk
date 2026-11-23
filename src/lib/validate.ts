export type ContactInput = {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
};

export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Shared by the client form and the API route so both enforce the same rules. */
export function validateContact(v: ContactInput): FieldErrors {
  const e: FieldErrors = {};
  const name = v.name.trim();
  const email = v.email.trim();
  const subject = v.subject.trim();
  const message = v.message.trim();

  if (name.length < 2) e.name = "Please enter your name.";
  else if (name.length > 100) e.name = "Name is too long.";

  if (!EMAIL_RE.test(email)) e.email = "Please enter a valid email address.";
  else if (email.length > 254) e.email = "Email is too long.";

  if (v.company.trim().length > 120) e.company = "Company name is too long.";

  if (subject.length < 3) e.subject = "Please add a short subject.";
  else if (subject.length > 150) e.subject = "Subject is too long.";

  if (message.length < 10) e.message = "Please write at least a few words (10+ characters).";
  else if (message.length > 5000) e.message = "Message is too long (max 5000 characters).";

  return e;
}
