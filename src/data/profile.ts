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
    "QA Lead across four concurrent client contracts with 1,500+ defects documented, building production AI systems and verifying mission-critical architectures.",
  identity:
    "An AI Engineer and Quality Assurance Lead who builds LLM pipelines, AI agents, and automations, while directing multi-tenant B2B SaaS QA across four client contracts.",
  shortBio:
    "QA Lead across four concurrent client contracts with 1,500+ documented defects, specializing in multi-tenant B2B SaaS, API verification, and autonomous LLM pipelines.",
  longBio: [
    "I'm an AI Engineer and Quality Assurance Lead. I lead QA across four concurrent client contracts of multi-tenant B2B software, having documented 1,500+ defects while testing and verifying end-to-end business workflows, APIs, authorization boundaries, data integrity, and security-sensitive edge cases.",
    "My engineering work spans Python, LangGraph, CRAG, pgvector, FastAPI, PostgreSQL, AWS, n8n, and Make.com. I built and maintained a production AI pipeline behind a 28,000+ record directory, with status-gated LLM stages, structured outputs, multilingual enrichment, and fault-tolerant parallel processing.",
    "Across my QA contracts, I have led testing on PharmaConnect (110+ defects across 20 journeys and 15 modules), Tekruiter (60+ defects across 20+ modules), ToolPotion (1,300+ defects across 10 QA rounds), and AI Cloud Academy (80+ defects across 37 courses), verifying and closing hundreds of production fixes through rigorous retesting.",
  ],
  workflow: ["Build", "Integrate", "Test", "Verify", "Deploy"],
  location: "Karachi, Sindh, Pakistan",
  workPreference: "Remote and international projects",
  availability: "European working hours (CET) overlap · Remote",
  languages: ["English", "Urdu", "Hindi"],
  education: {
    degree: "B.S. Cybersecurity",
    institution: "Sir Syed University of Engineering and Technology",
  },
  career: {
    target: "AI Engineer",
    related: ["QA Lead", "AI Automation Engineer", "Backend / AI Engineer", "LLM Engineer"],
  },
  freelance: {
    services: [
      "B2B SaaS QA",
      "Multi-Tenant QA",
      "API Testing",
      "n8n Automation",
      "AI Automation",
      "AI Agent Development",
    ],
  },
  metrics: [
    {
      value: "1,500+",
      label: "QA defects documented",
      context: "Documented across four concurrent client contracts and production testing",
    },
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
      value: "110+",
      label: "PharmaConnect defects",
      context: "Across 20 end-to-end journeys and 15 modules on a multi-tenant B2B platform",
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
