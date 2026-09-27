export type Metric = {
  value: string;
  label: string;
  context: string;
};

export const profile = {
  name: "Hira Ahmed",
  role: "AI Automation & QA Engineer",
  careerRole: "AI Engineer",
  positioning: "n8n | AI Agents | LLM Systems | API Testing | B2B SaaS QA",
  statement:
    "I build production AI systems and automations, then verify that the systems behind them behave reliably.",
  identity:
    "An AI Engineer and AI Automation Engineer who builds LLM pipelines, AI agents, and automations, and also provides specialized n8n automation and B2B SaaS QA services.",
  shortBio:
    "AI Engineer building production LLM pipelines, AI agents, and n8n automations, with hands-on QA and API testing for B2B SaaS platforms.",
  longBio: [
    "I'm an AI Engineer. I build production AI systems: multi-stage LLM enrichment pipelines, retrieval-augmented agents, and automations that connect models to real data, APIs, and databases.",
    "My engineering work spans Python, LangGraph, CRAG, pgvector, FastAPI, PostgreSQL, AWS, n8n, and Make.com. I built and maintained a production AI pipeline behind a 28,000+ record directory, with status-gated LLM stages, structured outputs, multilingual enrichment, and fault-tolerant parallel processing.",
    "I also test the systems I and others build. My QA work covers end-to-end journeys, API-level reproduction, authentication and authorization, multi-tenant isolation, business logic, financial reconciliation, and release verification, with 678+ defects identified and documented across QA engagements.",
  ],
  workflow: ["Build", "Integrate", "Test", "Verify", "Deploy"],
  location: "Karachi, Sindh, Pakistan",
  workPreference: "Remote and international projects",
  availability: "Working hours overlap with US Eastern and Pacific business hours.",
  languages: ["English", "Urdu", "Hindi"],
  education: {
    degree: "B.S. Cybersecurity",
    institution: "Sir Syed University of Engineering and Technology",
  },
  career: {
    target: "AI Engineer",
    related: ["AI Automation Engineer", "LLM Engineer", "Backend / AI Engineer", "Generative AI Engineer"],
  },
  freelance: {
    services: [
      "n8n Automation",
      "AI Automation",
      "AI Agent Development",
      "B2B SaaS QA",
      "API Testing",
      "Multi-Tenant QA",
    ],
  },
  metrics: [
    {
      value: "28,000+",
      label: "Production records",
      context: "Processed by a production AI enrichment pipeline",
    },
    {
      value: "5.6x",
      label: "Pipeline speedup",
      context: "Fault-tolerant parallel processing across 28K+ URLs",
    },
    {
      value: "34%",
      label: "AWS cost reduction",
      context: "Monthly infrastructure cost, via query and execution-flow optimization",
    },
    {
      value: "678+",
      label: "QA defects documented",
      context: "Identified and documented across QA engagements and production testing",
    },
    {
      value: "20",
      label: "End-to-end QA journeys",
      context: "On PharmaConnect, a multi-tenant B2B platform",
    },
    {
      value: "105",
      label: "CloudFix-Bench patterns",
      context: "AWS Terraform misconfiguration benchmark for Sentinel-Mesh",
    },
  ] satisfies Metric[],
  stack: [
    {
      group: "LLM Systems & Agents",
      items: [
        "LangGraph",
        "LangChain",
        "LlamaIndex",
        "Langflow",
        "RAG",
        "CRAG",
        "Structured outputs / JSON mode",
        "Prompt engineering",
        "Agentic workflows",
      ],
    },
    {
      group: "Models & Retrieval",
      items: ["OpenAI", "Gemini", "Groq", "OpenRouter", "Llama 3.1", "pgvector", "FastEmbed", "Tavily AI"],
    },
    {
      group: "Automation",
      items: ["n8n", "Make.com", "State machines", "Dead-letter queues", "API orchestration"],
    },
    {
      group: "Backend & Data",
      items: ["Python", "FastAPI", "PostgreSQL", "Supabase", "JavaScript", "TypeScript", "Next.js"],
    },
    {
      group: "Cloud & Infrastructure",
      items: ["AWS Lambda", "EC2", "RDS", "SQS", "EventBridge", "API Gateway", "S3", "Docker", "Terraform"],
    },
    {
      group: "QA & Reliability",
      items: [
        "Exploratory testing",
        "API testing",
        "RBAC testing",
        "Multi-tenant isolation",
        "Business-logic testing",
        "AI workflow testing",
        "Regression verification",
      ],
    },
  ],
  knowsAbout: [
    "AI engineering",
    "Large language model systems",
    "AI agent development",
    "Retrieval-augmented generation",
    "Corrective RAG",
    "LangGraph",
    "LangChain",
    "AI automation",
    "n8n workflow automation",
    "Self-hosted n8n",
    "AI workflow testing",
    "API integration",
    "API testing",
    "B2B SaaS quality assurance",
    "Multi-tenant testing",
    "Role-based access control testing",
    "Business-logic testing",
    "Python",
    "FastAPI",
    "PostgreSQL",
    "pgvector",
    "Amazon Web Services",
    "Terraform",
    "Docker",
    "Make.com",
    "Cloud security",
    "Formal verification",
  ],
} as const;
