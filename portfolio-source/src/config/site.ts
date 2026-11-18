/**
 * CENTRAL CONFIGURATION
 * ---------------------------------------------------------------
 * Every personal detail lives here. Edit this file (and the files in
 * src/data) to update the site — no component needs to be touched.
 *
 * Empty strings ("") are placeholders. Links with an empty URL are shown
 * as inactive until you fill them in.
 */

export type SiteConfig = {
  name: string;
  url: string;
  title: string;
  description: string;
  keywords: string[];
  headline: { line1: string; line2: string };
  tagline: string;
  roles: string[];
  /** words that rotate in the hero ("Right now I'm building ...") */
  rotating: string[];
  currentlyBuilding: string;
  heroDescription: string;
  intro: string[];
  contact: {
    phoneDisplay: string;
    phoneE164: string;
    whatsappNumber: string;
    /** PLACEHOLDER — add your real email. Leave "" until supplied. */
    email: string;
  };
  vcard: { fullName: string; family: string; given: string; filename: string };
  socials: {
    /** PLACEHOLDER URLs — add the real ones. Leave "" until supplied. */
    linkedin: string;
    github: string;
    instagram: string;
  };
  /** true = hide social icons that have no URL yet; false = show them dimmed */
  hideUnsetLinks: boolean;
  footerQuote: string;
  copyright: string;
};

export const site: SiteConfig = {
  name: "Tarun M K",
  // Set NEXT_PUBLIC_SITE_URL in your hosting environment (see .env.example)
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  title: "Tarun M K | Technology Founder, AI Developer & Systems Builder",
  description:
    "Tarun M K is a technology entrepreneur building AI-powered products, voice AI, WhatsApp automation and intelligent business systems. Co-founder of Spectre Technologies and Tachyon Intelligence.",
  keywords: [
    "Tarun M K",
    "technology entrepreneur",
    "AI developer",
    "voice AI",
    "WhatsApp automation",
    "AI agents",
    "business automation",
    "NFC digital business cards",
    "Spectre Technologies",
    "Tachyon Intelligence",
  ],
  headline: { line1: "Engineering Intelligence.", line2: "Building the Future." },
  tagline: "Not just exploring technology. Building it.",
  roles: ["Technology Founder", "AI Developer", "Systems Engineer"],
  rotating: ["AI voice agents", "WhatsApp chatbots", "CRM systems", "automation workflows", "NFC products", "IoT prototypes"],
  currentlyBuilding: "Currently Building Intelligent Systems",
  heroDescription:
    "I build intelligent software, AI-powered products and automation systems that turn complex ideas into practical technology.",
  intro: [
    "I am Tarun M K, a technology entrepreneur passionate about building intelligent software, AI-powered systems, and automation solutions that solve real-world problems.",
    "Through my ventures, Spectre Technologies and Tachyon Intelligence, I work on developing technology products and digital solutions that help businesses operate smarter, automate processes, and improve customer experiences.",
    "My work revolves around artificial intelligence, voice AI, conversational systems, software engineering, business automation, NFC technology, and intelligent digital infrastructure.",
    "I believe in learning by building, experimenting with emerging technologies, and transforming ideas into practical products.",
  ],
  contact: {
    phoneDisplay: "+91 94491 91359",
    phoneE164: "+919449191359",
    whatsappNumber: "919449191359",
    email: "",
  },
  vcard: {
    fullName: "Tarun M K",
    family: "M K",
    given: "Tarun",
    filename: "Tarun-M-K.vcf",
  },
  socials: {
    linkedin: "",
    github: "",
    instagram: "",
  },
  hideUnsetLinks: false,
  footerQuote: "Designed with curiosity. Built with ambition. Driven by technology.",
  copyright: "© 2026 Tarun M K. All rights reserved.",
};

/** Derived action links — do not edit, change `contact` above instead. */
export const links = {
  tel: `tel:${site.contact.phoneE164}`,
  whatsapp: `https://wa.me/${site.contact.whatsappNumber}`,
  vcard: "/api/vcard",
  vcardFilename: site.vcard.filename,
  email: site.contact.email ? `mailto:${site.contact.email}` : "",
};

export const nav = [
  { label: "Ventures", href: "/#ventures" },
  { label: "Expertise", href: "/#expertise" },
  { label: "Projects", href: "/#projects" },
  { label: "Lab", href: "/#lab" },
  { label: "Systems", href: "/#systems" },
  { label: "Contact", href: "/#contact" },
];
