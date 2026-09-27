export type ProjectCategory =
  | "AI Automation"
  | "AI Agents"
  | "n8n"
  | "Make.com"
  | "Cybersecurity"
  | "Cloud"
  | "Backend"
  | "Frontend"
  | "Research";

export type ProjectGroup = "ai-build" | "research" | "earlier";

export const projectGroups: { id: ProjectGroup; anchor: string; title: string; description: string }[] = [
  {
    id: "ai-build",
    anchor: "ai-engineering-builds",
    title: "Featured AI Engineering Builds",
    description: "Independent systems built around AI automation, agents, LLM pipelines, and workflow reliability.",
  },
  {
    id: "research",
    anchor: "research-builds",
    title: "Research",
    description: "Research software built alongside the Sentinel-Mesh preprint and the CloudFix-Bench benchmark.",
  },
  {
    id: "earlier",
    anchor: "earlier-builds",
    title: "Earlier / Other Independent Builds",
    description: "Security, full-stack, systems, and applied AI projects built outside the main AI engineering track.",
  },
];

export type Project = {
  slug: string;
  group: ProjectGroup;
  title: string;
  summary: string;
  highlights: string[];
  stack: string[];
  categories: ProjectCategory[];
  /** Commercially relevant projects shown on the homepage, in this order. */
  featured?: number;
  demoUrl?: string;
  repoUrl?: string;
  caseStudy?: string;
};

export const projectCategories: ProjectCategory[] = [
  "n8n",
  "AI Automation",
  "AI Agents",
  "Make.com",
  "Cloud",
  "Cybersecurity",
  "Backend",
  "Frontend",
  "Research",
];

export const projects: Project[] = [
  {
    slug: "ai-email-agent",
    group: "ai-build",
    featured: 1,
    title: "Autonomous AI Email Agent",
    summary:
      "Stateful recruiter-screening and technical Q&A assistant for email, answering from verified resume and portfolio information.",
    highlights: [
      "Gmail API ingestion with thread-state memory",
      "Groq inference for screening and reply drafting",
      "Answers grounded in verified profile data",
    ],
    stack: ["n8n", "Gmail API", "Groq", "RAG", "Google Sheets"],
    categories: ["n8n", "AI Agents"],
    demoUrl: "https://www.loom.com/share/9fbd2526672348f2b8c4284933817e39",
    repoUrl: "https://github.com/hira299/AI-Autonomous-Email-Agent",
    caseStudy: "/case-studies/n8n-email-agent/",
  },
  {
    slug: "cloud-compliance-engine",
    group: "ai-build",
    featured: 2,
    title: "Autonomous Cloud Compliance & AI Auditing Engine",
    summary:
      "Answers enterprise security questionnaires (CAIQ, SOC 2, SIG) from live AWS evidence and policy documents, using a LangGraph Corrective RAG agent that must cite a verified source for every answer.",
    highlights: [
      "6-node LangGraph CRAG state machine with a Critic Agent that verifies AWS ARNs and document sections",
      "Local PDF retrieval with FastEmbed and Supabase pgvector",
      "n8n and PostgreSQL queue worker; 2,000+ questions processed with no timeout failures (reported)",
      "Demo video shows the first, Langflow-based version",
    ],
    stack: ["LangGraph", "LangChain", "CRAG", "LlamaIndex", "Supabase pgvector", "Groq", "FastAPI", "n8n", "Docker", "AWS CLI"],
    categories: ["n8n", "Cloud", "Cybersecurity", "AI Agents"],
    demoUrl: "https://www.loom.com/share/ab966bb76ebd4c44bef1ec6b0c906fdc",
    repoUrl: "https://github.com/hira299/Cloud-Security-Audit-Compliance-Automation-Platform",
    caseStudy: "/case-studies/cloud-compliance/",
  },
  {
    slug: "agency-os",
    group: "ai-build",
    featured: 3,
    title: "Autonomous Competitor Intelligence & SEO Pipeline",
    summary:
      "Automation platform for competitor research, SEO brief generation, scraping-failure handling, QA routing, and SLA governance.",
    highlights: [
      "Scrapes competitor content and runs AI-assisted SEO gap analysis",
      "Creates structured ClickUp tasks with briefs attached",
      "PostgreSQL dead-letter queue for failed scrapes",
    ],
    stack: ["n8n", "ClickUp", "Gemini", "PostgreSQL"],
    categories: ["n8n", "AI Automation"],
    demoUrl: "https://www.loom.com/share/bec593a6caed4e4eb808a0bafdfa79a7",
    repoUrl: "https://github.com/hira299/Autonomous-Competitor-Intelligence-SEO-Pipeline",
  },
  {
    slug: "profitability-guardrail",
    group: "ai-build",
    featured: 4,
    title: "Autonomous Profitability Guardrail & State Machine",
    summary:
      "State-aware project-budget monitoring with Healthy → Warning → Critical transitions, DLQ-based error handling, and PostgreSQL audit logging.",
    highlights: [
      "Alerts fire only on state changes",
      "Malformed payloads isolated in a PostgreSQL DLQ",
      "95% reduction in notification noise, as reported in the project profile",
    ],
    stack: ["n8n", "PostgreSQL", "ClickUp", "Slack", "JavaScript", "SQL"],
    categories: ["n8n", "AI Automation", "Backend"],
    demoUrl: "https://www.loom.com/share/679eb54f26de4ab98d895c8f9c7f493b",
    repoUrl: "https://github.com/hira299/Financial-Profitability-Guardrail",
  },
  {
    slug: "cloud-cost-sentinel",
    group: "ai-build",
    featured: 5,
    title: "Autonomous Cloud Cost Sentinel",
    summary:
      "AI-assisted FinOps workflow that detects cloud-cost anomalies with a rolling average, diagnoses likely AWS cost drivers, and alerts engineering.",
    highlights: [
      "AWS Cost Explorer integration",
      "Rolling-average anomaly detection",
      "AI diagnosis of likely cost drivers",
    ],
    stack: ["n8n", "AWS Cost Explorer", "Gemini"],
    categories: ["n8n", "Cloud", "AI Automation"],
    repoUrl: "https://github.com/hira299/Cloud-Cost-Sentinel",
  },
  {
    slug: "langflow-research-engine",
    group: "ai-build",
    title: "Langflow RAG Agentic Research & Citation Engine",
    summary:
      "Planner-synthesizer RAG workflow that breaks a research question into searches, retrieves live web sources, and writes a report with citations.",
    highlights: [
      "Planner model decomposes prompts into search queries",
      "Tavily retrieval grounds claims in live sources",
      "Synthesis step produces reports with clickable citations",
    ],
    stack: ["Langflow", "OpenAI", "Tavily AI"],
    categories: ["AI Agents"],
    demoUrl: "https://www.loom.com/share/2bc96c7d096e49ecb84f2702f9ccba94",
  },
  {
    slug: "omnichannel-hub",
    group: "ai-build",
    title: "Make.com Omnichannel AI Content Hub",
    summary:
      "Parallel multi-branch automation that prepares platform-specific posts and visuals for X, LinkedIn, Instagram, and Facebook.",
    highlights: [
      "Router-based parallel branches per channel",
      "Per-platform prompt chains for tone and hashtags",
      "DALL-E 3 visuals with metadata logged to Google Sheets",
    ],
    stack: ["Make.com", "OpenAI", "DALL-E 3", "Google Sheets"],
    categories: ["Make.com", "AI Automation"],
    demoUrl: "https://www.loom.com/share/6b8653972e774a50b7a62c0cfb3af454",
  },
  {
    slug: "seo-content-lifecycle",
    group: "ai-build",
    title: "End-to-End SEO Content Lifecycle",
    summary:
      "Five-stage modular content pipeline (research, SEO metadata, drafting, QA, publish) with media optimization and WordPress publishing.",
    highlights: [
      "Stage-by-stage modular pipeline",
      "REST API publishing to WordPress",
      "Airtable content tracking",
    ],
    stack: ["Make.com", "WordPress", "Airtable", "OpenAI"],
    categories: ["Make.com", "AI Automation"],
    demoUrl: "https://www.loom.com/share/e808ab92876345e389f0072fb1677136",
  },
  {
    slug: "slack-wordpress-blogger",
    group: "ai-build",
    title: "Slack to WordPress AI Blogger",
    summary:
      "A single Slack message triggers web research, a research-grounded draft, archiving to Google Docs, Airtable logging, and WordPress publishing.",
    highlights: [
      "Live web scraping feeds context to the draft",
      "Google Docs archive and Airtable calendar logging",
    ],
    stack: ["Make.com", "Slack", "OpenAI", "WordPress", "Airtable", "Google Docs"],
    categories: ["Make.com", "AI Automation"],
    demoUrl: "https://www.loom.com/share/0ab30c4c687a4b2591a3b8646e6332b0",
  },
  {
    slug: "sentinel-mesh",
    group: "research",
    title: "Sentinel-Mesh & CloudFix-Bench",
    summary:
      "Neuro-symbolic framework combining LLM patch generation with Z3 SMT verification for autonomous remediation of cloud misconfigurations.",
    highlights: [
      "Z3 counterexample feedback loop, up to 5 LLM repair attempts per case",
      "83.81% reported remediation rate on CloudFix-Bench (105 AWS Terraform patterns)",
      "Research Square preprint; benchmark archived on Zenodo",
    ],
    stack: ["Python", "Z3 SMT", "Terraform", "Groq", "Gemini", "Cerebras"],
    categories: ["Research", "Cybersecurity", "Cloud"],
    repoUrl: "https://github.com/hira299/sentinel-mesh",
    caseStudy: "/case-studies/sentinel-mesh/",
  },
  {
    slug: "aegis-voice-dispatch",
    group: "earlier",
    title: "Aegis / Shield Real-Time Voice Dispatch",
    summary:
      "Client-side emergency dispatch dashboard that listens for spoken distress phrases, starts a PIN-cancellable countdown, and routes to Pakistan emergency responders on a map.",
    highlights: [
      "Streaming Web Speech API recognition with interim-result keyword matching",
      "5-second SOS countdown with PIN cancel and a Web Audio siren",
      "Pakistan responder directory (Rescue 1122, 15, 1099, Edhi 115) with map routing",
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind", "Web Speech API", "Web Audio API", "Leaflet"],
    categories: ["Frontend"],
    repoUrl: "https://github.com/hira299/aegis-realtime-voice-dispatch",
  },
  {
    slug: "browser-forensics",
    group: "earlier",
    title: "Browser Forensics & User Activity Reconstruction Console",
    summary:
      "Turns Chrome history exports (JSON/CSV) into structured activity timelines with deterministic threat scoring and AI-assisted forensic hypotheses.",
    highlights: [
      "Session timeline reconstruction",
      "Deterministic threat scoring",
      "Investigator workflow with AI-assisted hypotheses",
    ],
    stack: ["React", "TypeScript", "Express", "Tailwind", "Gemini"],
    categories: ["Cybersecurity", "AI Agents"],
    repoUrl: "https://github.com/hira299/browser-forensics-reconstruction",
  },
];

export const featuredProjects = projects
  .filter((project) => project.featured)
  .sort((a, b) => (a.featured ?? 0) - (b.featured ?? 0));
