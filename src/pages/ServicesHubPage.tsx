import { services, type Service } from "@/data/services";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function ServicesHubPage() {
  const pagesList = services.filter((s) => s.hasPage);

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
          <span className="text-[#1C1416] font-medium">Services</span>
        </nav>

        {/* Hub Header with single H1 */}
        <header className="border-b border-[#E8E1D7] pb-8 mb-10">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#6B1724] mb-2 font-medium">
            Engineering Services & Capabilities
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1416] font-normal leading-tight mb-4">
            AI Engineering &amp; QA Services
          </h1>
          <p className="text-base sm:text-lg text-[#5C5254] leading-relaxed max-w-3xl">
            Production-grade engineering across autonomous AI pipelines, resilient n8n automation, deterministic API integrations, and multi-tenant B2B SaaS QA governance.
          </p>
        </header>

        {/* Services Grid linking to child pages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {pagesList.map((svc: Service, idx: number) => (
            <a
              key={svc.slug}
              href={svc.href}
              className="group p-6 bg-white plate-frame rounded-xl transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-1 flex flex-col justify-between relative"
            >
              <span className="ticket-notch-sm-left" aria-hidden="true" />
              <span className="ticket-notch-sm-right" aria-hidden="true" />
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F0EBE1]">
                  <span className="text-[10px] font-mono text-[#827577] uppercase tracking-wider font-medium">
                    0{idx + 1} · {svc.slug}
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#FAF0F0] text-[#6B1724] border border-[#F0D5D8] uppercase">
                    Service
                  </span>
                </div>
                <h2 className="font-serif text-xl sm:text-2xl text-[#1C1416] group-hover:text-[#6B1724] transition-colors mb-2 font-normal">
                  {svc.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#5C5254] leading-relaxed mb-4">
                  {svc.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {svc.technologies.slice(0, 5).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#FAF8F5] border border-[#E8E1D7] text-[#5C5254]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#F0EBE1] flex items-center justify-between text-xs font-mono text-[#6B1724] font-medium group-hover:translate-x-0.5 transition-transform">
                <span>View Service Details</span>
                <span>&rarr;</span>
              </div>
            </a>
          ))}
        </div>

        {/* Ways to work with me */}
        <div className="mb-10">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#6B1724] mb-3 font-medium">
            Ways to work with me
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <a
              href="/ai-automation/"
              className="group p-4 bg-white plate-frame rounded-lg transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 block relative"
            >
              <span className="ticket-notch-sm-left" aria-hidden="true" />
              <span className="ticket-notch-sm-right" aria-hidden="true" />
              <p className="text-xs sm:text-sm text-[#1C1416] mb-2 font-serif leading-snug">
                You want less repetitive work.
              </p>
              <span className="text-[11px] font-mono text-[#6B1724] font-medium group-hover:underline">
                Workflow &amp; AI Automation &rarr;
              </span>
            </a>

            <a
              href="/ai-agents/"
              className="group p-4 bg-white plate-frame rounded-lg transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 block relative"
            >
              <span className="ticket-notch-sm-left" aria-hidden="true" />
              <span className="ticket-notch-sm-right" aria-hidden="true" />
              <p className="text-xs sm:text-sm text-[#1C1416] mb-2 font-serif leading-snug">
                You have a product and want AI added to it.
              </p>
              <span className="text-[11px] font-mono text-[#6B1724] font-medium group-hover:underline">
                AI Agents &amp; Assistants &rarr;
              </span>
            </a>

            <a
              href="/qa-testing/"
              className="group p-4 bg-white plate-frame rounded-lg transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 block relative"
            >
              <span className="ticket-notch-sm-left" aria-hidden="true" />
              <span className="ticket-notch-sm-right" aria-hidden="true" />
              <p className="text-xs sm:text-sm text-[#1C1416] mb-2 font-serif leading-snug">
                You are launching soon and want it tested.
              </p>
              <span className="text-[11px] font-mono text-[#6B1724] font-medium group-hover:underline">
                Software Testing &amp; QA &rarr;
              </span>
            </a>

            <a
              href="mailto:hira229922@gmail.com?subject=Monthly%20support"
              className="group p-4 bg-white plate-frame rounded-lg transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 block relative"
            >
              <span className="ticket-notch-sm-left" aria-hidden="true" />
              <span className="ticket-notch-sm-right" aria-hidden="true" />
              <p className="text-xs sm:text-sm text-[#1C1416] mb-2 font-serif leading-snug">
                You have launched and want it kept running and tested.
              </p>
              <span className="text-[11px] font-mono text-[#6B1724] font-medium group-hover:underline">
                Ask about monthly support &rarr;
              </span>
            </a>
          </div>
        </div>

        {/* Also Available Plain Line */}
        <div className="py-4 px-5 bg-white border border-[#E8E1D7] rounded-xl text-xs sm:text-sm font-mono text-[#5C5254] leading-relaxed">
          Also available: Backend &amp; Cloud (AWS) · Product builds · Website with SEO setup · RAG and knowledge-graph RAG · Local LLM hosting · Small-scale fine-tuning · Docker and CI/CD · Monthly support
        </div>
      </main>

      <Footer />
    </div>
  );
}
