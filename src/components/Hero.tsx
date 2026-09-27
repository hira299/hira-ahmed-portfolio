import { useState, useEffect } from "react";
import { profile } from "@/data/profile";
import { email, socialLinks } from "@/data/social-links";

interface HeroProps {
  onOpenHireModal: () => void;
  onSelectCaseStudy: (slug: string) => void;
}

export function Hero({ onOpenHireModal, onSelectCaseStudy }: HeroProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const enterTimer = setTimeout(() => setMounted(true), 60);
    const finishTimer = setTimeout(() => setHasEntered(true), 1100);
    return () => {
      clearTimeout(enterTimer);
      clearTimeout(finishTimer);
    };
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const productionInvariants = [
    {
      badge: "28K+",
      value: "28,000+",
      label: "AI Records Enriched",
      system: "ToolPotion (TechPotion.ai)",
      context: "Status-gated LLM pipeline across 28K+ URLs with structured output validation.",
      slug: "28k-record-pipeline",
    },
    {
      badge: "80+",
      value: "20 / 80+",
      label: "Journeys & Defects",
      system: "PharmaConnect",
      context: "Lead QA across 6 RBAC roles on multi-tenant SaaS; 11 critical P1 findings resolved.",
      slug: "multitenant-saas-qa",
    },
    {
      badge: "34%",
      value: "34%",
      label: "Monthly AWS Cost Cut",
      system: "TechPotion.ai / ToolPotion",
      context: "Cloud infrastructure optimization across AWS Lambda, RDS PostgreSQL, and API Gateway.",
      slug: "aws-cost-optimization",
    },
    {
      badge: "84%",
      value: "83.81%",
      label: "SMT Verified Repair",
      system: "Sentinel-Mesh (Research)",
      context: "Neuro-symbolic formal verification of AWS Terraform misconfigurations with Z3 SMT.",
      slug: "sentinel-mesh",
    },
  ];

  return (
    <section className="pt-36 pb-6 sm:pt-44 sm:pb-8 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Main Hero: Left Bio + Right Production Invariants & Impact */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Heading, Bio, Actions */}
          <div className="lg:col-span-8 space-y-4 pt-1 sm:pt-2">
            {/* Eyebrow Tag: 0ms fade */}
            <div
              style={{ transitionDelay: "0ms" }}
              className={`font-mono text-xs sm:text-sm text-[#6B1724] uppercase tracking-widest font-medium transition-all duration-500 ease-out ${
                mounted ? "opacity-100" : "opacity-0"
              }`}
            >
              AI Engineer &amp; Systems QA Lead
            </div>

            {/* Main Title <h1>: 100ms delay, 4px gentle drift up & fade */}
            <h1
              style={{ transitionDelay: "100ms" }}
              className={`font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1416] tracking-tight font-normal leading-tight max-w-3xl transition-all duration-500 ease-out ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
              }`}
            >
              Engineering autonomous LLM pipelines and{" "}
              <span className="italic text-[#6B1724]">high-assurance multi-tenant QA architectures</span>{" "}
              for mission-critical software.
            </h1>

            {/* Bio Description: 220ms delay, 4px gentle drift up & fade */}
            <p
              style={{ transitionDelay: "220ms" }}
              className={`text-sm sm:text-base text-[#5C5254] leading-relaxed max-w-xl font-sans transition-all duration-500 ease-out ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
              }`}
            >
              Specialized in fault-tolerant AI data enrichment (Python, n8n, pgvector) alongside rigorous end-to-end enterprise software verification (Postman, RBAC isolation, API defect reproduction).
            </p>

            {/* Action Buttons & Links: Tightened spacing */}
            <div className="pt-1.5 sm:pt-2 space-y-2.5">
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                {/* Refined Start an Engagement button with hand-drawn pen/crayon loop on desktop hover */}
                <div className="relative inline-flex items-center group/engage">
                  <button
                    onClick={onOpenHireModal}
                    className="group relative z-10 px-4 py-2 text-xs font-mono font-medium tracking-wide bg-[#6B1724] hover:bg-[#54111B] text-[#FAF8F5] rounded-full transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Start an Engagement</span>
                    <svg className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>

                  {/* Hand-drawn crayon/pen circle: big, fat, framing button from the outside without cutting text */}
                  <svg
                    className="hidden md:block absolute -inset-x-5 -inset-y-3.5 w-[calc(100%+40px)] h-[calc(100%+28px)] pointer-events-none z-20 overflow-visible text-[#6B1724] -rotate-2 origin-center"
                    viewBox="0 0 250 72"
                    fill="none"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M 38,10 C 85,5 170,4 232,12 C 248,16 248,36 242,52 C 234,64 180,69 110,69 C 50,69 12,65 6,50 C 2,36 12,18 42,9 C 95,3 182,5 236,15 C 250,22 246,48 234,58 C 218,70 150,71 90,70 C 35,69 6,61 6,44 C 6,28 22,12 55,8"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                      className="sketch-circle-path opacity-0 group-hover/engage:opacity-100"
                    />
                  </svg>
                </div>

                {/* Full email displayed directly on the button with soft rounded pill */}
                <button
                  onClick={copyEmail}
                  className="group px-3.5 py-2 text-xs font-mono border border-[#E8E1D7] hover:border-[#6B1724]/70 bg-white hover:bg-[#FAF8F5] text-[#1C1416] hover:text-[#6B1724] rounded-full transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-2xs hover:shadow-xs hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
                  title="Click to copy email address"
                >
                  <svg className="w-3.5 h-3.5 text-[#6B1724] transition-transform duration-200 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{copied ? "Copied to clipboard!" : email}</span>
                </button>

                {/* Resume download button with soft pill and hover micro-interaction */}
                <a
                  href={socialLinks.resume}
                  download
                  className="group px-3.5 py-2 text-xs font-mono border border-[#E8E1D7] hover:border-[#6B1724]/70 bg-white hover:bg-[#FAF8F5] text-[#5C5254] hover:text-[#1C1416] rounded-full transition-all duration-200 flex items-center gap-1.5 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer"
                >
                  <svg className="w-3 h-3 text-[#827577] group-hover:text-[#6B1724] transition-all duration-200 group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Resume (PDF)</span>
                </a>
              </div>

              {/* Seamless light text links with 45-degree arrow */}
              <div className="flex items-center gap-5 pl-0.5 text-xs font-mono text-[#5C5254] pt-1">
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#6B1724] transition-colors py-1 group"
                >
                  <span>GitHub</span>
                  <svg
                    className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>

                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#6B1724] transition-colors py-1 group"
                >
                  <span>LinkedIn</span>
                  <svg
                    className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Production Invariants & Impact (airy, minimal format matching previous styling) */}
          <div className="lg:col-span-4 lg:col-start-9 space-y-4 pt-2">
            <div
              style={{ transitionDelay: "40ms" }}
              className={`text-[11px] font-mono text-[#827577] uppercase tracking-widest font-medium pb-2 border-b border-[#E8E1D7] transition-all duration-500 ease-out ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              Production Invariants &amp; Impact
            </div>

            <div className="space-y-3">
              {productionInvariants.map((item, index) => (
                <div
                  key={item.label}
                  onClick={() => onSelectCaseStudy(item.slug)}
                  style={{
                    transitionDelay: hasEntered ? "0ms" : `${index * 120 + 90}ms`,
                  }}
                  className={`group flex items-start gap-3.5 p-2 -mx-2 rounded-lg hover:bg-white/80 transition-all ${
                    hasEntered ? "duration-200" : "duration-500 ease-out"
                  } cursor-pointer hover:translate-x-1 ${
                    mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                  }`}
                >
                  {/* Clean monogram icon with metric badge */}
                  <div className="w-10 h-10 rounded-lg bg-[#FAF0F0] border border-[#F0D5D8] group-hover:border-[#6B1724] group-hover:bg-[#6B1724] flex items-center justify-center shrink-0 transition-colors shadow-2xs">
                    <span className="font-mono text-xs font-semibold text-[#6B1724] group-hover:text-[#FAF8F5] transition-colors">
                      {item.badge}
                    </span>
                  </div>

                  {/* Text details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-serif text-[15px] font-medium text-[#1C1416] group-hover:text-[#6B1724] transition-colors">
                        {item.value} {item.label}
                      </span>
                      <span className="text-[10px] font-mono text-[#827577] group-hover:text-[#6B1724] transition-colors">
                        ↗
                      </span>
                    </div>
                    <div className="text-xs text-[#6B1724] font-mono mt-0.5">
                      {item.system}
                    </div>
                    <div className="text-xs text-[#5C5254] mt-0.5 leading-snug">
                      {item.context}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
