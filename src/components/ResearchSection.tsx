import { useState } from "react";
import { research } from "@/data/research";
import { technicalResources } from "@/data/technical-resources";

interface ResearchSectionProps {
  onSelectCaseStudy: (slug: string) => void;
}

export function ResearchSection({ onSelectCaseStudy }: ResearchSectionProps) {
  const [copiedBibtex, setCopiedBibtex] = useState(false);

  const bibtex = `@article{ahmed2024sentinelmesh,
  title={Sentinel-Mesh: Formally Verified Remediation of Cloud Misconfigurations Using SMT Constraint Solving},
  author={Ahmed, Hira},
  journal={Research Square Preprint},
  year={2024},
  doi={10.21203/rs.3.rs-10674271/v1}
}`;

  const handleCopyBibtex = () => {
    navigator.clipboard.writeText(bibtex);
    setCopiedBibtex(true);
    setTimeout(() => setCopiedBibtex(false), 2000);
  };

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

        {/* Research Artifacts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-8 mb-6 sm:mb-12">
          {research.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E8E1D7] hover:border-[#6B1724] p-4 sm:p-8 rounded flex flex-col justify-between transition-all group hover:shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-[#E8E1D7] font-mono text-xs">
                  <span className="text-[#827577]">ARTIFACT / {String(idx + 1).padStart(2, "0")}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-[#FAF0F0] text-[#6B1724] border border-[#F0D5D8] uppercase">
                    {item.title.includes("Sentinel") ? "Preprint Paper" : "Zenodo Benchmark Dataset"}
                  </span>
                </div>

                <h3 className="text-lg sm:text-2xl font-serif text-[#1C1416] group-hover:text-[#6B1724] transition-colors mb-2 sm:mb-3">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#5C5254] leading-relaxed mb-3 sm:mb-6 font-normal">
                  {item.summary}
                </p>

                {/* Key Metrics / Highlights */}
                {item.highlights && (
                  <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-6 pt-3 sm:pt-4 border-t border-[#E8E1D7]">
                    {item.highlights.map((h, hidx) => (
                      <div key={hidx} className="flex items-start gap-2 text-xs font-mono text-[#5C5254]">
                        <span className="text-[#6B1724] font-bold">›</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 sm:pt-6 border-t border-[#E8E1D7] flex flex-wrap items-center gap-2.5 sm:gap-3">
                {item.links.map((link, lidx) => (
                  <a
                    key={lidx}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono text-[#1C1416] bg-[#FAF8F5] border border-[#E8E1D7] hover:border-[#6B1724] hover:text-[#6B1724] transition-colors"
                  >
                    <span>{link.label}</span>
                    <svg className="w-3 h-3 text-[#827577]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ))}

                {item.title.includes("Sentinel") && (
                  <button
                    onClick={() => onSelectCaseStudy("sentinel-mesh")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono text-[#FAF8F5] bg-[#6B1724] hover:bg-[#54111B] transition-colors font-medium ml-auto cursor-pointer"
                  >
                    <span>Read Architecture</span>
                    <span>→</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* BibTeX Citation Box */}
        <div className="bg-white border border-[#E8E1D7] rounded p-4 sm:p-6">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E8E1D7]">
            <div className="text-xs font-mono text-[#827577] uppercase tracking-wider">
              BibTeX Citation · Sentinel-Mesh Preprint
            </div>
            <button
              onClick={handleCopyBibtex}
              className="text-xs font-mono text-[#6B1724] hover:text-[#54111B] flex items-center gap-1.5 font-medium cursor-pointer"
            >
              <span>{copiedBibtex ? "Copied to Clipboard!" : "Copy BibTeX"}</span>
            </button>
          </div>
          <pre className="text-xs font-mono text-[#5C5254] overflow-x-auto bg-[#FAF8F5] p-3 sm:p-4 rounded border border-[#E8E1D7]">
            {bibtex}
          </pre>
        </div>

        {/* Technical Resources Cards */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#E8E1D7]">
          <div className="mb-4 sm:mb-6">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#6B1724] mb-1 font-medium">
              Open Technical Resources & Repositories
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#1C1416]">
              Production Engineering & QA Architecture Frameworks
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-8">
            {technicalResources.map((res, idx) => (
              <div
                key={res.slug}
                className="bg-white border border-[#E8E1D7] hover:border-[#6B1724] p-4 sm:p-8 rounded flex flex-col justify-between transition-all group hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-[#E8E1D7] font-mono text-xs">
                    <span className="text-[#827577]">RESOURCE / {String(idx + 1).padStart(2, "0")}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-[#FAF0F0] text-[#6B1724] border border-[#F0D5D8] uppercase">
                      Open Technical Resource
                    </span>
                  </div>

                  <h4 className="text-lg sm:text-xl font-serif text-[#1C1416] group-hover:text-[#6B1724] transition-colors mb-2 sm:mb-3">
                    {res.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#5C5254] leading-relaxed mb-3 sm:mb-6 font-normal">
                    {res.projectSummary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-3 sm:mb-6 pt-3 sm:pt-4 border-t border-[#E8E1D7]">
                    {res.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-xs font-mono bg-[#FAF8F5] text-[#5C5254] border border-[#E8E1D7]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 sm:pt-6 border-t border-[#E8E1D7] flex items-center justify-between">
                  <a
                    href={res.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono text-[#FAF8F5] bg-[#6B1724] hover:bg-[#54111B] transition-colors font-medium cursor-pointer"
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
