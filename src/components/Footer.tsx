import { profile } from "@/data/profile";
import { email, socialLinks } from "@/data/social-links";

interface FooterProps {
  onOpenHireModal: () => void;
}

export function Footer({ onOpenHireModal }: FooterProps) {
  return (
    <footer className="pt-10 pb-20 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top Engagement Banner */}
        <div className="bg-white border border-[#E8E1D7] rounded p-8 sm:p-12 mb-16 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#6B1724] font-semibold">
                Available for Q2/Q3 Engagements
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1416] mt-2 mb-3">
                Need resilient AI pipelines or high-assurance SaaS QA?
              </h2>
              <p className="text-sm sm:text-base text-[#5C5254] max-w-xl leading-relaxed">
                Whether you're scaling an automated n8n workflow, deploying multi-step LLM extraction, or requiring comprehensive multi-tenant QA for your B2B SaaS.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                onClick={onOpenHireModal}
                className="w-full py-3 px-5 text-sm font-medium tracking-wide bg-[#6B1724] hover:bg-[#54111B] text-[#FAF8F5] rounded-full transition-all duration-200 text-center shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer"
              >
                Start an Engagement
              </button>
              <a
                href={`mailto:${email}`}
                className="w-full py-3 px-5 text-sm font-mono text-center text-[#1C1416] bg-[#FAF8F5] hover:bg-white border border-[#E8E1D7] hover:border-[#6B1724]/70 rounded-full transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 shadow-2xs hover:shadow-xs cursor-pointer"
              >
                {email}
              </a>
            </div>
          </div>
        </div>

        {/* Footer Divider Line & Links Colophon Grid */}
        <div className="border-t border-[#E8E1D7] pt-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pb-12 border-b border-[#E8E1D7]">
          {/* Identity */}
          <div className="space-y-3">
            <div className="font-serif text-xl font-normal text-[#1C1416]">
              {profile.name}
            </div>
            <p className="text-xs text-[#5C5254] leading-relaxed">
              AI Engineer & Enterprise Systems QA specializing in production automation, formal methods, and SaaS reliability.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#827577] mb-3">
              Index
            </div>
            <ul className="space-y-2 text-xs font-mono text-[#5C5254]">
              <li><a href="#work" className="hover:text-[#6B1724]">01 / Selected Work</a></li>
              <li><a href="#architecture" className="hover:text-[#6B1724]">02 / System Architecture</a></li>
              <li><a href="#services" className="hover:text-[#6B1724]">03 / Services</a></li>
              <li><a href="#archive" className="hover:text-[#6B1724]">04 / Project Archive</a></li>
              <li><a href="#research" className="hover:text-[#6B1724]">05 / Research Artifacts</a></li>
              <li><a href="#experience" className="hover:text-[#6B1724]">06 / Experience</a></li>
            </ul>
          </div>

          {/* Verified Profiles */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#827577] mb-3">
              Direct Verification
            </div>
            <ul className="space-y-2 text-xs font-mono text-[#5C5254]">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#6B1724] inline-flex items-center gap-1.5"
                  >
                    <span>{link.label}</span>
                    <svg className="w-3 h-3 text-[#827577]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#827577] gap-4">
          <div>
            © {new Date().getFullYear()} {profile.name}. All verified systems &amp; architectures documented.
          </div>
          <div className="text-center sm:text-right">
            Designed with editorial rigor · No tracking or telemetry
          </div>
        </div>
      </div>
    </footer>
  );
}
