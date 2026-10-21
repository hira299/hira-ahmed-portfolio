export function BusinessesRibbon() {
  const businesses = [
    { name: "TechPotion.ai", role: "QA Lead & AI Pipelines", highlight: "28K+ Records Enriched" },
    { name: "PharmaConnect", role: "B2B SaaS Lead QA", highlight: "110+ Defects Documented" },
    { name: "ToolPotion", role: "Directory Invariants", highlight: "Multi-stage ETL & 50 Concurrency" },
    { name: "CloudFix-Bench", role: "Formal SMT Verification", highlight: "105 AWS Benchmark Invariants" },
  ];

  return (
    <div className="w-full bg-white border-b border-[#E8E1D7] py-3 overflow-hidden select-none">
      <div className="max-w-6xl mx-auto px-6 flex items-center gap-4">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#827577] shrink-0 font-medium hidden sm:inline-block">
          Trusted Systems:
        </span>
        <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div
            tabIndex={0}
            className="flex items-center gap-8 w-max ribbon-ticker-track focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6B1724]/40 rounded py-0.5"
            aria-label="Trusted client platforms and systems verification"
          >
            {/* Primary Track */}
            <div className="flex items-center gap-8 shrink-0">
              {businesses.map((b) => (
                <div key={b.name} className="flex items-center gap-2.5 shrink-0">
                  <svg className="w-2.5 h-2.5 text-[#6B1724]" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5Z" />
                  </svg>
                  <span className="font-serif text-sm font-medium text-[#1C1416]">
                    {b.name}
                  </span>
                  <span className="text-xs font-mono text-[#827577]">
                    ({b.highlight})
                  </span>
                </div>
              ))}
            </div>

            {/* Duplicate Track for Seamless Continuous Loop */}
            <div className="flex items-center gap-8 shrink-0" aria-hidden="true">
              {businesses.map((b) => (
                <div key={`${b.name}-dup`} className="flex items-center gap-2.5 shrink-0">
                  <svg className="w-2.5 h-2.5 text-[#6B1724]" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5Z" />
                  </svg>
                  <span className="font-serif text-sm font-medium text-[#1C1416]">
                    {b.name}
                  </span>
                  <span className="text-xs font-mono text-[#827577]">
                    ({b.highlight})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
