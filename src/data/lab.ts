import type { IconName } from "@/lib/icons";
import type { Status } from "./types";

/**
 * INSIDE MY LAB
 * ---------------------------------------------------------------
 * Add experiments to `labItems`. Each needs a `category` from `labCategories`.
 * Entries marked `sample: true` are illustrative placeholders (a "Sample" tag is
 * shown in development only) — replace or delete them with your real experiments.
 */
export const labCategories: { id: string; label: string; icon: IconName }[] = [
  { id: "ai", label: "AI experiments", icon: "brain" },
  { id: "voice", label: "Voice AI", icon: "mic" },
  { id: "agents", label: "AI agent architecture", icon: "network" },
  { id: "whatsapp", label: "WhatsApp automation", icon: "messageCircle" },
  { id: "prototypes", label: "Software prototypes", icon: "terminal" },
  { id: "nfc", label: "NFC technology", icon: "nfc" },
  { id: "iot", label: "IoT experiments", icon: "wifi" },
  { id: "workflows", label: "Intelligent workflows", icon: "workflow" },
];

export type LabItem = {
  name: string;
  category: string;
  description: string;
  status: Status;
  stack: string[];
  screenshot: string;
  demo: string;
  github: string;
  sample?: boolean;
};

export const labItems: LabItem[] = [
  {
    name: "LLM experiments",
    category: "ai",
    description: "Exploring how language models can be applied to practical business tasks.",
    status: "Exploring",
    stack: [],
    screenshot: "",
    demo: "",
    github: "",
    sample: true,
  },
  {
    name: "Voice agent pipeline",
    category: "voice",
    description: "Exploring speech recognition, reasoning and speech synthesis working together in a live call.",
    status: "Exploring",
    stack: [],
    screenshot: "",
    demo: "",
    github: "",
    sample: true,
  },
  {
    name: "Agent architecture",
    category: "agents",
    description: "Exploring how agents plan, call tools and keep context across steps.",
    status: "Exploring",
    stack: [],
    screenshot: "",
    demo: "",
    github: "",
    sample: true,
  },
  {
    name: "WhatsApp automation flows",
    category: "whatsapp",
    description: "Exploring conversational flows for bookings, support and follow-ups on WhatsApp.",
    status: "Exploring",
    stack: [],
    screenshot: "",
    demo: "",
    github: "",
    sample: true,
  },
  {
    name: "Software prototypes",
    category: "prototypes",
    description: "A space for early product ideas before they become full projects.",
    status: "Exploring",
    stack: [],
    screenshot: "",
    demo: "",
    github: "",
    sample: true,
  },
  {
    name: "NFC experiments",
    category: "nfc",
    description: "Exploring new things an NFC tap can trigger — profiles, payments, check-ins and more.",
    status: "Exploring",
    stack: [],
    screenshot: "",
    demo: "",
    github: "",
    sample: true,
  },
  {
    name: "IoT experiments",
    category: "iot",
    description: "Exploring connected devices and how they can feed intelligent systems.",
    status: "Exploring",
    stack: [],
    screenshot: "",
    demo: "",
    github: "",
    sample: true,
  },
  {
    name: "Workflow intelligence",
    category: "workflows",
    description: "Exploring workflows that adapt using AI instead of fixed rules.",
    status: "Exploring",
    stack: [],
    screenshot: "",
    demo: "",
    github: "",
    sample: true,
  },
];

/**
 * Visual scene for each lab category: the nodes drawn in the workbench diagram and the
 * illustrative terminal output. This is decorative — it is labelled "illustrative" on the site.
 */
export const labScenes: Record<string, { color: string; nodes: string[]; log: string[] }> = {
  ai: {
    color: "#8fadff",
    nodes: ["prompt", "context", "LLM", "output"],
    log: ["$ load prompt_template", "> attach context window", "> call model", "> parse structured output", "✓ response validated"],
  },
  voice: {
    color: "#a78bfa",
    nodes: ["mic", "STT", "LLM", "TTS", "speaker"],
    log: ["$ open audio stream", "> transcribe speech → text", "> reason + pick tool", "> synthesise reply → audio", "✓ turn complete"],
  },
  agents: {
    color: "#22d3ee",
    nodes: ["goal", "planner", "tools", "memory", "action"],
    log: ["$ agent.plan(goal)", "> select tools", "> read memory", "> execute step", "✓ goal progress saved"],
  },
  whatsapp: {
    color: "#c8ff3d",
    nodes: ["chat", "webhook", "bot", "CRM", "reply"],
    log: ["$ POST /webhook", "> verify signature", "> route to agent", "> write lead to CRM", "✓ reply queued"],
  },
  prototypes: {
    color: "#f2eee4",
    nodes: ["idea", "wireframe", "code", "deploy"],
    log: ["$ new prototype", "> sketch the flow", "> build the smallest version", "> test with real input", "✓ keep / kill / iterate"],
  },
  nfc: {
    color: "#5b86ff",
    nodes: ["tag", "reader", "URL", "action"],
    log: ["$ tap detected", "> read NDEF record", "> open web profile", "> trigger action", "✓ session closed"],
  },
  iot: {
    color: "#22d3ee",
    nodes: ["sensor", "MCU", "gateway", "cloud", "alert"],
    log: ["$ sensor.read()", "> normalise payload", "> publish to gateway", "> rule check", "✓ event delivered"],
  },
  workflows: {
    color: "#c8ff3d",
    nodes: ["trigger", "rules", "AI step", "action", "notify"],
    log: ["$ trigger received", "> evaluate rules", "> AI classify / decide", "> run business action", "✓ team notified"],
  },
};
