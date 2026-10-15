import type { ServiceSlug } from "./services";

export type CaseStudySlug =
  | "n8n-email-agent"
  | "28k-record-pipeline"
  | "multitenant-saas-qa"
  | "tekruiter-qa"
  | "toolpotion-qa"
  | "ai-cloud-academy-qa"
  | "aws-cost-optimization"
  | "cloud-compliance"
  | "sentinel-mesh";

export type CaseStudyKind = "professional" | "build" | "research";

export const caseStudyKindLabels: Record<CaseStudyKind, string> = {
  professional: "Professional Case Study",
  build: "AI Engineering Build",
  research: "Research Case Study",
};

export type CaseStudy = {
  slug: CaseStudySlug;
  kind: CaseStudyKind;
  title: string;
  href: string;
  description: string;
  summary: string;
  client: string;
  role: string;
  stack: string[];
  metrics: { value: string; label: string }[];
  services: ServiceSlug[];
  projects: string[];
  links: { label: string; href: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "28k-record-pipeline",
    kind: "professional",
    title: "28K+ AI Enrichment Pipeline Case Study | Hira Ahmed",
    href: "/case-studies/28k-record-pipeline/",
    description:
      "Production AI pipeline processing 28,000+ records with status-gated LLM stages, 9 translations, and a 5.6x speedup. Read the full case study.",
    summary:
      "A production AI pipeline that scrapes, enriches, translates, and publishes 28,000+ AI tool listings, with status-gated LLM stages that never skip a failure.",
    client: "TechPotion.ai",
    role: "Backend & Automation Engineer",
    stack: ["Python", "OpenRouter", "Gemini Flash Lite", "PostgreSQL", "Playwright", "Selenium", "BeautifulSoup", "AWS", "Next.js", "FastAPI"],
    metrics: [
      { value: "28,000+", label: "Production records" },
      { value: "4", label: "Sequential LLM stages" },
      { value: "9", label: "Languages translated" },
      { value: "5.6x", label: "Processing speedup" },
      { value: "34%", label: "Monthly AWS cost reduction on the platform" },
      { value: "95%", label: "Reported extraction success rate" },
    ],
    services: ["ai-automation", "api-integrations"],
    projects: ["sentinel-mesh"],
    links: [],
  },
  {
    slug: "aws-cost-optimization",
    kind: "professional",
    title: "AWS Cost Optimization Case Study | Hira Ahmed",
    href: "/case-studies/aws-cost-optimization/",
    description:
      "Cutting monthly AWS infrastructure spend by 34% across Lambda, API Gateway, and PostgreSQL on a 28K+ record platform. Read the breakdown.",
    summary:
      "Finding where a production AWS setup spent money it didn't need to, and cutting monthly cost by 34%.",
    client: "TechPotion.ai",
    role: "Backend & Automation Engineer",
    stack: ["AWS Lambda", "API Gateway", "EventBridge", "SQS", "RDS PostgreSQL", "EC2", "S3", "IAM", "CodeBuild"],
    metrics: [{ value: "34%", label: "Monthly AWS cost reduction" }],
    services: ["ai-automation"],
    projects: ["cloud-cost-sentinel"],
    links: [],
  },
  {
    slug: "multitenant-saas-qa",
    kind: "professional",
    title: "PharmaConnect: Multi-Tenant SaaS QA | Hira Ahmed",
    href: "/case-studies/multitenant-saas-qa/",
    description:
      "Lead QA on a multi-tenant B2B pharma platform: 20 end-to-end journeys across 6 user roles and 110+ documented defects. Read the case study.",
    summary:
      "Lead QA on a multi-tenant pharmaceutical distribution platform: 20 journeys, 110+ defects across 15 modules, 15 critical findings, and 75 closed fixes.",
    client: "PharmaConnect",
    role: "Lead QA",
    stack: ["Exploratory testing", "API testing", "Browser network inspection", "curl", "RBAC permission matrix"],
    metrics: [
      { value: "20", label: "End-to-end journeys (17 passed, 3 failed)" },
      { value: "6", label: "User roles tested" },
      { value: "110+", label: "Defects documented (108 in sheet)" },
      { value: "15", label: "Critical P1 findings" },
      { value: "15", label: "Modules tested" },
      { value: "75", label: "Verified & closed fixes" },
    ],
    services: ["qa-testing", "multitenant-qa", "api-testing", "business-logic-testing"],
    projects: [],
    links: [
      {
        label: "enterprise-multitenant-qa-matrix",
        href: "https://github.com/hira299/enterprise-multitenant-qa-matrix",
      },
    ],
  },
  {
    slug: "tekruiter-qa",
    kind: "professional",
    title: "Tekruiter: Recruitment Platform QA | Hira Ahmed",
    href: "/case-studies/tekruiter-qa/",
    description:
      "Lead QA on Tekruiter, a multi-tenant recruitment SaaS: 60+ defects across 20+ modules, including a $7.95M billing calculation bug. Read the case study.",
    summary:
      "Lead QA across 20+ modules of a multi-tenant recruitment platform: privacy boundary audits, financial billing arithmetic checks, and invoice database integrity testing.",
    client: "Tekruiter",
    role: "Lead QA",
    stack: ["Multi-tenant testing", "RBAC privacy checks", "API inspection", "Financial calculation audits", "Database integrity"],
    metrics: [
      { value: "60+", label: "Defects documented" },
      { value: "20+", label: "Modules tested" },
      { value: "6", label: "Personas tested" },
      { value: "Led with 2nd tester", label: "Testing team structure" },
      { value: "57", label: "Defects in sheet (47 + 10 second tester)" },
      { value: "1", label: "Critical P1 finding" },
    ],
    services: ["qa-testing", "multitenant-qa", "api-testing", "business-logic-testing"],
    projects: [],
    links: [],
  },
  {
    slug: "toolpotion-qa",
    kind: "professional",
    title: "ToolPotion: 28K+ AI Directory QA | Hira Ahmed",
    href: "/case-studies/toolpotion-qa/",
    description:
      "QA governance for a 28,000+ listing AI directory: 1,300+ defects across 10 QA rounds, with phishing and malware listings flagged. Read the case study.",
    summary:
      "Directory quality assurance across 10 QA rounds: 1,300+ defects documented, data integrity enforcement, malicious listing isolation, and 300+ verified fixes.",
    client: "ToolPotion.ai",
    role: "Quality Assurance Lead",
    stack: ["Data integrity audits", "URL verification", "Security threat flagging", "Exploratory testing", "Regression sweeps"],
    metrics: [
      { value: "1,300+", label: "Defects (1,398 logged entries)" },
      { value: "10", label: "QA rounds" },
      { value: "170+", label: "Critical defects (172)" },
      { value: "300+", label: "Fixes verified (316 closed)" },
      { value: "190+", label: "Dead or fake tools identified" },
      { value: "3", label: "Malicious listings flagged" },
    ],
    services: ["qa-testing", "api-testing"],
    projects: [],
    links: [],
  },
  {
    slug: "ai-cloud-academy-qa",
    kind: "professional",
    title: "AI Cloud Academy: E-Learning Platform QA | Hira Ahmed",
    href: "/case-studies/ai-cloud-academy-qa/",
    description:
      "Platform and curriculum QA across 37 courses: 80+ defects logged, including mobile progression blockers and a gamification XP exploit. Read the case study.",
    summary:
      "E-learning QA across 37 courses: 80+ defects, mobile navigation and progression fixes, gamification XP exploit remediation, and 68 video recommendations.",
    client: "AI Cloud Academy",
    role: "Quality Assurance Lead",
    stack: ["E-Learning QA", "Progress tracking validation", "Gamification testing", "Cross-device testing", "Curriculum review"],
    metrics: [
      { value: "80+", label: "Defects logged (85 entries, 69 unique)" },
      { value: "5", label: "QA rounds" },
      { value: "37", label: "Courses audited" },
      { value: "40+", label: "Fixes verified (41 closed after retest)" },
      { value: "68", label: "Video-content recommendations" },
      { value: "12", label: "Critical defects" },
    ],
    services: ["qa-testing", "api-testing"],
    projects: [],
    links: [],
  },
  {
    slug: "n8n-email-agent",
    kind: "build",
    title: "Autonomous n8n AI Email Agent | Hira Ahmed",
    href: "/case-studies/n8n-email-agent/",
    description:
      "Stateful n8n email agent with multi-turn thread memory and Groq LLM inference for autonomous inbound screening and drafting. Read the case study.",
    summary:
      "A stateful n8n agent that reads incoming email, remembers the whole thread, answers from verified information, and drafts replies.",
    client: "Independent build",
    role: "Designed and built the workflow end-to-end",
    stack: ["n8n", "Gmail API", "Groq", "RAG", "Google Sheets", "Cloudflare Tunnel"],
    metrics: [
      { value: "Multi-turn", label: "Thread memory across replies" },
      { value: "Self-hosted", label: "n8n behind Cloudflare Tunnel" },
    ],
    services: ["n8n-automation", "ai-agents", "api-integrations"],
    projects: ["ai-email-agent"],
    links: [
      { label: "Demo (Loom)", href: "https://www.loom.com/share/9fbd2526672348f2b8c4284933817e39" },
      { label: "Repository", href: "https://github.com/hira299/AI-Autonomous-Email-Agent" },
    ],
  },
  {
    slug: "cloud-compliance",
    kind: "build",
    title: "Cloud Compliance Corrective RAG | Hira Ahmed",
    href: "/case-studies/cloud-compliance/",
    description:
      "LangGraph Corrective RAG auditing engine answering 250+ question reviews from live AWS evidence with verified citations. Read the case study.",
    summary:
      "Collecting live AWS evidence, then answering enterprise security questionnaires with a LangGraph Corrective RAG agent that must cite a verified source for every answer.",
    client: "Independent build",
    role: "Designed and built both versions end-to-end",
    stack: ["LangGraph", "LangChain", "CRAG", "LlamaIndex", "Groq (Llama 3.1 8B)", "Supabase pgvector", "FastEmbed", "PyMuPDF", "FastAPI", "n8n", "PostgreSQL", "Docker", "AWS CLI"],
    metrics: [
      { value: "~90%", label: "Reported cut in questionnaire turnaround" },
      { value: "250+", label: "Questions per enterprise review" },
      { value: "2,000+", label: "Questions processed, no timeout failures (reported)" },
      { value: "0.95", label: "Reported semantic relevance score" },
    ],
    services: ["ai-agents", "ai-automation", "n8n-automation"],
    projects: ["cloud-compliance-engine"],
    links: [
      {
        label: "n8n-production-resilience-patterns",
        href: "https://github.com/hira299/n8n-production-resilience-patterns",
      },
      {
        label: "Repository",
        href: "https://github.com/hira299/Cloud-Security-Audit-Compliance-Automation-Platform",
      },
      { label: "Demo of the first version (Loom)", href: "https://www.loom.com/share/ab966bb76ebd4c44bef1ec6b0c906fdc" },
    ],
  },
  {
    slug: "sentinel-mesh",
    kind: "research",
    title: "Sentinel-Mesh: Verified Cloud Remediation | Hira Ahmed",
    href: "/case-studies/sentinel-mesh/",
    description:
      "Closed-loop LLM remediation with Z3 SMT verification for Terraform misconfigurations, evaluated on CloudFix-Bench. Read the case study and preprint.",
    summary:
      "A neuro-symbolic research framework: an LLM proposes Terraform fixes, and a Z3 SMT verifier accepts only patches that provably satisfy cloud security invariants.",
    client: "Independent research · Research Square preprint, manuscript under review",
    role: "Lead author and developer",
    stack: ["Python", "Z3 SMT", "Terraform (HCL)", "python-hcl2", "Groq", "Gemini", "Cerebras", "Checkov (baseline)"],
    metrics: [
      { value: "83.81%", label: "Reported remediation rate (88/105)" },
      { value: "105", label: "CloudFix-Bench cases" },
      { value: "0.0%", label: "Reported security regression rate, within scope" },
      { value: "29", label: "Formal proof certificates issued" },
    ],
    services: ["ai-agents"],
    projects: ["sentinel-mesh"],
    links: [
      { label: "Research Square preprint", href: "https://www.researchsquare.com/article/rs-10674271/latest" },
      { label: "Preprint DOI", href: "https://doi.org/10.21203/rs.3.rs-10674271/v1" },
      { label: "CloudFix-Bench on Zenodo", href: "https://doi.org/10.5281/zenodo.20975067" },
      { label: "Repository", href: "https://github.com/hira299/sentinel-mesh" },
      {
        label: "Technical article (Medium)",
        href: "https://medium.com/@hira299/beyond-heuristics-formally-verifying-ai-generated-infrastructure-with-z3-smt-solvers-e95fd3a7bf95",
      },
    ],
  },
];

export function getCaseStudy(slug: CaseStudySlug) {
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) throw new Error(`Unknown case study: ${slug}`);
  return study;
}
