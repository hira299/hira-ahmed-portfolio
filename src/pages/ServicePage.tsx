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
            Practice Area · {service.title}
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1416] font-normal leading-tight mb-4">
            {service.h1Title || service.title}
          </h1>
          <p className="text-base sm:text-lg text-[#5C5254] leading-relaxed max-w-3xl">
            {service.description}
          </p>
        </header>

        {/* Overview Summary */}
        <section className="mb-10 bg-white border border-[#E8E1D7] rounded-xl p-6 sm:p-8 shadow-xs">
          <h2 className="font-mono text-xs uppercase tracking-wider text-[#6B1724] font-semibold mb-3">
            Core Scope & Focus
          </h2>
          <p className="text-sm sm:text-base text-[#1C1416] leading-relaxed">
            {service.summary}
          </p>
        </section>

        {/* Problems Solved */}
        <section className="mb-10">
          <h2 className="font-serif text-xl sm:text-2xl text-[#1C1416] font-normal mb-4">
            Common Production Challenges Solved
          </h2>
          <ul className="space-y-3">
            {service.problems.map((problem, i) => (
              <li
                key={i}
                className="flex items-start gap-3 bg-white border border-[#E8E1D7] p-4 rounded-lg text-xs sm:text-sm text-[#1C1416] leading-relaxed"
              >
                <span className="text-[#6B1724] font-mono font-bold mt-0.5">0{i + 1}.</span>
                <span>{problem}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Technologies & Tooling */}
        <section className="mb-10">
          <h2 className="font-serif text-xl sm:text-2xl text-[#1C1416] font-normal mb-4">
            Technology Stack & Tooling
          </h2>
          <div className="flex flex-wrap gap-2">
            {service.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded text-xs font-mono bg-white border border-[#E8E1D7] text-[#1C1416]"
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
          <section className="mb-12 border-t border-[#E8E1D7] pt-8">
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
                    className="block p-4 bg-white border border-[#E8E1D7] hover:border-[#6B1724] rounded-lg transition-all text-xs font-mono text-[#6B1724] hover:-translate-y-0.5"
                  >
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

        {/* Call to action */}
        <section className="bg-[#FAF0F0] border border-[#F0D5D8] rounded-xl p-6 sm:p-8 text-center">
          <h2 className="font-serif text-xl sm:text-2xl text-[#1C1416] font-normal mb-2">
            Interested in discussing {service.title}?
          </h2>
          <p className="text-xs sm:text-sm text-[#5C5254] mb-4 max-w-lg mx-auto">
            Available for technical consultations, hands-on pipeline engineering, or comprehensive QA audits.
          </p>
          <a
            href="mailto:hira229922@gmail.com"
            className="inline-block px-5 py-2.5 rounded-lg bg-[#6B1724] text-[#FAF8F5] text-xs font-mono font-medium hover:bg-[#54111B] transition-colors"
          >
            Schedule a Technical Call
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
