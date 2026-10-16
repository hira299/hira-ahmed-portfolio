interface QuickFactsProps {
  className?: string;
}

export function QuickFacts({ className = "" }: QuickFactsProps) {
  const facts = [
    {
      label: "Identity & Role",
      value:
        "Hira Ahmed is an AI Engineer & Systems QA Lead specializing in autonomous LLM pipelines, n8n automations, and multi-tenant SaaS QA.",
    },
    {
      label: "Target Markets & Hours",
      value:
        "Available remotely for teams in the US, Canada, UK, Ireland, and Germany. Working hours: 7:00 PM to 3:00 AM PKT.",
    },
    {
      label: "Primary Stack",
      value:
        "Python, LangGraph, CRAG, pgvector, FastAPI, PostgreSQL, AWS, n8n, and the Z3 SMT solver.",
    },
    {
      label: "Engagement & Availability",
      value:
        "Direct contract engagements, retained QA advisory, and sprint-based automation delivery. Available remotely for US, Canada, UK, Ireland, and Germany teams.",
    },
  ];

  return (
    <section aria-label="Quick Facts" className={`pb-8 sm:pb-10 bg-[#FAF8F5] ${className}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="bg-white border border-[#E8E1D7] rounded-xl p-5 sm:p-7 shadow-xs">
          <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#F0EBE1]">
            <span className="w-2 h-2 rounded-full bg-[#6B1724]" />
            <h2 className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#6B1724] font-semibold">
              Quick Facts · At a Glance
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="p-3.5 sm:p-4 rounded-lg bg-[#FAF8F5] border border-[#F0EBE1]"
              >
                <div className="text-[10px] font-mono text-[#827577] uppercase tracking-wider font-semibold mb-1">
                  {fact.label}
                </div>
                <p className="text-xs sm:text-sm text-[#1C1416] leading-relaxed">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
