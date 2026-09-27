export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  title: string;
  href: string;
  description?: string;
  links: NavLink[];
  /** Topics covered by the group that have no dedicated page. */
  topics?: string[];
};

export type NavMenu = {
  id: string;
  label: string;
  /** Paths that mark this menu as the current section. */
  match: string[];
  groups: NavGroup[];
  footer?: NavLink[];
  /** Subtle section label above the mega-menu columns. */
  sectionLabel?: string;
  sectionHref?: string;
};

export const navMenus: NavMenu[] = [
  {
    id: "work",
    label: "Work",
    match: ["/case-studies/", "/projects/"],
    groups: [
      {
        title: "Professional Case Studies",
        href: "/case-studies/#professional",
        links: [
          { label: "28K+ Production AI Enrichment & Content Pipeline", href: "/case-studies/28k-record-pipeline/" },
          { label: "AWS Infrastructure & Cost Optimization", href: "/case-studies/aws-cost-optimization/" },
          {
            label: "Multi-Tenant B2B SaaS QA",
            href: "/case-studies/multitenant-saas-qa/",
            description: "Enterprise QA and business-logic validation",
          },
        ],
      },
      {
        title: "AI Engineering Builds",
        href: "/projects/#ai-engineering-builds",
        links: [
          { label: "Autonomous AI Email Agent", href: "/case-studies/n8n-email-agent/" },
          { label: "Cloud Compliance & AI Auditing Engine", href: "/case-studies/cloud-compliance/" },
          { label: "Competitor Intelligence & SEO Pipeline", href: "/projects/#agency-os" },
          { label: "Profitability Guardrail & State Machine", href: "/projects/#profitability-guardrail" },
          { label: "Cloud Cost Sentinel", href: "/projects/#cloud-cost-sentinel" },
          { label: "Langflow RAG Research & Citation Engine", href: "/projects/#langflow-research-engine" },
          { label: "Make.com Omnichannel AI Content Hub", href: "/projects/#omnichannel-hub" },
        ],
      },
      {
        title: "Earlier / Other Independent Builds",
        href: "/projects/#earlier-builds",
        links: [
          {
            label: "View earlier builds",
            href: "/projects/#earlier-builds",
            description: "Aegis / Shield, Browser Forensics",
          },
        ],
      },
      {
        title: "Open Technical Resources",
        href: "/projects/#open-technical-resources",
        links: [
          {
            label: "View technical resources",
            href: "/projects/#open-technical-resources",
            description: "Public n8n resilience patterns and multi-tenant QA matrices",
          },
        ],
      },
    ],
    footer: [
      { label: "All case studies", href: "/case-studies/" },
      { label: "All projects", href: "/projects/" },
    ],
  },
  {
    id: "expertise",
    label: "Expertise",
    sectionLabel: "Services I Offer",
    sectionHref: "/#services",
    match: ["/ai-automation/", "/ai-agents/", "/n8n-automation/", "/qa-testing/", "/api-testing/", "/multitenant-qa/"],
    groups: [
      {
        title: "AI Engineering",
        href: "/ai-agents/",
        links: [
          { label: "AI Automation", href: "/ai-automation/" },
          { label: "AI Agents", href: "/ai-agents/" },
          { label: "AI Pipelines", href: "/case-studies/28k-record-pipeline/" },
        ],
        topics: ["LLM Systems", "RAG"],
      },
      {
        title: "Automation",
        href: "/n8n-automation/",
        links: [
          { label: "n8n Automation", href: "/n8n-automation/" },
          { label: "Make.com", href: "/projects/#omnichannel-hub" },
        ],
        topics: ["Workflow Reliability", "State Machines", "DLQs"],
      },
      {
        title: "Backend & Cloud",
        href: "/case-studies/aws-cost-optimization/",
        links: [
          { label: "AWS", href: "/case-studies/aws-cost-optimization/" },
          { label: "API Integrations", href: "/ai-automation/" },
        ],
        topics: ["Python", "FastAPI", "PostgreSQL", "Docker"],
      },
      {
        title: "QA & Reliability",
        href: "/qa-testing/",
        links: [
          { label: "B2B SaaS QA", href: "/qa-testing/" },
          { label: "API Testing", href: "/api-testing/" },
          { label: "Multi-Tenant Testing", href: "/multitenant-qa/" },
        ],
        topics: ["RBAC", "Business Logic", "AI Workflow Testing"],
      },
    ],
  },
  {
    id: "research",
    label: "Research",
    match: ["/research/", "/case-studies/sentinel-mesh/"],
    groups: [
      {
        title: "Research",
        href: "/research/",
        links: [
          {
            label: "Sentinel-Mesh",
            href: "/case-studies/sentinel-mesh/",
            description: "Neuro-symbolic AI + formal verification",
          },
          {
            label: "CloudFix-Bench",
            href: "/research/#cloudfix-bench",
            description: "105 AWS Terraform misconfiguration patterns",
          },
          {
            label: "Publications & Artifacts",
            href: "/research/#publications",
            description: "Research Square, Zenodo, ORCID, ResearchGate, IEEE Access reviews",
          },
        ],
      },
    ],
  },
  {
    id: "about",
    label: "About",
    match: ["/about/", "/faq/"],
    groups: [
      {
        title: "About",
        href: "/about/",
        links: [
          { label: "About Hira", href: "/about/" },
          { label: "Experience", href: "/about/#how-i-got-here" },
          { label: "Research & Credentials", href: "/research/" },
          { label: "FAQ", href: "/faq/" },
          { label: "Contact", href: "/contact/" },
        ],
      },
    ],
  },
];
