export function BusinessesRibbon() {
  const businesses = [
    { name: "TechPotion.ai", role: "QA Lead & AI Pipelines", highlight: "28K+ Records Enriched" },
    { name: "PharmaConnect", role: "B2B SaaS Lead QA", highlight: "80+ Defects Prevented" },
    { name: "ToolPotion", role: "Directory Invariants", highlight: "Multi-stage ETL & 50 Concurrency" },
    { name: "CloudFix-Bench", role: "Formal SMT Verification", highlight: "105 AWS Benchmark Invariants" },
  ];

  return (
    <div className="w-full bg-white border-b border-[#E8E1D7] py-3.5 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 flex items-center gap-4">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#827577] shrink-0 font-medium hidden sm:inline-block">
          Trusted Systems:
        </span>
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar scroll-smooth py-0.5">
          {businesses.map((b, i) => (
            <div key={b.name} className="flex items-center gap-2 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6B1724]" />
              <span className="font-serif text-sm font-medium text-[#1C1416]">
                {b.name}
              </span>
              <span className="text-xs font-mono text-[#827577]">
                ({b.highlight})
              </span>
              {i < businesses.length - 1 && (
                <span className="text-[#D8CEC1] ml-4 font-mono select-none">—</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
