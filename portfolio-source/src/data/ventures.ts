import type { IconName } from "@/lib/icons";

export type Venture = {
  id: string;
  index: string;
  name: string;
  /** Editable designation */
  designation: string;
  category: string;
  description: string;
  /** Company website. Leave "" until supplied — the "Visit website" link stays hidden. */
  website: string;
  /** Company logo, e.g. "/logos/spectre.svg" (put the file in /public/logos). "" = placeholder monogram. */
  logo: string;
  monogram: string;
  accent: "blue" | "violet";
  areas: { label: string; icon: IconName }[];
  highlights: { title: string; text: string }[];
  showcaseTitle: string;
  showcase: { title: string; text: string; icon: IconName }[];
};

export const ventures: Venture[] = [
  {
    id: "spectre",
    index: "01",
    name: "Spectre Technologies",
    designation: "Co-Founder",
    category: "Digital solutions & connected technology",
    description:
      "Spectre Technologies is an AI-focused technology startup developing digital solutions, intelligent business systems, and technology-driven services.",
    website: "",
    logo: "",
    monogram: "S",
    accent: "blue",
    areas: [
      { label: "Website design and development", icon: "globe" },
      { label: "Digital transformation", icon: "rocket" },
      { label: "NFC digital business cards", icon: "creditCard" },
      { label: "NFC-enabled business solutions", icon: "nfc" },
      { label: "Automated business systems", icon: "workflow" },
      { label: "Custom digital solutions", icon: "code" },
      { label: "Business technology integrations", icon: "plug" },
    ],
    highlights: [
      { title: "Digital presence", text: "Websites and web experiences designed and engineered for modern businesses." },
      { title: "Connected technology", text: "NFC cards and NFC-enabled solutions that bridge physical and digital." },
      { title: "Business systems", text: "Automated systems and integrations that simplify daily operations." },
    ],
    showcaseTitle: "Services showcase",
    showcase: [
      { title: "Websites & web apps", text: "Custom design and development.", icon: "globe" },
      { title: "NFC digital business cards", text: "Tap-to-share smart cards.", icon: "creditCard" },
      { title: "Automated business systems", text: "Workflows that run themselves.", icon: "workflow" },
      { title: "Custom digital solutions", text: "Built around the business.", icon: "code" },
    ],
  },
  {
    id: "tachyon",
    index: "02",
    name: "Tachyon Intelligence",
    designation: "Founder / Co-Founder",
    category: "AI automation & intelligent business systems",
    description:
      "Tachyon Intelligence focuses on developing intelligent AI-powered products and business automation systems that help businesses streamline operations, improve customer communication, and build smarter workflows.",
    website: "",
    logo: "",
    monogram: "T",
    accent: "violet",
    areas: [
      { label: "AI-powered voice agents", icon: "mic" },
      { label: "AI voice assistants", icon: "headphones" },
      { label: "WhatsApp-integrated AI chatbots", icon: "messageCircle" },
      { label: "Conversational AI systems", icon: "messageSquare" },
      { label: "AI customer support systems", icon: "bot" },
      { label: "CRM development", icon: "users" },
      { label: "Inventory management systems", icon: "boxes" },
      { label: "Intelligent business automation", icon: "workflow" },
      { label: "NFC-based technology integrations", icon: "nfc" },
      { label: "Automated lead management", icon: "userPlus" },
      { label: "AI-powered workflow systems", icon: "zap" },
    ],
    highlights: [
      { title: "Voice & conversational AI", text: "Agents that speak, listen and chat with customers naturally." },
      { title: "Operational software", text: "CRM and inventory systems that keep businesses organised." },
      { title: "Intelligent workflows", text: "Automation that handles leads, follow-ups and routine tasks." },
    ],
    showcaseTitle: "Product showcase",
    showcase: [
      { title: "AI voice agents", text: "Inbound calling, handled by AI.", icon: "mic" },
      { title: "WhatsApp AI chatbots", text: "Conversations that convert.", icon: "messageCircle" },
      { title: "CRM & inventory", text: "Systems built for real operations.", icon: "boxes" },
      { title: "Workflow automation", text: "Leads and follow-ups on autopilot.", icon: "workflow" },
    ],
  },
];
