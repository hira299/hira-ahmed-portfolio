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

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
          {services.map((svc: Service, index: number) => {
            const num = String(index + 1).padStart(2, "0");
            return (
              <div
                key={svc.slug}
                className="bg-white border border-[#E8E1D7] hover:border-[#6B1724] rounded p-4 sm:p-7 flex flex-col justify-between transition-all group hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-4">
                    <span className="font-mono text-xs text-[#827577]">{num}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider bg-[#FAF0F0] text-[#6B1724] border border-[#F0D5D8] uppercase">
                      Practice
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl text-[#1C1416] group-hover:text-[#6B1724] transition-colors mb-2 sm:mb-3">
                    {svc.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5C5254] leading-relaxed mb-3 sm:mb-6">
                    {svc.description}
                  </p>

                  {/* Problems and Proof */}
                  <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-6 pt-3 sm:pt-4 border-t border-[#E8E1D7]">
                    <div className="text-xs">
                      <span className="font-mono text-[10px] uppercase text-[#827577] block mb-0.5 sm:mb-1">
                        Addressed Bottleneck
                      </span>
                      <p className="text-[#827577] italic font-serif text-[12px] sm:text-[13px] pl-2 border-l-2 border-[#E8E1D7]">
                        "{svc.problems[0] || svc.summary}"
                      </p>
                    </div>

                    <div className="text-xs">
                      <span className="font-mono text-[10px] uppercase text-[#6B1724] block mb-0.5 sm:mb-1 font-semibold">
                        System Proof / Guarantee
                      </span>
                      <p className="text-[#1C1416] font-medium text-[12px] sm:text-[13px] pl-2 border-l-2 border-[#6B1724]">
                        {svc.proof[0] || "Deterministic execution with automated error recovery"}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 pt-3 sm:pt-4 border-t border-[#E8E1D7] mb-3 sm:mb-5">
                    {svc.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] font-mono bg-[#FAF8F5] text-[#5C5254] border border-[#E8E1D7] rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onOpenHireModal(svc.title)}
                    className="w-full py-1.5 sm:py-2 text-xs font-mono text-[#6B1724] group-hover:text-white bg-[#FAF0F0] group-hover:bg-[#6B1724] border border-[#F0D5D8] group-hover:border-[#6B1724] rounded text-center transition-all font-medium cursor-pointer"
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
