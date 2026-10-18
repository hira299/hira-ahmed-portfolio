import { caseStudies, type CaseStudy, caseStudyKindLabels } from "@/data/case-studies";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function CaseStudiesHubPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1416] antialiased selection:bg-[#6B1724] selection:text-[#FAF8F5]">
      <Navbar />

      <main id="main" className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="font-mono text-xs text-[#827577] mb-6 flex items-center gap-2">
          <a href="/" className="hover:text-[#6B1724] underline underline-offset-2 transition-colors">
            Home
          </a>
          <span>/</span>
          <span className="text-[#1C1416] font-medium">Case Studies</span>
        </nav>

        {/* Header Block with single H1 */}
        <header className="border-b border-[#E8E1D7] pb-8 mb-10">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#6B1724] mb-2 font-medium">
            Engineering Archive & QA Governance
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1416] font-normal leading-tight mb-4">
            Technical Case Studies &amp; Engineering Proof
          </h1>
          <p className="text-base sm:text-lg text-[#5C5254] leading-relaxed max-w-3xl">
            Detailed breakdowns of 28,000+ record AI processing pipelines, multi-tenant B2B SaaS QA audits, automated security compliance agents, and cloud infrastructure optimizations.
          </p>
        </header>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {caseStudies.map((study: CaseStudy) => (
            <a
              key={study.slug}
              href={`/case-studies/${study.slug}/`}
              className="group p-6 bg-white plate-frame rounded-xl transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-1 flex flex-col justify-between relative"
            >
              <span className="ticket-notch-sm-left" aria-hidden="true" />
              <span className="ticket-notch-sm-right" aria-hidden="true" />
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F0EBE1]">
                  <span className="text-[10px] font-mono text-[#827577] uppercase tracking-wider font-medium">
                    {study.client} · {study.role}
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#FAF0F0] text-[#6B1724] border border-[#F0D5D8] uppercase">
                    {study.kind}
                  </span>
                </div>

                <h2 className="font-serif text-lg sm:text-xl text-[#1C1416] group-hover:text-[#6B1724] transition-colors mb-2 font-normal leading-snug">
                  {study.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#5C5254] leading-relaxed mb-4">
                  {study.description}
                </p>

                {study.metrics && study.metrics.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mb-4 p-2.5 bg-[#FAF8F5] rounded-lg border border-[#F0EBE1]">
                    {study.metrics.slice(0, 2).map((m, mi) => (
                      <div key={mi}>
                        <div className="font-mono text-xs font-bold text-[#6B1724]">{m.value}</div>
                        <div className="text-[10px] font-mono text-[#827577] leading-tight truncate">{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#F0EBE1] flex items-center justify-between text-xs font-mono text-[#6B1724] font-medium group-hover:translate-x-0.5 transition-transform">
                <span>View Full Technical Case Study</span>
                <span>&rarr;</span>
              </div>
            </a>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
