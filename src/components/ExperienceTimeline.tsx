import { useState, useEffect, useRef } from "react";
import { socialLinks } from "@/data/social-links";

interface ExperienceTimelineProps {
  onSelectCaseStudy?: (slug: string) => void;
}

export function ExperienceTimeline({ onSelectCaseStudy }: ExperienceTimelineProps) {
  const [isVisible, setIsVisible] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );

    if (listRef.current) {
      observer.observe(listRef.current);
    }

    const handleTrigger = () => {
      setIsVisible(false);
      setTimeout(() => {
        setIsVisible(true);
      }, 200);
    };

    window.addEventListener("trigger-experience-animation", handleTrigger);

    return () => {
      observer.disconnect();
      window.removeEventListener("trigger-experience-animation", handleTrigger);
    };
  }, []);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const experiences = [
    {
      company: "TechPotion.ai",
      role: "Quality Assurance Lead",
      initials: "TP",
      period: "Sep 2026 to Present",
      flag: "🇲🇾",
      flagTitle: "Malaysia",
      description:
        "Lead QA across PharmaConnect SaaS, ToolPotion directory, and AI Academy Cloud.",
      caseStudySlug: "multitenant-saas-qa",
    },
    {
      company: "TechPotion.ai",
      role: "Backend & Automation Engineer",
      initials: "TP",
      period: "Jan 2025 to Sep 2026",
      flag: "🇲🇾",
      flagTitle: "Malaysia",
      description:
        "Autonomous 28K+ record AI pipelines, distributed ETL automation, and AWS cloud optimization.",
      caseStudySlug: "28k-record-pipeline",
    },
    {
      company: "Sadiq.ai",
      role: "QA Intern",
      initials: "SQ",
      period: "Jun 2024 to Aug 2024",
      flag: "🇵🇰",
      flagTitle: "Pakistan",
      description:
        "Automated and manual testing across web and mobile Flutter applications.",
      caseStudySlug: undefined,
    },
  ];

  return (
    <section id="experience" className="scroll-mt-24 pt-10 pb-14 sm:pt-16 sm:pb-20 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Minimal Shahmeer Irfan Header: Title + Quiet Resume Link */}
        <div className="flex items-center justify-between pb-5 sm:pb-6 border-b border-[#E8E1D7] gap-3">
          <h2 className="font-serif text-xl sm:text-4xl text-[#1C1416] font-normal tracking-tight whitespace-nowrap">
            Where I’ve worked
          </h2>
          <a
            href={socialLinks.resume}
            download
            className="inline-flex items-center gap-1.5 sm:gap-2 text-xs font-mono text-[#5C5254] hover:text-[#6B1724] transition-colors py-1 group shrink-0"
          >
            <svg
              className="w-4 h-4 text-[#827577] group-hover:text-[#6B1724] transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="font-medium">Full résumé</span>
          </a>
        </div>

        {/* Flat Minimal Experience List: 3 Clean Rows */}
        <div ref={listRef} className="divide-y divide-[#E8E1D7]">
          {experiences.map((exp, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <article
                key={`${exp.company}-${exp.role}-${index}`}
                style={{
                  transitionDelay: `${index * 130}ms`,
                }}
                className={`py-4 sm:py-7 md:grid md:grid-cols-12 md:gap-8 items-start group hover:bg-white/40 -mx-2.5 sm:-mx-3 px-2.5 sm:px-3 rounded-lg transition-all duration-500 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                }`}
              >
                {/* Mobile Top Header (Tappable on mobile) */}
                <div 
                  onClick={() => toggleExpand(index)}
                  className="md:col-span-4 flex items-center justify-between cursor-pointer md:cursor-default"
                >
                  <div className="flex items-center gap-3 sm:gap-3.5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#FAF0F0] border border-[#F0D5D8] group-hover:border-[#6B1724] flex items-center justify-center shrink-0 shadow-2xs transition-colors">
                      <span className="font-mono text-xs font-semibold text-[#6B1724]">
                        {exp.initials}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-serif text-[15px] sm:text-[17px] font-medium text-[#1C1416] leading-tight group-hover:text-[#6B1724] transition-colors">
                        {exp.company}
                      </h3>
                      <div className="text-[11px] sm:text-xs font-mono text-[#6B1724] mt-0.5 sm:mt-1 font-medium">
                        {exp.role}
                      </div>
                    </div>
                  </div>

                  {/* Mobile-only right side: Flag + Expand arrow */}
                  <div className="flex md:hidden items-center gap-2 text-xs font-mono text-[#827577]">
                    <span title={exp.flagTitle} aria-label={exp.flagTitle} className="text-sm">
                      {exp.flag}
                    </span>
                    <button
                      type="button"
                      aria-label="Toggle details"
                      className="p-1 text-[#827577] hover:text-[#6B1724] transition-colors"
                    >
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? "rotate-180 text-[#6B1724]" : "rotate-0"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Col 2: One-sentence clean description (collapsible on mobile, always visible on desktop) */}
                <div
                  className={`md:col-span-5 text-[13px] sm:text-sm text-[#5C5254] leading-relaxed font-sans transition-all duration-300 ${
                    isExpanded ? "block pt-3 md:pt-0" : "hidden md:block"
                  }`}
                >
                  {/* Mobile dates note when expanded */}
                  <div className="md:hidden text-[10px] font-mono text-[#827577] mb-1.5">
                    {exp.period}
                  </div>
                  <p>{exp.description}</p>
                  {exp.caseStudySlug && onSelectCaseStudy && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCaseStudy(exp.caseStudySlug!);
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-[#6B1724] hover:underline mt-2 font-medium cursor-pointer"
                    >
                      <span>Inspect verified case study</span>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Col 3: Period + Flag (Visible on desktop) */}
                <div className="hidden md:flex md:col-span-3 items-center justify-end gap-2 text-[11px] sm:text-xs font-mono text-[#827577]">
                  <span>{exp.period}</span>
                  <span
                    className="text-sm sm:text-base cursor-default select-none"
                    title={exp.flagTitle}
                    aria-label={exp.flagTitle}
                  >
                    {exp.flag}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
