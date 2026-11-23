import { buildVCard } from "@/lib/vcard";
import { site } from "@/config/site";

export const dynamic = "force-dynamic";

/**
 * Serves the contact card as a real .vcf file.
 * - iOS Safari: served inline so it opens the native "Add Contact" sheet.
 * - Android / desktop: served as an attachment so the file downloads and
 *   can be opened with Contacts.
 */
export function GET(request: Request) {
  const ua = request.headers.get("user-agent") ?? "";
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const filename = site.vcard.filename;

  return new Response(buildVCard(), {
    status: 200,
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `${isIOS ? "inline" : "attachment"}; filename="${filename}"`,
      "Cache-Control": "public, max-age=3600",
      Vary: "User-Agent",
    },
  });
}
