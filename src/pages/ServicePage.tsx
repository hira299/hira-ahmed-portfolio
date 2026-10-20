import type { ReactNode } from "react";
import { services, type Service } from "@/data/services";
import { caseStudies } from "@/data/case-studies";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface ServicePageProps {
  service: Service;
}

export function ServicePage({ service }: ServicePageProps) {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1416] antialiased selection:bg-[#6B1724] selection:text-[#FAF8F5]">
      <Navbar />

      <main id="main" className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="font-mono text-xs text-[#827577] mb-6 flex items-center gap-2 flex-wrap">
          <a href="/" className="hover:text-[#6B1724] underline underline-offset-2 transition-colors">
            Home
          </a>
          <span>/</span>
          <a href="/services/" className="hover:text-[#6B1724] underline underline-offset-2 transition-colors">
            Services
          </a>
          <span>/</span>
          <span className="text-[#1C1416] font-medium">{service.title}</span>
        </nav>

        {/* Header Block with single H1 */}
        <header className="border-b border-[#E8E1D7] pb-8 mb-10">
          <div className="inline-block px-2.5 py-1 rounded text-[11px] font-mono tracking-wider bg-[#FAF0F0] text-[#6B1724] border border-[#F0D5D8] uppercase font-medium mb-3">
            Service · {service.title}
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1416] font-normal leading-tight mb-4">
            {service.h1Title || service.title}
          </h1>
          <p className="text-base sm:text-lg text-[#5C5254] leading-relaxed max-w-3xl">
            {service.description}
          </p>
        </header>

        {/* Overview Summary */}
        <section className="mb-10 bg-white plate-frame rounded-xl p-6 sm:p-8 shadow-xs">
          <h2 className="font-mono text-xs uppercase tracking-wider text-[#6B1724] font-semibold mb-3">
            Core Scope & Focus
          </h2>
          <p className="text-sm sm:text-base text-[#1C1416] leading-relaxed">
            {service.summary}
          </p>
        </section>

        {/* Problems Solved (Folded into <details> per Rule 1) */}
        <details className="mb-8 border border-[#E8E1D7] rounded-xl bg-white p-5 sm:p-6 group/folio shadow-xs">
          <summary className="font-serif text-xl sm:text-2xl text-[#1C1416] font-normal cursor-pointer list-none flex items-center justify-between select-none">
            <h2 className="inline font-serif text-xl sm:text-2xl text-[#1C1416] font-normal">
              Common Production Challenges Solved
            </h2>
            <svg
              className="w-4 h-4 text-[#827577] transition-transform duration-200 group-open/folio:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="pt-4">
            <ul className="space-y-3">
              {service.problems.map((problem, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 bg-[#FAF8F5] border border-[#E8E1D7] p-4 rounded-lg text-xs sm:text-sm text-[#1C1416] leading-relaxed"
                >
                  <span className="text-[#6B1724] font-mono font-bold mt-0.5">0{i + 1}.</span>
                  <span>{problem}</span>
                </li>
              ))}
            </ul>
          </div>
        </details>

        {/* Technologies & Tooling (Open Chip Card) */}
        <section className="mb-10 bg-[#FAF8F5] border border-[#E8E1D7] rounded-xl p-6">
          <h2 className="font-mono text-xs uppercase tracking-wider text-[#6B1724] font-semibold mb-3">
            Technology Stack & Tooling
          </h2>
          <div className="flex flex-wrap gap-2">
            {service.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded text-xs font-mono bg-white border border-[#E8E1D7] text-[#1C1416]"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Production Proof Points */}
        <section className="mb-10">
          <h2 className="font-serif text-xl sm:text-2xl text-[#1C1416] font-normal mb-4">
            Documented Production Proof
          </h2>
          <ul className="space-y-2.5">
            {service.proof.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-[#5C5254] leading-relaxed"
              >
                <span className="text-[#6B1724] font-bold">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Related Case Studies */}
        {service.caseStudies && service.caseStudies.length > 0 && (
          <section className="mb-10 border-t border-[#E8E1D7] pt-8">
            <h2 className="font-serif text-xl sm:text-2xl text-[#1C1416] font-normal mb-4">
              Related Case Studies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.caseStudies.map((csSlug) => {
                const cs = caseStudies.find((c) => c.slug === csSlug);
                const title = cs ? cs.title : csSlug;
                return (
                  <a
                    key={csSlug}
                    href={`/case-studies/${csSlug}/`}
                    className="group relative block p-4 bg-white plate-frame rounded-lg transition-all duration-200 text-xs font-mono text-[#6B1724] hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none"
                  >
                    <span className="ticket-notch-sm-left" aria-hidden="true" />
                    <span className="ticket-notch-sm-right" aria-hidden="true" />
                    <span className="text-[#827577] text-[10px] block mb-1">Detailed Technical Spec</span>
                    <span className="font-medium text-[#1C1416] text-sm block mb-1 font-serif">
                      {title}
                    </span>
                    <span className="text-[11px] text-[#6B1724]">Read full breakdown &rarr;</span>
                  </a>
                );
              })}
            </div>
          </section>
        )}

        {/* Author Bio Card */}
        <section className="mb-10 bg-white plate-frame rounded-xl p-6 sm:p-8 relative shadow-xs">
          <span className="ticket-notch-sm-left" aria-hidden="true" />
          <span className="ticket-notch-sm-right" aria-hidden="true" />
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#6B1724] font-semibold mb-2">
            About the Author
          </div>
          <h2 className="font-serif text-lg sm:text-xl text-[#1C1416] font-normal mb-2">
            Hira Ahmed
          </h2>
          <p className="text-xs sm:text-sm text-[#5C5254] leading-relaxed mb-4">
            Hira Ahmed is an AI Engineer and Systems QA Lead who has documented 1,500+ defects across four concurrent client contracts, built production LLM pipelines processing 28,000+ records, and authored the Sentinel-Mesh preprint on formally verified cloud remediation.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-3 border-t border-[#F0EBE1] text-xs font-mono">
            <a
              href="https://github.com/hira299"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6B1724] underline hover:text-[#54111B]"
            >
              GitHub &rarr;
            </a>
            <a
              href="https://www.linkedin.com/in/hira-ahmed-4068402a7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6B1724] underline hover:text-[#54111B]"
            >
              LinkedIn &rarr;
            </a>
            <a
              href="https://www.researchgate.net/profile/Hira-Ahmed-28"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6B1724] underline hover:text-[#54111B]"
            >
              ResearchGate &rarr;
            </a>
            <a
              href="https://doi.org/10.21203/rs.3.rs-10674271/v1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6B1724] underline hover:text-[#54111B]"
            >
              Preprint DOI &rarr;
            </a>
            <a
              href="https://topmate.io/hira_ahmed"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6B1724] underline hover:text-[#54111B]"
            >
              Topmate &rarr;
            </a>
            <a
              href="https://medium.com/@hira299"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6B1724] underline hover:text-[#54111B]"
            >
              Medium &rarr;
            </a>
          </div>
        </section>

        {/* Navigation back to all services */}
        <div className="flex justify-between items-center pt-6 border-t border-[#E8E1D7]">
          <a
            href="/services/"
            className="text-xs font-mono text-[#6B1724] hover:underline"
          >
            &larr; Back to all Services
          </a>
          <a
            href="/"
            className="text-xs font-mono text-[#827577] hover:text-[#1C1416]"
          >
            Return to Homepage
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
