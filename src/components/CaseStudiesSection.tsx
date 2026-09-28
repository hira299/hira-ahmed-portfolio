interface CaseStudiesSectionProps {
  onSelectCaseStudy: (slug: string) => void;
  onOpenArchive?: () => void;
}

const flagshipProjects = [
  {
    slug: "28k-record-pipeline",
    num: "01",
    client: "TECHPOTION.AI",
    tag: "PRODUCTION SYSTEM",
    image: "/images/28k_records.png",
    title: "28K+ Production AI Enrichment & Content Pipeline",
    description:
      "Production LLM enrichment pipeline processing 28,000+ live records with 4 status-gated stages and 9-language translation.",
  },
  {
    slug: "cloud-compliance",
    num: "02",
    client: "INDEPENDENT BUILD",
    tag: "AI AUDITING ENGINE",
    image: "/images/cloud_compliance.png",
    title: "Autonomous Cloud Compliance & AI Auditing Engine",
    description:
      "Autonomous cloud auditing engine verifying multi-account AWS posture across S3, IAM, and GuardDuty with Corrective RAG.",
  },
  {
    slug: "multitenant-saas-qa",
    num: "03",
    client: "PHARMACONNECT",
    tag: "B2B SAAS QA",
    image: "/images/PharmaConnect.png",
    title: "Multi-Tenant B2B SaaS QA",
    description:
      "Lead QA on multi-tenant pharmaceutical B2B SaaS covering 20 E2E user journeys, 80+ defects, and 11 critical P1 findings.",
  },
];

export function CaseStudiesSection({ onSelectCaseStudy, onOpenArchive }: CaseStudiesSectionProps) {
  return (
    <section id="work" className="pt-12 pb-6 sm:pt-14 sm:pb-8 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#E8E1D7] gap-4">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#6B1724] mb-2 font-medium">
              01 / SELECTED WORK
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#1C1416] font-normal tracking-tight">
              Flagship Projects
            </h2>
          </div>
          {onOpenArchive && (
            <button
              onClick={onOpenArchive}
              className="text-xs font-mono font-medium text-[#6B1724] hover:underline flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <span>View Full Archive (10+ Repos)</span>
              <span aria-hidden="true">&gt;</span>
            </button>
          )}
        </div>

        {/* 1 Row, 3 Columns Grid: Compact Design with Screenshot Previews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {flagshipProjects.map((project) => (
            <div
              key={project.slug}
              onClick={() => onSelectCaseStudy(project.slug)}
              className="group relative flex flex-col justify-between bg-white border border-[#E8E1D7] hover:border-[#6B1724] p-3.5 sm:p-4 rounded-xl transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md hover:-translate-y-0.5"
            >
              {/* Ticket Notch Semicircles (Left & Right) */}
              <span className="ticket-notch-left" aria-hidden="true" />
              <span className="ticket-notch-right" aria-hidden="true" />

              <div>
                {/* Top Bar: Number + Client & Tag */}
                <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#F0EBE1]">
                  <span className="text-[10px] font-mono text-[#827577] uppercase tracking-wider font-medium">
                    {project.num} {project.client}
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono tracking-wider bg-[#FAF0F0] text-[#6B1724] border border-[#F0D5D8] uppercase font-medium">
                    {project.tag}
                  </span>
                </div>

                {/* Compact Screenshot Preview */}
                <div className="mb-3 rounded-lg border border-[#E8E1D7] overflow-hidden bg-[#FAF8F5] h-36 sm:h-40 md:h-42 w-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>

                {/* Title */}
                <h3 className="font-serif text-[15px] sm:text-[17px] text-[#1C1416] group-hover:text-[#6B1724] transition-colors mb-1.5 leading-snug font-normal">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#5C5254] leading-relaxed mb-3">
                  {project.description}
                </p>
              </div>

              {/* Bottom Action */}
              <div className="pt-2.5 border-t border-[#F0EBE1] flex items-center justify-between text-[11px] font-mono text-[#6B1724] font-medium group-hover:translate-x-0.5 transition-transform">
                <span>View Technical Specs</span>
                <span aria-hidden="true">&gt;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
