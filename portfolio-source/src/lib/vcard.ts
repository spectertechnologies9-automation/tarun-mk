import { site } from "@/config/site";

/** Builds a valid vCard 3.0 string (CRLF line endings, as required by RFC 2425/2426). */
export function buildVCard(): string {
  const { vcard, contact } = site;
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${vcard.fullName}`,
    `N:${vcard.family};${vcard.given};;;`,
    `TEL;TYPE=CELL:${contact.phoneE164}`,
  ];
  if (contact.email) lines.push(`EMAIL;TYPE=INTERNET:${contact.email}`);
  lines.push("END:VCARD");
  return lines.join("\r\n") + "\r\n";
}
