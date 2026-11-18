import type { Architecture } from "./types";

/**
 * EDITABLE ARCHITECTURE DIAGRAMS
 * Each diagram is just a list of nodes. Replace labels/details with your real
 * system architecture whenever you like — the diagram re-renders automatically.
 */
export const architectures: Architecture[] = [
  {
    id: "voice-agent",
    title: "AI Voice Agent",
    subtitle: "From an incoming call to a spoken answer, in a continuous loop.",
    nodes: [
      { label: "User Call", icon: "phone", detail: "A customer dials the business number. The telephony layer answers and opens a live audio stream." },
      { label: "Speech Recognition", icon: "mic", detail: "Streaming speech-to-text converts the caller’s audio into text in near real time." },
      { label: "AI / LLM Processing", icon: "brain", detail: "A language model interprets intent, keeps conversation context and decides what to do next." },
      { label: "Tool Execution", icon: "wrench", detail: "The agent calls tools — calendars, CRMs, databases, APIs — to read or change real business data." },
      { label: "Response Generation", icon: "messageSquare", detail: "The outcome is turned into a clear, natural and on-brand reply." },
      { label: "Text-to-Speech", icon: "volume", detail: "The reply is synthesised to speech and streamed back with low latency." },
      { label: "User", icon: "user", detail: "The caller hears the answer and the loop continues until the conversation is complete." },
    ],
  },
  {
    id: "whatsapp-chatbot",
    title: "WhatsApp AI Chatbot",
    subtitle: "Customer messages in, intelligent and actionable replies out.",
    nodes: [
      { label: "WhatsApp", icon: "messageCircle", detail: "A customer sends a message to the business WhatsApp number." },
      { label: "Webhook", icon: "webhook", detail: "The WhatsApp Business API delivers the incoming event to a secure webhook endpoint." },
      { label: "Backend Server", icon: "server", detail: "The backend validates the request, loads the session and routes it to the right workflow." },
      { label: "AI Agent", icon: "bot", detail: "The agent understands the message, follows business rules and decides on the next action." },
      { label: "Database / CRM", icon: "database", detail: "Leads, bookings and conversation history are read from and written to the data layer." },
      { label: "Response", icon: "send", detail: "A reply — text, buttons or media — is composed from the agent’s decision." },
      { label: "WhatsApp", icon: "messageCircle", detail: "The response is delivered back to the customer inside the same chat." },
    ],
  },
  {
    id: "intelligent-crm",
    title: "Intelligent CRM",
    subtitle: "Turning every enquiry into a tracked, followed-up relationship.",
    nodes: [
      { label: "Lead Capture", icon: "userPlus", detail: "Leads arrive from WhatsApp, calls, web forms or NFC taps and are captured automatically." },
      { label: "Data Processing", icon: "cpu", detail: "Records are cleaned, de-duplicated, enriched and tagged by intent and stage." },
      { label: "CRM", icon: "database", detail: "A single source of truth holds contacts, conversations and pipeline status." },
      { label: "Automated Follow-up", icon: "repeat", detail: "Rules and AI schedule reminders and follow-ups so no lead is forgotten." },
      { label: "Customer Engagement", icon: "users", detail: "Personalised messages and calls keep customers engaged across channels." },
      { label: "Analytics", icon: "barChart", detail: "Dashboards show pipeline health and where the process can be improved." },
    ],
  },
  {
    id: "business-automation",
    title: "Business Automation",
    subtitle: "A trigger-to-action pipeline that removes manual work.",
    nodes: [
      { label: "Customer Input", icon: "inbox", detail: "A form, message, call or tap creates the event that starts the workflow." },
      { label: "Automation Engine", icon: "workflow", detail: "A rules and AI layer decides which steps should run and in what order." },
      { label: "API Integration", icon: "plug", detail: "Connected services — payments, messaging, calendars, internal tools — are called through APIs." },
      { label: "Database", icon: "database", detail: "State and results are stored so the process is traceable and auditable." },
      { label: "Business Action", icon: "zap", detail: "The real-world action happens: a booking is made, an order is updated, a task is created." },
      { label: "Notification", icon: "bell", detail: "The customer and the team are notified about what happened." },
    ],
  },
];

export function getArchitecture(id: string) {
  return architectures.find((a) => a.id === id);
}
