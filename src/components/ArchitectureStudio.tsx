import {
  PipelineDiagram,
  SentinelDiagram,
  EmailAgentDiagram,
  MatrixDiagram,
  ComplianceDiagram,
  GuardrailDiagram,
} from "./diagrams";

interface ArchitectureStudioProps {
  activeDiagramKey: string;
  onSelectDiagramKey: (key: string) => void;
  onSelectCaseStudy: (slug: string) => void;
}

export function ArchitectureStudio({
  activeDiagramKey,
  onSelectDiagramKey,
  onSelectCaseStudy,
}: ArchitectureStudioProps) {
  const diagrams = [
    {
      key: "pipeline",
      title: "28K+ AI Enrichment Pipeline",
      category: "AI Infrastructure",
      slug: "ai-tool-enrichment-pipeline",
      component: <PipelineDiagram />,
      summary:
        "Records move sequentially through 8 discrete stages in PostgreSQL. Every LLM output is validated against strict JSON schemas before committing state. Malformed calls or timeouts leave state intact for retries without redoing completed stages.",
      specs: [
        "PostgreSQL Status Gatekeeping",
        "Gemini Flash Lite via OpenRouter",
        "Dynamic Circuit Breakers",
        "Automated Dead-Letter Queue",
      ],
    },
    {
      key: "sentinel",
      title: "Sentinel-Mesh Z3 SMT Verifier",
      category: "Formal Verification",
      slug: "sentinel-mesh",
      component: <SentinelDiagram />,
      summary:
        "AST-parsed Terraform models translated into first-order logical constraints solved by Z3. Synthesizes sound cloud misconfiguration remediations with mathematical proof certificates.",
      specs: [
        "Z3 SMT Solver Integration",
        "Sound Invariant Verification",
        "105 Benchmark Ground Truths",
        "Counterexample Generation",
      ],
    },
    {
      key: "email",
      title: "Autonomous Inbound Email Triage Agent",
      category: "Agentic Workflows",
      slug: "n8n-customer-support-agent",
      component: <EmailAgentDiagram />,
      summary:
        "Event-driven n8n workflow listening on webhooks. Employs ChromaDB semantic vector search and multi-turn conversation memory to draft contextually accurate responses under 3 minutes.",
      specs: [
        "n8n Self-Hosted Orchestration",
        "Llama 3.1 70B & Local ChromaDB",
        "Sentiment & Intent Classification",
        "Deterministic Fallback Escapes",
      ],
    },
    {
      key: "matrix",
      title: "PharmaConnect Multi-Tenant QA Matrix",
      category: "Enterprise QA",
      slug: "pharmaconnect-qa-matrix",
      component: <MatrixDiagram />,
      summary:
        "Full-funnel matrix spanning 20 critical B2B pharmaceutical procurement journeys. Prevented cross-tenant data leakage and verified compliance across multi-tier supplier authorization tiers.",
      specs: [
        "20 Critical Business Journeys",
        "Multi-Tenant Isolation Validation",
        "Strict HIPAA/Pharma RBAC Rules",
        "Postman Newman CI Regression",
      ],
    },
    {
      key: "compliance",
      title: "Autonomous Cloud Compliance Engine",
      category: "Cloud Auditing",
      slug: "autonomous-cloud-compliance",
      component: <ComplianceDiagram />,
      summary:
        "Continuous security scanner that inspects AWS IAM policies, security groups, and storage bucket ACLs against SOC2, CIS, and HIPAA baselines with automated dry-run remediation plans.",
      specs: [
        "AWS CloudTrail & Config Auditing",
        "Rule-Based Policy Evaluation",
        "Automated Dry-Run Simulations",
        "34% AWS Compute Optimization",
      ],
    },
    {
      key: "guardrail",
      title: "Schema Guardrail & Tool Gatekeeper",
      category: "AI Safety",
      slug: "ai-tool-enrichment-pipeline",
      component: <GuardrailDiagram />,
      summary:
        "Pre-execution tool-call gatekeeper enforcing deterministic JSON Schema validation, hallucination boundary checks, and rate-limited invocation quotas before downstream database writes.",
      specs: [
        "Strict JSON Schema Interceptors",
        "Deterministic Tool Gatekeeping",
        "Automated Parameter Sanitization",
        "Hallucination Filter Layer",
      ],
    },
  ];

  const activeDiagram = diagrams.find((d) => d.key === activeDiagramKey) || diagrams[0];

  return (
    <section id="architecture" className="py-20 border-b border-[#E8E1D7] bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#E8E1D7] gap-6">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#6B1724] mb-2 font-medium">
              02 / System Architecture
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1416] font-normal">
              Interactive Blueprints & Dataflows
            </h2>
          </div>
          <p className="text-sm text-[#5C5254] max-w-md">
            Click through production schematics to inspect pipeline state-gates, SMT solvers, and isolation boundaries.
          </p>
        </div>

        {/* Blueprint Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {diagrams.map((d) => {
            const isActive = d.key === activeDiagram.key;
            return (
              <button
                key={d.key}
                onClick={() => onSelectDiagramKey(d.key)}
                className={`px-3.5 py-2 rounded text-xs font-mono whitespace-nowrap transition-all border ${
                  isActive
                    ? "bg-[#6B1724] text-[#FAF8F5] border-[#6B1724] shadow-xs font-medium"
                    : "bg-white text-[#5C5254] border-[#E8E1D7] hover:border-[#6B1724] hover:text-[#1C1416]"
                }`}
              >
                {d.title}
              </button>
            );
          })}
        </div>

        {/* Blueprint Viewer Card */}
        <div className="bg-white border border-[#E8E1D7] rounded p-6 sm:p-10 shadow-xs">
          {/* Header of Active Diagram */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#E8E1D7] gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B1724] font-semibold">
                {activeDiagram.category}
              </span>
              <h3 className="font-serif text-2xl text-[#1C1416] mt-1">
                {activeDiagram.title}
              </h3>
            </div>

            <button
              onClick={() => onSelectCaseStudy(activeDiagram.slug)}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#6B1724] hover:text-[#54111B] transition-colors"
            >
              <span>View In-Depth Technical Report</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          {/* SVG Diagram Render Container */}
          <div className="overflow-x-auto py-4 diagram-container">
            <div className="min-w-[760px] flex justify-center">
              {activeDiagram.component}
            </div>
          </div>

          {/* Explanatory Specs Footer */}
          <div className="mt-8 pt-6 border-t border-[#E8E1D7] grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#827577] mb-1.5">
                Architecture Breakdown
              </div>
              <p className="text-sm text-[#5C5254] leading-relaxed">
                {activeDiagram.summary}
              </p>
            </div>

            <div className="md:col-span-4 md:border-l md:border-[#E8E1D7] md:pl-6">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#827577] mb-2">
                Guaranteed Invariants
              </div>
              <ul className="space-y-1.5">
                {activeDiagram.specs.map((spec) => (
                  <li key={spec} className="flex items-center gap-2 text-xs font-mono text-[#1C1416]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6B1724]" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
