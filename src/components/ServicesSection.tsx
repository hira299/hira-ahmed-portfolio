import { services, type Service } from "@/data/services";

interface ServicesSectionProps {
  onOpenHireModal: (serviceTitle?: string) => void;
}

export function ServicesSection({ onOpenHireModal }: ServicesSectionProps) {
  return (
    <section id="services" className="pt-2 pb-12 border-b border-[#E8E1D7] bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-12 pb-4 sm:pb-6 border-b border-[#E8E1D7] gap-4 sm:gap-6">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#6B1724] mb-1.5 sm:mb-2 font-medium">
              03 / Engineering Capabilities
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#1C1416] font-normal">
              Services &amp; Practice Areas
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#5C5254] max-w-md">
            Production-grade engineering across autonomous AI workflows, deterministic tool calling, and high-assurance B2B SaaS QA.
          </p>
        </div>

        {/* Services Grid: Compact, clean cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {services.map((svc: Service, index: number) => {
            const num = String(index + 1).padStart(2, "0");
            return (
              <div
                key={svc.slug}
                className="bg-white border border-[#E8E1D7] hover:border-[#6B1724] rounded-lg p-4 sm:p-5 flex flex-col justify-between transition-all group hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[11px] text-[#827577]">{num}</span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono tracking-wider bg-[#FAF0F0] text-[#6B1724] border border-[#F0D5D8] uppercase">
                      Practice
                    </span>
                  </div>

                  <h3 className="font-serif text-base sm:text-lg text-[#1C1416] group-hover:text-[#6B1724] transition-colors mb-1.5">
                    {svc.title}
                  </h3>

                  <p className="text-xs text-[#5C5254] leading-relaxed line-clamp-2 mb-3">
                    {svc.description}
                  </p>

                  {/* Highlighted Guarantee */}
                  <div className="text-xs py-2 px-2.5 bg-[#FAF8F5] border-l-2 border-[#6B1724] rounded-r mb-3">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#6B1724] block font-semibold mb-0.5">
                      System Guarantee
                    </span>
                    <p className="text-[#1C1416] text-[11px] font-medium leading-snug line-clamp-2">
                      {svc.proof[0] || "Deterministic execution with automated error recovery"}
                    </p>
                  </div>
                </div>

                <div>
                  {/* Technologies: Compact badges */}
                  <div className="flex flex-wrap gap-1 pt-2.5 border-t border-[#E8E1D7] mb-3">
                    {svc.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-1.5 py-0.5 text-[9px] font-mono bg-[#FAF8F5] text-[#5C5254] border border-[#E8E1D7] rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {svc.technologies.length > 3 && (
                      <span className="px-1.5 py-0.5 text-[9px] font-mono text-[#827577]">
                        +{svc.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onOpenHireModal(svc.title)}
                    className="w-full py-1.5 text-xs font-mono text-[#6B1724] group-hover:text-white bg-[#FAF0F0] group-hover:bg-[#6B1724] border border-[#F0D5D8] group-hover:border-[#6B1724] rounded text-center transition-all font-medium cursor-pointer"
                  >
                    Inquire for {svc.title.split(" ")[0]} →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
