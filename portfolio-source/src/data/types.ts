import type { IconName } from "@/lib/icons";

export type Status = "Exploring" | "In Development" | "Prototype" | "Completed" | "Coming Soon";

export type FlowNode = { label: string; detail: string; icon: IconName };

export type Architecture = {
  id: string;
  title: string;
  subtitle: string;
  nodes: FlowNode[];
};
