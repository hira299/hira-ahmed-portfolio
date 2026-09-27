import { caseStudies } from "@/data/case-studies";

interface CaseStudiesSectionProps {
  onSelectCaseStudy: (slug: string) => void;
  onOpenArchive?: () => void;
}

export function CaseStudiesSection({ onSelectCaseStudy, onOpenArchive }: CaseStudiesSectionProps) {
  // Top 3 Flagship Systems:
  // 01: ToolPotion (28,000+ Record AI Enrichment Pipeline)
  // 02: Autonomous Cloud Compliance & AI Auditing Engine (LangGraph + CRAG)
  // 03: Sentinel-Mesh (Neuro-symbolic Formal Verification + Z3 SMT)
  const topThree = [
    caseStudies.find((c) => c.slug === "28k-record-pipeline") || caseStudies[0],
    caseStudies.find((c) => c.slug === "cloud-compliance") || caseStudies[4],
    caseStudies.find((c) => c.slug === "sentinel-mesh") || caseStudies[5],
  ];

  return (
    <section id="work" className="pt-12 pb-6 sm:pt-14 sm:pb-8 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#E8E1D7] gap-4">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#6B1724] mb-2 font-medium">
              01 / Selected Work
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1416] font-normal">
              Flagship Production Systems
            </h2>
          </div>
          {onOpenArchive && (
            <button
              onClick={onOpenArchive}
              className="text-xs font-mono font-medium text-[#6B1724] hover:underline flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <span>View Full Archive (10+ Repos)</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* 1 Row, 3 Columns Grid (3 Cards): Compact & Balanced */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
          {topThree.map((study, index) => {
            const num = String(index + 1).padStart(2, "0");
            const kindLabel =
              study.kind === "professional"
                ? "Enterprise System"
                : study.kind === "research"
                ? "Formal Verification"
                : "AI Engineering Build";

            return (
              <div
                key={study.slug}
                onClick={() => onSelectCaseStudy(study.slug)}
                className="group relative flex flex-col justify-between bg-white border border-[#E8E1D7] hover:border-[#6B1724] p-4 sm:p-5 rounded-lg transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-md hover:-translate-y-0.5"
              >
                {/* Ticket Notch Semicircles (Left & Right) */}
                <span className="ticket-notch-left" aria-hidden="true" />
                <span className="ticket-notch-right" aria-hidden="true" />

                <div>
                  {/* Top Bar: Number & Kind Tag */}
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#F0EBE1]">
                    <span className="font-serif text-lg sm:text-xl font-light text-[#D8CEC1] group-hover:text-[#6B1724] transition-colors">
                      {num}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono tracking-wider bg-[#FAF0F0] text-[#6B1724] border border-[#F0D5D8] uppercase font-medium">
                      {kindLabel}
                    </span>
                  </div>

                  {/* Client & Title */}
                  <div className="text-[10px] font-mono text-[#827577] uppercase tracking-wider mb-0.5">
                    {study.client}
                  </div>
                  <h3 className="font-serif text-base sm:text-lg text-[#1C1416] group-hover:text-[#6B1724] transition-colors mb-1.5 leading-snug font-normal line-clamp-1">
                    {study.title}
                  </h3>

                  {/* Summary: Neat 2-line clamp */}
                  <p className="text-xs text-[#5C5254] leading-relaxed mb-2.5 line-clamp-2">
                    {study.description}
                  </p>
                </div>

                <div>
                  {/* Compact Verified Metric Inline Strip */}
                  <div className="py-1.5 px-2.5 rounded bg-[#FAF8F5] border border-[#E8E1D7] mb-2.5 flex items-center justify-between gap-2">
                    <div className="text-[10px] font-mono text-[#5C5254] truncate">
                      {study.metrics[0]?.label ?? "Verified Invariant"}
                    </div>
                    <div className="font-serif text-sm sm:text-base font-medium text-[#6B1724] shrink-0">
                      {study.metrics[0]?.value ?? "Verified"}
                    </div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1 mb-2.5">
                    {study.stack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-1.5 py-0.5 text-[9px] font-mono bg-white text-[#5C5254] border border-[#E8E1D7] rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {study.stack.length > 3 && (
                      <span className="px-1 py-0.5 text-[9px] font-mono text-[#827577]">
                        +{study.stack.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-2 border-t border-[#F0EBE1] flex items-center justify-between text-[11px] font-mono text-[#6B1724] font-medium group-hover:translate-x-0.5 transition-transform">
                    <span>Read Deep Dive</span>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
