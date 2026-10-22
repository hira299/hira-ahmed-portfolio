import { useState } from "react";
import { services, type Service } from "@/data/services";

interface ServicesSectionProps {
  onOpenHireModal: (serviceTitle?: string) => void;
  inModal?: boolean;
}

export function ServicesSection({ onOpenHireModal, inModal = false }: ServicesSectionProps) {
  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string>(services[0]?.slug || "");
  const selectedMobileService = services.find((s) => s.slug === selectedServiceSlug) || services[0];
  const selectedMobileIndex = services.findIndex((s) => s.slug === (selectedMobileService?.slug || ""));

  return (
    <section id="services" className={inModal ? "pt-1 pb-1 bg-[#FAF8F5]" : "pt-3 sm:pt-2 pb-1 sm:pb-12 border-b-0 sm:border-b border-[#E8E1D7] bg-[#FAF8F5]"}>
      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        {/* Section Header */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between ${inModal ? "mb-2 sm:mb-8 pb-1.5 sm:pb-4" : "mb-4 sm:mb-12 pb-3 sm:pb-6"} border-b border-[#E8E1D7] gap-1 sm:gap-6`}>
          <div>
            <div className={`text-[9px] sm:text-[11px] font-mono uppercase tracking-widest text-[#6B1724] ${inModal ? "mb-0.5" : "mb-1 sm:mb-2"} font-medium`}>
              03 / Engineering Capabilities
            </div>
            <h2 className={`font-serif ${inModal ? "text-lg sm:text-4xl" : "text-xl sm:text-4xl"} text-[#1C1416] font-normal`}>
              Services &amp; Practice Areas
            </h2>
          </div>
          <p className="hidden md:block text-xs sm:text-sm text-[#5C5254] max-w-md">
            Production-grade engineering across autonomous AI workflows, deterministic tool calling, and high-assurance B2B SaaS QA.
          </p>
        </div>

        {/* Mobile View: Dropdown Selector + Single Focused Card */}
        <div className={`md:hidden ${inModal ? "space-y-3 mb-2" : "space-y-3 mb-3"}`}>
          <div>
            <label
              htmlFor="mobile-practice-select"
              className="block text-[9.5px] sm:text-[10px] font-mono uppercase tracking-wider text-[#827577] mb-1.5 font-medium"
            >
              Choose Service ({services.length} practice areas)
            </label>
            <div className="relative">
              <select
                id="mobile-practice-select"
                value={selectedServiceSlug}
                onChange={(e) => setSelectedServiceSlug(e.target.value)}
                className="w-full appearance-none bg-white border border-[#E8E1D7] focus:border-[#6B1724] rounded-lg px-3 py-2 text-xs font-mono font-medium text-[#1C1416] pr-8 outline-none shadow-xs"
              >
                {services.map((svc: Service, idx: number) => (
                  <option key={svc.slug} value={svc.slug}>
                    {String(idx + 1).padStart(2, "0")} · {svc.title}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#827577]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Selected Single Card with comfortable breathing room above and below */}
          {selectedMobileService && (
            <div className={`relative bg-white plate-frame rounded-lg ${inModal ? "p-3.5 sm:p-5" : "p-4 sm:p-5"} flex flex-col justify-between shadow-xs mt-3`}>
              <div className="ticket-notch-sm-left" aria-hidden="true" />
              <div className="ticket-notch-sm-right" aria-hidden="true" />

              <div>
                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                  <span className="font-mono text-[10.5px] sm:text-[11px] text-[#827577]">
                    {String(selectedMobileIndex + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono tracking-wider bg-[#FAF0F0] text-[#6B1724] border border-[#F0D5D8] uppercase font-medium">
                    Service
                  </span>
                </div>

                <h3 className="font-serif text-base sm:text-lg text-[#1C1416] mb-1.5 font-normal">
                  <a
                    href={selectedMobileService.href}
                    className="hover:text-[#6B1724] transition-colors inline-block"
                  >
                    {selectedMobileService.title}
                  </a>
                </h3>

                <p className="text-[11.5px] sm:text-xs text-[#5C5254] leading-snug mb-2.5">
                  {selectedMobileService.description}
                </p>

                {/* Highlighted Proof */}
                <div className="text-xs py-2 px-2.5 bg-[#FAF8F5] border-l-2 border-[#6B1724] rounded-r mb-2.5">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#6B1724] block font-semibold mb-0.5">
                    Proof
                  </span>
                  <p className="text-[#1C1416] text-[11px] font-medium leading-snug">
                    {selectedMobileService.proof[0] || "Deterministic execution with automated error recovery"}
                  </p>
                </div>
              </div>

              <div>
                {/* Technologies */}
                <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-2 border-t border-[#E8E1D7] mb-2.5">
                  {selectedMobileService.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-1.5 py-0.5 text-[9px] font-mono bg-[#FAF8F5] text-[#5C5254] border border-[#E8E1D7] rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {selectedMobileService.technologies.length > 4 && (
                    <span className="px-1.5 py-0.5 text-[9px] font-mono text-[#827577]">
                      +{selectedMobileService.technologies.length - 4}
                    </span>
                  )}
                </div>

                {inModal && (
                  <div className="mb-2 text-right">
                    <a
                      href={selectedMobileService.href.split("#")[0]}
                      className="inline-flex items-center py-0.5 text-[11px] font-mono text-[#6B1724] underline decoration-1 hover:text-[#54111B] focus:outline-none transition-colors cursor-pointer"
                    >
                      <span>View full page →</span>
                      <span className="sr-only"> for {selectedMobileService.title}</span>
                    </a>
                  </div>
                )}

                <button
                  onClick={() => onOpenHireModal(selectedMobileService.title)}
                  className="w-full py-2.5 px-3 bg-[#FAF0F0] hover:bg-[#6B1724] text-[#6B1724] hover:text-[#FAF8F5] border border-[#F0D5D8] hover:border-[#6B1724] rounded font-mono text-xs font-medium tracking-wide transition-all text-center block shadow-xs leading-tight cursor-pointer"
                >
                  Inquire for {selectedMobileService.title} →
                </button>
              </div>
            </div>
          )}
        </div>


        {/* Desktop Services Grid (Unchanged) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {services.map((svc: Service, index: number) => {
            const num = String(index + 1).padStart(2, "0");
            return (
              <div
                key={svc.slug}
                className="relative bg-white plate-frame rounded-lg p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 group hover:shadow-md hover:-translate-y-0.5"
              >
                {/* Smaller Ticket Notches */}
                <div className="ticket-notch-sm-left" aria-hidden="true" />
                <div className="ticket-notch-sm-right" aria-hidden="true" />

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[11px] text-[#827577]">{num}</span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono tracking-wider bg-[#FAF0F0] text-[#6B1724] border border-[#F0D5D8] uppercase">
                      Service
                    </span>
                  </div>

                  <h3 className="font-serif text-base sm:text-lg text-[#1C1416] mb-1.5">
                    <a
                      href={svc.href}
                      className="hover:text-[#6B1724] transition-colors inline-block"
                    >
                      {svc.title}
                    </a>
                  </h3>

                  <p className="text-xs text-[#5C5254] leading-relaxed line-clamp-2 mb-3">
                    {svc.description}
                  </p>

                  {/* Highlighted Proof */}
                  <div className="text-xs py-2 px-2.5 bg-[#FAF8F5] border-l-2 border-[#6B1724] rounded-r mb-3">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#6B1724] block font-semibold mb-0.5">
                      Proof
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

                  {inModal && (
                    <div className="mb-2 text-right">
                      <a
                        href={svc.href.split("#")[0]}
                        className="inline-flex items-center min-h-[44px] py-2 text-[12px] font-mono text-[#6B1724] underline decoration-1 hover:text-[#54111B] focus:outline-none focus:ring-2 focus:ring-[#6B1724] focus:ring-offset-2 transition-colors cursor-pointer"
                      >
                        <span>View full page →</span>
                        <span className="sr-only"> for {svc.title}</span>
                      </a>
                    </div>
                  )}

                  <button
                    onClick={() => onOpenHireModal(svc.title)}
                    className="w-full py-2 px-2 text-xs font-mono text-[#6B1724] group-hover:text-white bg-[#FAF0F0] group-hover:bg-[#6B1724] border border-[#F0D5D8] group-hover:border-[#6B1724] rounded text-center transition-all font-medium cursor-pointer leading-tight break-words flex items-center justify-center"
                  >
                    Inquire for {svc.title} →
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
