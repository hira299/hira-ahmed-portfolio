export type ServiceSlug =
  | "qa-testing"
  | "ai-automation"
  | "ai-agents";

export type Service = {
  slug: ServiceSlug;
  title: string;
  href: string;
  hasPage: boolean;
  h1Title?: string;
  seoTitle?: string;
  description: string;
  summary: string;
  problems: string[];
  technologies: string[];
  proof: string[];
  caseStudies: string[];
  resource?: {
    href: string;
    label: string;
    summary: string;
  };
};

export const services: Service[] = [
  {
    slug: "qa-testing",
    title: "Software Testing & QA",
    href: "/qa-testing/",
    hasPage: true,
    h1Title: "Software Testing & QA",
    seoTitle: "Software Testing & QA Services | Hira Ahmed",
    description:
      "Web and SaaS app testing, API testing, user roles and permissions, and billing checks, with 1,500+ documented defects across four contracts.",
    summary:
      "Pre-launch and production QA that goes past the UI: journeys, network/API evidence, controlled reproduction, and root cause.",
    problems: [
      "Launching without knowing which user journeys actually work",
      "Bug reports developers can't reproduce",
      "Security and permission issues found by customers instead of QA",
      "The same defect reported ten times from different screens",
      "The UI hides an action, but the API still allows it",
      "Wrong status codes that leak information across tenants",
      "One customer able to see or guess another customer's records",
      "Expired promotions still honored at checkout",
    ],
    technologies: ["Browser DevTools", "curl", "REST", "Flutter testing"],
    proof: [
      "20 user flows tested on PharmaConnect, 110+ bugs documented",
      "1,500+ defects identified and documented across four client contracts",
      "15 critical P1 findings on PharmaConnect, including authorization bypasses, authentication gaps, and payment reconciliation issues",
      "60+ defects documented on Tekruiter, 1,300+ on ToolPotion, and 80+ on AI Cloud Academy",
    ],
    caseStudies: ["multitenant-saas-qa", "tekruiter-qa", "toolpotion-qa", "ai-cloud-academy-qa"],
    resource: {
      href: "https://github.com/hira299/enterprise-multitenant-qa-matrix",
      label: "QA Matrix →",
      summary:
        "Reusable QA matrices, checklists, templates, and examples for multi-tenant SaaS, RBAC, API testing, business logic, regression, payments, and AI workflows.",
    },
  },
  {
    slug: "ai-automation",
    title: "Workflow & AI Automation",
    href: "/ai-automation/",
    hasPage: true,
    h1Title: "Workflow & AI Automation",
    seoTitle: "Workflow & AI Automation Services | Hira Ahmed",
    description:
      "Production workflows, n8n automations, and status-gated AI pipelines with dead-letter queues and PostgreSQL state machines built by Hira Ahmed.",
    summary:
      "Workflows that connect your tools, APIs, databases, and LLMs, and keep working when inputs are messy or services fail.",
    problems: [
      "Repetitive manual work across tools that don't talk to each other",
      "AI steps that return unparseable or inconsistent output",
      "Pipelines that silently drop records when an API times out",
      "No visibility into where a run failed or what state it left behind",
      "Workflows that crash silently and lose the payload",
      "Rate limits (HTTP 429/403) breaking multi-step runs",
    ],
    technologies: ["n8n", "Make.com", "Python", "PostgreSQL", "Docker", "AWS"],
    proof: [
      "28,000+ live records processed through an AI pipeline",
      "5.6x processing speedup after reworking ETL for concurrency",
      "Profitability guardrail with a PostgreSQL state machine and DLQ, reported 95% reduction in notification noise",
    ],
    caseStudies: ["28k-record-pipeline", "aws-cost-optimization", "n8n-email-agent", "cloud-compliance"],
    resource: {
      href: "https://github.com/hira299/n8n-production-resilience-patterns",
      label: "Production Resilience Patterns →",
      summary:
        "Production-oriented n8n reliability patterns for retries, PostgreSQL state, dead-letter queues, idempotency, rate limiting, concurrency, replay, and failure handling.",
    },
  },
  {
    slug: "ai-agents",
    title: "AI Agents & Assistants",
    href: "/ai-agents/",
    hasPage: true,
    h1Title: "AI Agents & Assistants",
    seoTitle: "AI Agent Development Consultant | Hira Ahmed",
    description:
      "Stateful AI agents and Corrective RAG pipelines with verifiable citation checks, Critic agents, and structured outputs in LangGraph. Book a call.",
    summary:
      "Agents that keep context across conversations, answer from verified sources, and hand off to people when they should.",
    problems: [
      "Chatbots that forget earlier messages in a thread",
      "Answers that aren't grounded in your own data",
      "Free-form LLM output breaking downstream steps",
      "No clear escalation path to a human",
    ],
    technologies: ["LangGraph", "LlamaIndex", "pgvector"],
    proof: [
      "Assistants that answer from your own documents and show their sources.",
      "6-node LangGraph Corrective RAG engine that answers 250+ question security reviews, with every answer required to cite a verified source",
      "Autonomous AI email agent with thread-state memory and Groq inference",
    ],
    caseStudies: ["n8n-email-agent", "cloud-compliance", "sentinel-mesh"],
  },
];

export function getService(slug: ServiceSlug) {
  const service = services.find((item) => item.slug === slug);
  if (!service) throw new Error(`Unknown service: ${slug}`);
  return service;
}
