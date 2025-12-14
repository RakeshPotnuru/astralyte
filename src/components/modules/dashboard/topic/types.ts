import { Tables } from "@/types/supabase";

export type AgentStatus = Tables<"topics">["agent_a_status"];

export interface AgentAOutput {
  title: string;
  summary: string;
}

export interface AgentBOutput {
  title: string;
  key_points: string[];
  claims: string[];
  data: string[];
  bias_or_limitations: string;
}

export interface AgentCOutput {
  major_themes: string[];
  contradictions: string[];
  emerging_insights: string[];
}

export interface AgentDOutput {
  overview: string;
  sections: {
    title: string;
    content: string;
  }[];
  contradictions: string[];
  implications: string[];
  conclusion: string;
  sources: {
    title: string;
  }[];
}

export interface Sources {
  content: string;
  metadata: {
    url: string;
    score: string;
  };
}

export interface AgentInfo {
  id: "a" | "b" | "c" | "d";
  name: string;
  role: string;
  description: string;
  icon: string;
  color: string;
}

export const AGENTS: AgentInfo[] = [
  {
    id: "a",
    name: "Scout",
    role: "Discovery",
    description: "Discovers credible sources and gathers high-level context.",
    icon: "🔍",
    color: "agent-scout",
  },
  {
    id: "b",
    name: "Summarizer",
    role: "Analysis",
    description:
      "Breaks each source into structured components—key points, claims, data, limitations.",
    icon: "📋",
    color: "agent-summarizer",
  },
  {
    id: "c",
    name: "Analyst",
    role: "Synthesis",
    description:
      "Identifies contradictions, themes, and deeper insights across sources.",
    icon: "🧠",
    color: "agent-analyst",
  },
  {
    id: "d",
    name: "Synthesizer",
    role: "Output",
    description:
      "Produces a polished research brief with sections, implications, and citations.",
    icon: "✨",
    color: "agent-synthesizer",
  },
];
