import type { IconName } from "@/lib/icons";
import type { FlowNode, Status } from "./types";

/**
 * PROJECTS & CASE STUDIES
 * ---------------------------------------------------------------
 * To add a project: copy one object below, give it a unique `slug`, and fill it in.
 * A page at /projects/<slug> is generated automatically.
 *
 * Everything below is a PLACEHOLDER TEMPLATE — no clients, numbers or results are claimed.
 * As you add real information, set `template: false` for that project to remove the
 * "template" banner and placeholder frames.
 *
 * Architecture: either set `architectureId` (reuses a diagram from architectures.ts)
 * or provide your own `architecture` nodes.
 */
export type Project = {
  slug: string;
  title: string;
  category: string;
  icon: IconName;
  summary: string;
  status: Status;
  template: boolean;
  overview: string;
  problem: string;
  solution: string;
  architectureId?: string;
  architecture?: FlowNode[];
  technologies: string[];
  features: string[];
  screenshots: { src: string; alt: string }[];
  /** YouTube link, or a direct .mp4/.webm URL. "" = none */
  demoVideo: string;
  github: string;
  liveUrl: string;
};

export const projects: Project[] = [
  {
    slug: "ai-voice-agent-systems",
    title: "AI Voice Agent Systems",
    category: "Voice AI",
    icon: "mic",
    summary: "Voice agents that answer calls, understand intent and take action.",
    status: "Coming Soon",
    template: true,
    overview:
      "A voice agent that handles inbound calls end to end: it listens, understands what the caller needs, uses business tools and replies in natural speech.",
    problem:
      "Calls that go unanswered or sit in queues mean lost enquiries, and routine questions take up staff time.",
    solution:
      "A conversational voice pipeline — speech recognition, an LLM-driven agent with tool access, and text-to-speech — that can answer questions, capture details and trigger business actions.",
    architectureId: "voice-agent",
    technologies: [],
    features: ["Inbound call handling", "Natural conversation", "Tool and CRM integration", "Call summaries and hand-off"],
    screenshots: [],
    demoVideo: "",
    github: "",
    liveUrl: "",
  },
  {
    slug: "whatsapp-ai-chatbots",
    title: "WhatsApp AI Chatbots",
    category: "Conversational AI",
    icon: "messageCircle",
    summary: "AI assistants on WhatsApp for support, bookings and lead capture.",
    status: "Coming Soon",
    template: true,
    overview:
      "A WhatsApp-integrated assistant that converses with customers, answers questions and completes tasks inside the chat.",
    problem:
      "Customers expect fast replies on WhatsApp, but manual responses are slow, inconsistent and hard to track.",
    solution:
      "A webhook-driven backend that connects the WhatsApp Business API to an AI agent and a database, so conversations are answered, logged and followed up automatically.",
    architectureId: "whatsapp-chatbot",
    technologies: [],
    features: ["WhatsApp Business API integration", "Lead capture", "Automated follow-ups", "Conversation history"],
    screenshots: [],
    demoVideo: "",
    github: "",
    liveUrl: "",
  },
  {
    slug: "ai-powered-crm",
    title: "AI-Powered CRM",
    category: "Business software",
    icon: "users",
    summary: "A CRM that captures leads and follows up on them automatically.",
    status: "Coming Soon",
    template: true,
    overview:
      "A customer relationship platform that centralises leads and conversations and uses automation to keep every relationship moving.",
    problem: "Leads are scattered across calls, chats and forms, and follow-ups depend on memory and spreadsheets.",
    solution:
      "One database-driven CRM that ingests leads from every channel, tracks the pipeline, and schedules follow-ups with rules and AI assistance.",
    architectureId: "intelligent-crm",
    technologies: [],
    features: ["Multi-channel lead capture", "Pipeline tracking", "Automated follow-up", "Analytics"],
    screenshots: [],
    demoVideo: "",
    github: "",
    liveUrl: "",
  },
  {
    slug: "inventory-management-systems",
    title: "Inventory Management Systems",
    category: "Business software",
    icon: "boxes",
    summary: "Stock, sales and reporting in one operational platform.",
    status: "Coming Soon",
    template: true,
    overview: "A management platform that tracks stock levels, movements and sales so a business always knows what it has.",
    problem: "Manual stock records drift out of date, causing shortages, over-ordering and unclear costs.",
    solution:
      "A database-driven application with stock entry, rules for low-stock alerts, and reports that make inventory decisions easier.",
    architecture: [
      { label: "Stock Entry", icon: "inbox", detail: "Purchases, sales and adjustments are recorded through a simple interface." },
      { label: "Database", icon: "database", detail: "Every movement is stored, giving a reliable history of stock." },
      { label: "Rules Engine", icon: "cog", detail: "Thresholds and rules detect low stock or unusual movement." },
      { label: "Alerts", icon: "bell", detail: "The team is notified when action is required." },
      { label: "Reports", icon: "barChart", detail: "Dashboards summarise stock, sales and trends." },
    ],
    technologies: [],
    features: ["Stock tracking", "Low-stock alerts", "Sales records", "Reports and dashboards"],
    screenshots: [],
    demoVideo: "",
    github: "",
    liveUrl: "",
  },
  {
    slug: "nfc-digital-business-card-platform",
    title: "NFC Digital Business Card Platform",
    category: "Connected technology",
    icon: "nfc",
    summary: "Tap-to-share smart cards that open a live digital profile.",
    status: "Coming Soon",
    template: true,
    overview: "A platform where an NFC card opens a mobile-friendly digital profile with contact details and links.",
    problem: "Paper business cards are easily lost and can’t be updated or measured.",
    solution:
      "NFC cards linked to editable web profiles that visitors can open with a tap, save as a contact and use to get in touch.",
    architecture: [
      { label: "NFC Tap", icon: "nfc", detail: "A phone taps the card and reads the encoded URL." },
      { label: "Web Profile", icon: "smartphone", detail: "A fast, mobile-first profile page opens instantly — no app required." },
      { label: "Contact Actions", icon: "phoneCall", detail: "Visitors can call, message on WhatsApp or save the contact." },
      { label: "Lead Capture", icon: "userPlus", detail: "Optional forms capture who connected and why." },
      { label: "Analytics", icon: "barChart", detail: "Tap and engagement data show how the card is used." },
    ],
    technologies: [],
    features: ["Tap-to-open profile", "Save contact (vCard)", "WhatsApp and call actions", "Editable content"],
    screenshots: [],
    demoVideo: "",
    github: "",
    liveUrl: "",
  },
  {
    slug: "automated-business-management-systems",
    title: "Automated Business Management Systems",
    category: "Business automation",
    icon: "workflow",
    summary: "End-to-end workflows that remove repetitive manual work.",
    status: "Coming Soon",
    template: true,
    overview: "Connected systems that move information between tools and trigger the right actions automatically.",
    problem: "Teams spend hours copying data between tools and chasing routine tasks.",
    solution:
      "An automation layer that listens for events, calls the right APIs, updates the database and notifies people — reliably and traceably.",
    architectureId: "business-automation",
    technologies: [],
    features: ["Event-driven workflows", "API integrations", "Audit trail", "Notifications"],
    screenshots: [],
    demoVideo: "",
    github: "",
    liveUrl: "",
  },
  {
    slug: "website-development-projects",
    title: "Website & Web Application Development",
    category: "Software engineering",
    icon: "globe",
    summary: "Fast, modern websites and web applications for businesses.",
    status: "Coming Soon",
    template: true,
    overview: "Custom websites and web apps that present a business clearly and connect it to its customers.",
    problem: "Generic templates make businesses look the same and rarely connect to the systems behind them.",
    solution:
      "Purpose-built, responsive websites with clean design, strong performance and integrations such as WhatsApp, forms and CRMs.",
    architecture: [
      { label: "Discovery", icon: "search", detail: "Understand the business, audience and goals." },
      { label: "Design", icon: "layers", detail: "Define layout, visual language and user flow." },
      { label: "Build", icon: "code", detail: "Develop a responsive, performant front end and any required backend." },
      { label: "Integrate", icon: "plug", detail: "Connect forms, messaging, analytics and business tools." },
      { label: "Launch", icon: "rocket", detail: "Deploy, test across devices and go live." },
    ],
    technologies: [],
    features: ["Responsive design", "SEO-ready", "Integrations", "Easy content updates"],
    screenshots: [],
    demoVideo: "",
    github: "",
    liveUrl: "",
  },
  {
    slug: "intelligent-customer-support-systems",
    title: "Intelligent Customer Support Systems",
    category: "Conversational AI",
    icon: "headphones",
    summary: "AI-assisted support across chat and voice with human hand-off.",
    status: "Coming Soon",
    template: true,
    overview: "A support system where AI answers common questions instantly and hands complex cases to people with full context.",
    problem: "Support teams are overloaded with repetitive questions while customers wait for answers.",
    solution:
      "An AI layer that understands queries, retrieves the right information, responds in the customer’s channel, and escalates when needed.",
    architecture: [
      { label: "Customer Query", icon: "inbox", detail: "A question arrives through chat, WhatsApp or voice." },
      { label: "Intent Detection", icon: "brain", detail: "The system works out what the customer actually needs." },
      { label: "Knowledge Retrieval", icon: "database", detail: "Relevant business information is retrieved to ground the answer." },
      { label: "AI Response", icon: "bot", detail: "A helpful answer is generated and delivered in the same channel." },
      { label: "Human Hand-off", icon: "users", detail: "Complex or sensitive cases are escalated with the full conversation." },
    ],
    technologies: [],
    features: ["Multi-channel support", "Knowledge-grounded answers", "Human hand-off", "Conversation logging"],
    screenshots: [],
    demoVideo: "",
    github: "",
    liveUrl: "",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
