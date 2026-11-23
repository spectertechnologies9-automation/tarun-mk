import type { IconName } from "@/lib/icons";

export type Capability = {
  id: "ai" | "voice" | "whatsapp" | "software" | "automation" | "connected";
  letter: string;
  title: string;
  icon: IconName;
  summary: string;
  items: string[];
};

export const capabilities: Capability[] = [
  {
    id: "ai",
    letter: "A",
    title: "Artificial Intelligence",
    icon: "brain",
    summary: "AI agents and LLM-powered systems that reason, use tools and take action inside real business workflows.",
    items: ["AI agents", "LLM integrations", "Voice AI", "Conversational AI", "AI-powered customer support", "AI workflow automation", "Intelligent assistants"],
  },
  {
    id: "voice",
    letter: "B",
    title: "Voice AI Systems",
    icon: "mic",
    summary: "Voice agents that answer calls, understand intent and respond in natural speech.",
    items: ["AI voice agents", "Automated inbound calling", "Conversational voice assistants", "Speech-to-text integrations", "Text-to-speech integrations", "AI-powered customer interactions", "Voice-based business automation"],
  },
  {
    id: "whatsapp",
    letter: "C",
    title: "WhatsApp Automation",
    icon: "messageCircle",
    summary: "Chatbots and automated communication on the channel customers already use every day.",
    items: ["WhatsApp-integrated chatbots", "WhatsApp Business API integrations", "Automated customer communication", "Lead capture", "Automated follow-ups", "AI-powered WhatsApp assistants", "Customer support automation"],
  },
  {
    id: "software",
    letter: "D",
    title: "Software Engineering",
    icon: "code",
    summary: "Full-stack products — from websites to database-driven business platforms.",
    items: ["Website development", "Web applications", "Backend development", "API integrations", "Database-driven applications", "CRM development", "Inventory management platforms", "Business management software"],
  },
  {
    id: "automation",
    letter: "E",
    title: "Business Automation",
    icon: "workflow",
    summary: "Systems that capture, qualify, follow up and engage — without manual effort.",
    items: ["Automated lead management", "Customer follow-up systems", "AI receptionists", "Workflow automation", "Sales process automation", "Customer engagement systems"],
  },
  {
    id: "connected",
    letter: "F",
    title: "Connected Technology",
    icon: "nfc",
    summary: "NFC and IoT-related systems that connect the physical world to digital experiences.",
    items: ["NFC technology", "NFC digital business cards", "Smart business cards", "NFC-based business integrations", "IoT-related systems"],
  },
];

/** Shown as the big scrolling ticker under the capability panels. */
export const focusAreas = [
  "AI & LLMs",
  "AI agents",
  "Voice AI",
  "Conversational systems",
  "WhatsApp Business API",
  "Full-stack development",
  "Backend & APIs",
  "Database-driven apps",
  "CRM & inventory systems",
  "Workflow automation",
  "NFC technology",
  "IoT & connected devices",
];
