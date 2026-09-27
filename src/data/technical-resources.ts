export type TechnicalResource = {
  slug: string;
  title: string;
  homeLabel: string;
  projectLabel: string;
  homeSummary: string;
  projectSummary: string;
  tags: string[];
  repoUrl: string;
};

export const technicalResources: TechnicalResource[] = [
  {
    slug: "n8n-production-resilience-patterns",
    title: "n8n Production Resilience Patterns",
    homeLabel: "n8n · Automation · Reliability",
    projectLabel: "Public Technical Resource",
    homeSummary:
      "Production-oriented patterns for retries, PostgreSQL state, dead-letter queues, idempotency, rate limiting, concurrency, replay, and failure handling.",
    projectSummary:
      "A production-oriented collection of reusable n8n resilience patterns covering PostgreSQL-backed state, retries, dead-letter queues, idempotency, rate limiting, concurrency control, replay, and failure handling.",
    tags: ["n8n", "PostgreSQL", "Docker", "Reliability"],
    repoUrl: "https://github.com/hira299/n8n-production-resilience-patterns",
  },
  {
    slug: "enterprise-multitenant-qa-matrix",
    title: "Enterprise Multi-Tenant QA Matrix",
    homeLabel: "QA · Multi-Tenant · SaaS",
    projectLabel: "Public Technical Resource",
    homeSummary:
      "Reusable QA matrices and testing patterns covering RBAC, authentication, authorization, tenant isolation, API testing, business logic, payments, regression, exploratory testing, and AI workflows.",
    projectSummary:
      "Reusable testing matrices, checklists, and examples for multi-tenant SaaS QA, including RBAC, authentication, authorization, tenant isolation, API testing, business logic, payments, regression, exploratory testing, and AI workflows.",
    tags: ["QA", "Multi-Tenant SaaS", "API Testing", "RBAC"],
    repoUrl: "https://github.com/hira299/enterprise-multitenant-qa-matrix",
  },
];
