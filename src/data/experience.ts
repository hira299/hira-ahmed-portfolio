export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  country: "Malaysia" | "Pakistan";
  flag: string;
  description: string;
  summary: string;
  deliverables: string[];
  metrics: Array<{ label: string; value: string }>;
  verifiedEvidence: string;
}

export const experience: ExperienceItem[] = [
  {
    company: "TechPotion.ai",
    role: "Quality Assurance Lead",
    period: "Sep 2026 – Present",
    location: "Kuala Lumpur, Malaysia (Remote)",
    country: "Malaysia",
    flag: "🇲🇾",
    description:
      "Directing end-to-end quality assurance across 3 production products: PharmaConnect (enterprise healthcare procurement), ToolPotion AI directory, and AI Academy Cloud certification systems.",
    summary:
      "Spearheaded multi-tenant security, RBAC privilege isolation, API integration validation, and production defect triage.",
    deliverables: [
      "Orchestrated 80+ defect triage passes with curl payloads across 20 user journeys on PharmaConnect.",
      "Identified and mitigated 11 critical P1 defects, including tenant session leaks and order authorization flaws.",
      "Conducted load testing, content workflow tests, and progress-tracking exploit analysis on AI Academy Cloud.",
      "Governed listing integrity and QA validation cycles for ToolPotion's 28,000+ record directory.",
    ],
    metrics: [
      { label: "Defects Triaged & Remediated", value: "80+" },
      { label: "Critical P1s Resolved", value: "11" },
      { label: "Products Governed", value: "3" },
    ],
    verifiedEvidence:
      "Lead QA on PharmaConnect B2B multi-tenant healthcare SaaS and ToolPotion systems at TechPotion.ai.",
  },
  {
    company: "TechPotion.ai",
    role: "Backend & Automation Engineer",
    period: "Jan 2025 – Sep 2026",
    location: "Kuala Lumpur, Malaysia (Remote)",
    country: "Malaysia",
    flag: "🇲🇾",
    description:
      "Engineered autonomous LLM pipelines, parallel data processing architectures, and AWS cloud infrastructure optimization for high-scale AI products.",
    summary:
      "Architected the 28K+ record AI tool enrichment pipeline and optimized production AWS workloads.",
    deliverables: [
      "Engineered 50-worker parallel Python ETL pipeline with circuit-breakers and retry queues for 28,000+ AI tools.",
      "Integrated Gemini Flash Lite for structured JSON metadata extraction, tagging, and 9-language translation.",
      "Optimized AWS Lambda execution flows, API Gateway routes, and RDS PostgreSQL indexing, slashing monthly AWS cloud spend by 34%.",
      "Built pgvector semantic search and automated hygiene scrapers eliminating 190+ stale listings.",
    ],
    metrics: [
      { label: "AI Records Enriched", value: "28,000+" },
      { label: "ETL Concurrency Speedup", value: "5.6x" },
      { label: "Monthly AWS Cost Cut", value: "34%" },
    ],
    verifiedEvidence:
      "Production ETL pipeline and AWS cloud optimization at TechPotion.ai.",
  },
  {
    company: "Sadiq.ai",
    role: "QA Intern",
    period: "Jun 2024 – Aug 2024",
    location: "Karachi, Pakistan (Hybrid)",
    country: "Pakistan",
    flag: "🇵🇰",
    description:
      "Executed manual and automated functional QA, API testing with Postman, and regression testing across cross-platform mobile and web applications.",
    summary:
      "Built Flutter test automation suites and logged 150+ documented bugs.",
    deliverables: [
      "Authored 120+ structured manual test cases spanning authentication, edge-case network drops, and device rotations.",
      "Developed Flutter automated integration test suites reducing smoke test execution time by 60%.",
      "Logged and tracked 150+ reproducible defects in Jira with step-by-step reproduction scripts and network logs.",
      "Performed cross-browser and cross-device testing across iOS, Android, and web viewports.",
    ],
    metrics: [
      { label: "Bugs Logged & Verified", value: "150+" },
      { label: "Regression Time Cut", value: "60%" },
      { label: "Test Cases Authored", value: "120+" },
    ],
    verifiedEvidence:
      "Mobile & web QA testing internship at Sadiq.ai, Karachi.",
  },
];
