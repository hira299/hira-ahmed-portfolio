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
  const experiences = [
    {
      company: "TechPotion.ai",
      role: "Quality Assurance Lead",
      initials: "TP",
      period: "Sep 2026 to Present",
      flag: "🇲🇾",
      flagTitle: "Malaysia",
      description:
        "Lead QA across 3 production products: PharmaConnect (80+ defects, 20 user journeys, 11 critical P1s), ToolPotion directory, and AI Academy Cloud.",
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
        "Status-gated 28K+ record AI enrichment pipeline, 50-worker parallel ETL (5.6x speedup), and 34% monthly AWS infrastructure cost reduction.",
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
        "Manual and automated testing across web and mobile platforms; logged 150+ bugs and built Flutter test automation suites.",
      caseStudySlug: undefined,
    },
  ];

  return (
    <section id="experience" className="scroll-mt-24 pt-12 pb-16 sm:pt-16 sm:pb-20 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Minimal Shahmeer Irfan Header: Title + Quiet Resume Link */}
        <div className="flex items-center justify-between pb-6 border-b border-[#E8E1D7]">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1416] font-normal tracking-tight">
            Where I’ve worked
          </h2>
          <a
            href={socialLinks.resume}
            download
            className="inline-flex items-center gap-2 text-xs font-mono text-[#5C5254] hover:text-[#6B1724] transition-colors py-1 group"
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

        {/* Flat Minimal Experience List: 3 Clean Rows with Staggered Soft Slide & Fade */}
        <div ref={listRef} className="divide-y divide-[#E8E1D7]">
          {experiences.map((exp, index) => (
            <article
              key={`${exp.company}-${exp.role}-${index}`}
              style={{
                transitionDelay: `${index * 130}ms`,
              }}
              className={`py-7 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start group hover:bg-white/40 -mx-3 px-3 rounded-lg transition-all duration-500 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              {/* Col 1: Company Logo Mark + Name + Role */}
              <div className="md:col-span-4 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#FAF0F0] border border-[#F0D5D8] group-hover:border-[#6B1724] flex items-center justify-center shrink-0 shadow-2xs transition-colors">
                  <span className="font-mono text-xs font-semibold text-[#6B1724]">
                    {exp.initials}
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-[17px] font-medium text-[#1C1416] leading-tight group-hover:text-[#6B1724] transition-colors">
                    {exp.company}
                  </h3>
                  <div className="text-xs font-mono text-[#6B1724] mt-1 font-medium">
                    {exp.role}
                  </div>
                </div>
              </div>

              {/* Col 2: One-sentence clean description */}
              <div className="md:col-span-5 text-sm text-[#5C5254] leading-relaxed font-sans">
                <p>{exp.description}</p>
                {exp.caseStudySlug && onSelectCaseStudy && (
                  <button
                    onClick={() => onSelectCaseStudy(exp.caseStudySlug!)}
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-[#6B1724] hover:underline mt-2 font-medium cursor-pointer"
                  >
                    <span>Inspect verified case study</span>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Col 3: Period + Flag (Aligned to the right on desktop) */}
              <div className="md:col-span-3 flex items-center justify-start md:justify-end gap-2 text-xs font-mono text-[#827577]">
                <span>{exp.period}</span>
                <span
                  className="text-base cursor-default select-none"
                  title={exp.flagTitle}
                  aria-label={exp.flagTitle}
                >
                  {exp.flag}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
