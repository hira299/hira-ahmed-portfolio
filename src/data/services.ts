export type ServiceSlug =
  | "ai-automation"
  | "n8n-automation"
  | "ai-agents"
  | "api-integrations"
  | "qa-testing"
  | "api-testing"
  | "multitenant-qa"
  | "business-logic-testing";

export type Service = {
  slug: ServiceSlug;
  title: string;
  href: string;
  /** Services without their own route point to the closest page. */
  hasPage: boolean;
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
    slug: "ai-automation",
    title: "AI Automation",
    href: "/ai-automation/",
    hasPage: true,
    seoTitle: "AI Automation Engineer",
    description:
      "Production AI automation and LLM pipelines: multi-stage LLM processing, state-aware workflows, retries, and fault tolerance with Python, n8n, and AWS.",
    summary:
      "Workflows that connect your tools, APIs, databases, and LLMs, and keep working when inputs are messy or services fail.",
    problems: [
      "Repetitive manual work across tools that don't talk to each other",
      "AI steps that return unparseable or inconsistent output",
      "Pipelines that silently drop records when an API times out",
      "No visibility into where a run failed or what state it left behind",
    ],
    technologies: ["Python", "n8n", "Make.com", "PostgreSQL", "AWS", "OpenRouter", "OpenAI", "Gemini", "Groq"],
    proof: [
      "28,000+ production records processed through a status-gated LLM enrichment pipeline",
      "5.6x processing speedup after reworking ETL for concurrency",
      "12+ Make.com AI automation flows built in production",
    ],
    caseStudies: ["28k-record-pipeline", "n8n-email-agent", "cloud-compliance"],
  },
  {
    slug: "n8n-automation",
    title: "n8n Automation",
    href: "/n8n-automation/",
    hasPage: true,
    seoTitle: "n8n Automation Engineer | AI Workflows",
    description:
      "Production n8n workflows and AI agents with error handling, retry logic, PostgreSQL state, dead-letter queues, and self-hosted deployment.",
    summary:
      "Self-hosted or cloud n8n workflows with explicit state, error routing, and dead-letter queues, so failures are caught instead of lost.",
    problems: [
      "Workflows that crash silently and lose the payload",
      "Rate limits (HTTP 429/403) breaking multi-step runs",
      "Duplicate alerts and notification noise",
      "Execution limits and cost on hosted automation plans",
    ],
    technologies: ["n8n", "PostgreSQL", "Docker", "ClickUp", "Slack", "Gmail API", "Google Sheets", "Groq", "Gemini"],
    proof: [
      "Profitability guardrail with a PostgreSQL state machine and DLQ, reported 95% reduction in notification noise",
      "Stateful AI email agent with persistent thread memory",
      "Cloud compliance and cost-anomaly workflows orchestrated in n8n",
    ],
    caseStudies: ["n8n-email-agent", "cloud-compliance"],
    resource: {
      href: "https://github.com/hira299/n8n-production-resilience-patterns",
      label: "Production Resilience Patterns →",
      summary:
        "Production-oriented n8n reliability patterns for retries, PostgreSQL state, dead-letter queues, idempotency, rate limiting, concurrency, replay, and failure handling.",
    },
  },
  {
    slug: "ai-agents",
    title: "AI Agent Development",
    href: "/ai-agents/",
    hasPage: true,
    seoTitle: "AI Agent Development",
    description:
      "AI agents and LLM systems with persistent context, RAG and Corrective RAG over verified data, structured outputs, validation, and LangGraph or n8n orchestration.",
    summary:
      "Agents that keep context across conversations, answer from verified sources, and hand off to people when they should.",
    problems: [
      "Chatbots that forget earlier messages in a thread",
      "Answers that aren't grounded in your own data",
      "Free-form LLM output breaking downstream steps",
      "No clear escalation path to a human",
    ],
    technologies: ["LangGraph", "CRAG", "LlamaIndex", "pgvector", "FastEmbed", "n8n", "Langflow", "Groq", "Gemini", "OpenAI", "Tavily"],
    proof: [
      "6-node LangGraph Corrective RAG engine that answers 250+ question security reviews, with every answer required to cite a verified source",
      "Autonomous AI email agent with thread-state memory and Groq inference",
      "Planner-synthesizer research agent grounded in live web sources with citations",
      "JSON-mode enforcement for schema-valid LLM output in production",
    ],
    caseStudies: ["n8n-email-agent", "cloud-compliance"],
  },
  {
    slug: "api-integrations",
    title: "API Integrations",
    href: "/ai-automation/",
    hasPage: false,
    description:
      "Connecting SaaS tools, internal APIs, databases, and LLM providers with webhooks, authentication, pagination, and failure handling.",
    summary:
      "Reliable connections between SaaS tools, databases, and AI providers, with authentication, retries, and logging built in.",
    problems: [
      "Tools with APIs but no working integration between them",
      "Webhooks that fire once and are never retried",
      "Integrations that break when a provider throttles requests",
    ],
    technologies: ["REST APIs", "Webhooks", "OAuth", "n8n", "Make.com", "Python", "FastAPI", "AWS API Gateway"],
    proof: [
      "Make.com flows integrating multiple external APIs in production",
      "Gmail, ClickUp, Slack, WordPress, and AWS integrations across portfolio projects",
    ],
    caseStudies: ["n8n-email-agent", "28k-record-pipeline"],
  },
  {
    slug: "qa-testing",
    title: "B2B SaaS QA",
    href: "/qa-testing/",
    hasPage: true,
    seoTitle: "B2B SaaS QA & Exploratory Testing",
    description:
      "Production SaaS QA: end-to-end journeys, exploratory and security-oriented testing, API-level reproduction, root-cause analysis, and pre-launch release checks.",
    summary:
      "Pre-launch and production QA that goes past the UI: journeys, network/API evidence, controlled reproduction, and root cause.",
    problems: [
      "Launching without knowing which user journeys actually work",
      "Bug reports developers can't reproduce",
      "Security and permission issues found by customers instead of QA",
      "The same defect reported ten times from different screens",
    ],
    technologies: ["Browser DevTools", "Network/API inspection", "curl", "Flutter testing", "Defect matrices"],
    proof: [
      "20 end-to-end journeys completed on PharmaConnect",
      "678+ defects identified and documented across QA engagements",
      "80+ defects documented with API-level reproduction on one enterprise B2B platform",
    ],
    caseStudies: ["multitenant-saas-qa"],
  },
  {
    slug: "api-testing",
    title: "API Testing",
    href: "/api-testing/",
    hasPage: true,
    seoTitle: "API Testing & Backend QA",
    description:
      "API and backend testing: authentication, authorization, status codes, payload validation, state transitions, error handling, and API/UI mismatches.",
    summary:
      "Testing the API behind the interface: auth, permissions, payloads, status codes, and what happens to state when things fail.",
    problems: [
      "The UI hides an action, but the API still allows it",
      "Wrong status codes that leak information across tenants",
      "Payloads accepted without server-side validation",
      "State left inconsistent after timeouts or retries",
    ],
    technologies: ["HTTP", "REST", "curl", "Browser network inspection", "JSON schema checks", "PostgreSQL"],
    proof: [
      "API-level reproduction evidence for 80+ defects on an enterprise B2B platform",
      "Cross-tenant status-code and authorization findings on a multi-tenant platform",
    ],
    caseStudies: ["multitenant-saas-qa"],
  },
  {
    slug: "multitenant-qa",
    title: "Multi-Tenant Testing",
    href: "/multitenant-qa/",
    hasPage: true,
    seoTitle: "Multi-Tenant SaaS QA",
    description:
      "Multi-tenant SaaS testing: tenant isolation, RBAC, access boundaries, session persistence, cross-tenant access, financial reconciliation, and data integrity.",
    summary:
      "Checking that each tenant, role, and session only sees and changes what it should.",
    problems: [
      "One customer able to see or guess another customer's records",
      "Roles with more permissions than intended",
      "Deactivated users keeping access",
      "Credentials or session tokens exposed in audit logs",
      "Invoice and ledger totals drifting across partial payments and returns",
    ],
    technologies: ["RBAC matrices", "API testing", "Session/token checks", "Data-integrity checks"],
    proof: [
      "20 journeys across 6 user roles on PharmaConnect, a multi-tenant B2B platform",
      "11 critical P1 findings on PharmaConnect, including authorization bypasses, authentication gaps, and payment reconciliation issues",
    ],
    caseStudies: ["multitenant-saas-qa"],
    resource: {
      href: "https://github.com/hira299/enterprise-multitenant-qa-matrix",
      label: "QA Matrix →",
      summary:
        "Reusable QA matrices, checklists, templates, and examples for multi-tenant SaaS, RBAC, API testing, business logic, regression, payments, and AI workflows.",
    },
  },
  {
    slug: "business-logic-testing",
    title: "Business Logic Testing",
    href: "/multitenant-qa/",
    hasPage: false,
    description:
      "Testing pricing, checkout, invoicing, reconciliation, progress tracking, and state rules against how the business actually works.",
    summary:
      "Finding the defects that pass every form validation but still cost money: pricing, invoicing, reconciliation, and state rules.",
    problems: [
      "Expired promotions still honored at checkout",
      "Overpayments accepted and invoice lines doubled across re-created batches",
      "Progress or reward systems that can be gamed",
    ],
    technologies: ["Exploratory testing", "Controlled reproduction", "Fault injection", "API testing"],
    proof: [
      "Pricing, reconciliation, and invoice findings on a B2B distribution platform",
      "XP/progress exploit identified on an AI education platform",
    ],
    caseStudies: ["multitenant-saas-qa"],
  },
];

export function getService(slug: ServiceSlug) {
  const service = services.find((item) => item.slug === slug);
  if (!service) throw new Error(`Unknown service: ${slug}`);
  return service;
}
