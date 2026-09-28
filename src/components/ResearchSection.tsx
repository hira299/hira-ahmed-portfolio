import { research } from "@/data/research";
import { technicalResources } from "@/data/technical-resources";

interface ResearchSectionProps {
  onSelectCaseStudy: (slug: string) => void;
}

export function ResearchSection({ onSelectCaseStudy }: ResearchSectionProps) {

  return (
    <section id="research" className="pt-2 pb-12 border-b border-[#E8E1D7] bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-12 pb-4 sm:pb-6 border-b border-[#E8E1D7] gap-4 sm:gap-6">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#6B1724] mb-1.5 sm:mb-2 font-medium">
              05 / Formal Research & Publications
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#1C1416] font-normal">
              Scientific Artifacts & Peer Review
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#5C5254] max-w-md">
            Peer-reviewed and preprint contributions applying automated theorem proving (Z3 SMT) and constraint solvers to cloud reliability.
          </p>
        </div>

        {/* Research Artifacts Grid - 3-column layout matching repo cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 mb-5 sm:mb-8">
          {research.map((item, idx) => (
            <div
              key={idx}
              className="relative bg-white border border-[#E8E1D7] hover:border-[#6B1724] rounded-lg p-4 sm:p-5 flex flex-col justify-between transition-all group hover:shadow-sm"
            >
              {/* Smaller Ticket Notches */}
              <div className="ticket-notch-sm-left" aria-hidden="true" />
              <div className="ticket-notch-sm-right" aria-hidden="true" />

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[11px] text-[#6B1724] font-medium">
                    ARTIFACT / {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#FAF0F0] text-[#6B1724] border border-[#F0D5D8] uppercase">
                    {item.title.includes("Sentinel")
                      ? "Preprint Paper"
                      : item.title.includes("CloudFix")
                      ? "Zenodo Benchmark"
                      : "Peer Review"}
                  </span>
                </div>

                <h3 className="font-serif text-base sm:text-lg text-[#1C1416] group-hover:text-[#6B1724] transition-colors mb-1.5 leading-snug line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-xs text-[#5C5254] leading-relaxed mb-2.5 line-clamp-2">
                  {item.summary}
                </p>

                {/* Key Highlights */}
                {item.highlights && (
                  <div className="space-y-1 mb-2.5 pt-2 border-t border-[#E8E1D7]">
                    {item.highlights.slice(0, 2).map((h, hidx) => (
                      <div key={hidx} className="flex items-start gap-1.5 text-[10px] font-mono text-[#5C5254]">
                        <span className="text-[#6B1724] font-bold">›</span>
                        <span className="line-clamp-1">{h}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Links as Tags */}
                <div className="flex flex-wrap gap-1 mb-2.5">
                  {item.title.includes("Sentinel") ? (
                    <>
                      <div className="w-full flex">
                        <a
                          href={item.links[0].href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-1.5 py-0.5 text-[9px] font-mono bg-[#FAF8F5] text-[#5C5254] hover:text-[#6B1724] border border-[#E8E1D7] hover:border-[#6B1724] rounded flex items-center gap-1 transition-colors"
                        >
                          <span>{item.links[0].label}</span>
                          <svg className="w-2.5 h-2.5 text-[#827577]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                      <div className="w-full flex flex-wrap gap-1">
                        {item.links.slice(1).map((link, lidx) => (
                          <a
                            key={lidx}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-1.5 py-0.5 text-[9px] font-mono bg-[#FAF8F5] text-[#5C5254] hover:text-[#6B1724] border border-[#E8E1D7] hover:border-[#6B1724] rounded flex items-center gap-1 transition-colors"
                          >
                            <span>{link.label}</span>
                            <svg className="w-2.5 h-2.5 text-[#827577]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        ))}
                      </div>
                    </>
                  ) : (
                    item.links.map((link, lidx) => (
                      <a
                        key={lidx}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-1.5 py-0.5 text-[9px] font-mono bg-[#FAF8F5] text-[#5C5254] hover:text-[#6B1724] border border-[#E8E1D7] hover:border-[#6B1724] rounded flex items-center gap-1 transition-colors"
                      >
                        <span>{link.label}</span>
                        <svg className="w-2.5 h-2.5 text-[#827577]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ))
                  )}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-2.5 border-t border-[#E8E1D7] flex items-center justify-between gap-2 text-xs font-mono">
                {item.title.includes("Sentinel") ? (
                  <button
                    onClick={() => onSelectCaseStudy("sentinel-mesh")}
                    className="text-[#6B1724] hover:underline flex items-center gap-1 font-medium cursor-pointer"
                  >
                    <span>Read Architecture</span>
                    <span>→</span>
                  </button>
                ) : (
                  <span className="text-[#827577] text-[11px]">
                    {item.title.includes("CloudFix") ? "Open Benchmark" : "Verified Review"}
                  </span>
                )}

                <span className="text-[#827577] text-[10px]">
                  {item.title.includes("Sentinel")
                    ? "Research Square"
                    : item.title.includes("CloudFix")
                    ? "Zenodo Archive"
                    : "Web of Science"}
                </span>
              </div>
            </div>
          ))}
        </div>


        {/* Technical Resources Cards */}
        <div className="pt-4 sm:pt-6 border-t border-[#E8E1D7]">
          <div className="mb-3 sm:mb-4">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#6B1724] mb-1 font-medium">
              Open Technical Resources & Repositories
            </div>
            <h3 className="font-serif text-lg sm:text-xl text-[#1C1416]">
              Production Engineering & QA Architecture Frameworks
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-4">
            {technicalResources.map((res, idx) => (
              <div
                key={res.slug}
                className="bg-white border border-[#E8E1D7] hover:border-[#6B1724] p-4 sm:p-5 rounded-lg flex flex-col justify-between transition-all group hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E8E1D7] font-mono text-[11px]">
                    <span className="text-[#827577]">RESOURCE / {String(idx + 1).padStart(2, "0")}</span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] bg-[#FAF0F0] text-[#6B1724] border border-[#F0D5D8] uppercase">
                      Open Technical Resource
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-serif text-[#1C1416] group-hover:text-[#6B1724] transition-colors mb-1.5">
                    {res.title}
                  </h4>

                  <p className="text-xs text-[#5C5254] leading-relaxed mb-2.5 line-clamp-2 font-normal">
                    {res.projectSummary}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-2.5 pt-2 border-t border-[#E8E1D7]">
                    {res.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#FAF8F5] text-[#5C5254] border border-[#E8E1D7]"
                      >
                        {tag}
                      </span>
                    ))}
                    {res.tags.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono text-[#827577]">
                        +{res.tags.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-2.5 border-t border-[#E8E1D7] flex items-center justify-between">
                  <a
                    href={res.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono text-[#FAF8F5] bg-[#6B1724] hover:bg-[#54111B] transition-colors font-medium cursor-pointer"
                  >
                    <span>View Repository on GitHub</span>
                    <svg className="w-3 h-3 text-[#FAF8F5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
