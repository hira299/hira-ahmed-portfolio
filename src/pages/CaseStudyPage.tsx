import type { ReactNode } from "react";
import { caseStudies, type CaseStudy } from "@/data/case-studies";
import { caseStudyContent } from "@/data/case-study-content";
import { services } from "@/data/services";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  PipelineDiagram,
  SentinelDiagram,
  EmailAgentDiagram,
  MatrixDiagram,
  ComplianceDiagram,
  TekruiterDiagram,
  ToolPotionQaDiagram,
  AiCloudAcademyDiagram,
} from "@/components/diagrams";

function renderInline(text: string): ReactNode {
  const regex = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(regex);
  return parts.map((part, index) => {
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      return (
        <strong key={index} className="font-semibold text-[#1C1416]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 rounded text-xs font-mono bg-[#FAF8F5] border border-[#E8E1D7] text-[#6B1724]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const isExternal = linkMatch[2].startsWith("http");
      return (
        <a
          key={index}
          href={linkMatch[2]}
          className="text-[#6B1724] underline hover:text-[#54111B] transition-colors"
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {linkMatch[1]}
        </a>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

function renderMarkdown(content: string) {
  const cleanContent = content.replace(/<[A-Za-z]+Diagram\s*\/>/g, "");
  const blocks = cleanContent.split("\n\n").filter((b) => b.trim().length > 0);

  return blocks.map((block, bidx) => {
    const trimmed = block.trim();

    if (trimmed.startsWith("## ")) {
      return (
        <h2
          key={bidx}
          className="font-serif text-lg sm:text-2xl text-[#1C1416] pt-4 sm:pt-6 pb-1 font-normal border-b border-[#F0EBE1]"
        >
          {renderInline(trimmed.replace(/^##\s+/, ""))}
        </h2>
      );
    }

    if (trimmed.startsWith("### ")) {
      return (
        <h3
          key={bidx}
          className="font-serif text-base sm:text-xl text-[#1C1416] pt-3 font-normal"
        >
          {renderInline(trimmed.replace(/^###\s+/, ""))}
        </h3>
      );
    }

    if (trimmed.startsWith("**") && trimmed.endsWith("**") && !trimmed.includes("\n")) {
      return (
        <h4
          key={bidx}
          className="font-serif text-sm sm:text-lg text-[#1C1416] pt-2 sm:pt-3 font-semibold"
        >
          {trimmed.slice(2, -2)}
        </h4>
      );
    }

    const lines = trimmed.split("\n");

    const isUnorderedList = lines.every((line) => /^\s*[-*]\s+/.test(line));
    if (isUnorderedList) {
      return (
        <ul key={bidx} className="space-y-1.5 sm:space-y-2 my-2 text-[#5C5254] text-xs sm:text-sm">
          {lines.map((line, lidx) => {
            const isIndented = /^\s{2,}[-*]\s+/.test(line);
            const text = line.replace(/^\s*[-*]\s+/, "");
            return (
              <li
                key={lidx}
                className={`leading-relaxed flex items-start gap-2 ${
                  isIndented ? "ml-4 sm:ml-6 text-[11px] sm:text-xs text-[#6E6365]" : ""
                }`}
              >
                <span className="text-[#6B1724] select-none font-bold mt-1 text-xs">
                  {isIndented ? "◦" : "•"}
                </span>
                <span className="flex-1">{renderInline(text)}</span>
              </li>
            );
          })}
        </ul>
      );
    }

    const isOrderedList = lines.every((line) => /^\s*\d+\.\s+/.test(line));
    if (isOrderedList) {
      return (
        <ol key={bidx} className="space-y-2 my-2 text-[#5C5254] text-xs sm:text-sm">
          {lines.map((line, lidx) => {
            const numMatch = line.match(/^\s*(\d+)\.\s+(.*)$/);
            const num = numMatch ? numMatch[1] : String(lidx + 1);
            const text = numMatch ? numMatch[2] : line;
            return (
              <li key={lidx} className="leading-relaxed flex items-start gap-2">
                <span className="font-mono text-[11px] sm:text-xs text-[#6B1724] font-semibold min-w-[1.25rem] pt-0.5 select-none">
                  {num}.
                </span>
                <span className="flex-1">{renderInline(text)}</span>
              </li>
            );
          })}
        </ol>
      );
    }

    return (
      <p key={bidx} className="leading-relaxed text-xs sm:text-sm text-[#5C5254]">
        {renderInline(trimmed)}
      </p>
    );
  });
}

function renderDiagramForSlug(slug: string) {
  switch (slug) {
    case "28k-record-pipeline":
      return <PipelineDiagram />;
    case "sentinel-mesh":
      return <SentinelDiagram />;
    case "multitenant-saas-qa":
      return <MatrixDiagram />;
    case "tekruiter-qa":
      return <TekruiterDiagram />;
    case "toolpotion-qa":
      return <ToolPotionQaDiagram />;
    case "ai-cloud-academy-qa":
      return <AiCloudAcademyDiagram />;
    case "n8n-email-agent":
      return <EmailAgentDiagram />;
    case "cloud-compliance":
      return <ComplianceDiagram />;
    default:
      return null;
  }
}

interface CaseStudyPageProps {
  study: CaseStudy;
}

export function CaseStudyPage({ study }: CaseStudyPageProps) {
  const rawData = caseStudyContent[study.slug];
  const content = typeof rawData === "string" ? rawData : (rawData?.content || "");
  const diagram = renderDiagramForSlug(study.slug);

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
          <a href="/case-studies/" className="hover:text-[#6B1724] underline underline-offset-2 transition-colors">
            Case Studies
          </a>
          <span>/</span>
          <span className="text-[#1C1416] font-medium truncate max-w-[200px] sm:max-w-none">
            {study.title}
          </span>
        </nav>

        {/* Case Study Meta Strip & Single H1 */}
        <header className="border-b border-[#E8E1D7] pb-8 mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-block px-2.5 py-1 rounded text-[11px] font-mono tracking-wider bg-[#FAF0F0] text-[#6B1724] border border-[#F0D5D8] uppercase font-medium">
              Case Study · {study.kind}
            </span>
            <span className="text-[#827577] text-xs font-mono">Client: {study.client}</span>
            <span className="text-[#D8CEC1]">·</span>
            <span className="text-[#827577] text-xs font-mono">Role: {study.role}</span>
            {study.services && study.services.length > 0 && (
              <>
                <span className="text-[#D8CEC1]">·</span>
                <span className="text-[#827577] text-xs font-mono">
                  Practice Area:{" "}
                  {study.services.map((svcSlug, sidx) => {
                    const svc = services.find((s) => s.slug === svcSlug);
                    const label = svc ? svc.title : svcSlug;
                    const href = svc?.hasPage ? svc.href : "/services/";
                    return (
                      <span key={svcSlug}>
                        {sidx > 0 && ", "}
                        <a
                          href={href}
                          className="text-[#6B1724] underline hover:text-[#54111B] transition-colors"
                        >
                          {label}
                        </a>
                      </span>
                    );
                  })}
                </span>
              </>
            )}
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl text-[#1C1416] font-normal leading-tight mb-4">
            {study.title}
          </h1>
          <p className="text-sm sm:text-base text-[#5C5254] leading-relaxed">
            {study.description}
          </p>
        </header>

        {/* Key Metrics Strip */}
        {study.metrics && study.metrics.length > 0 && (
          <div className="mb-8 p-4 bg-white border border-[#E8E1D7] rounded-xl grid grid-cols-2 sm:grid-cols-3 gap-3">
            {study.metrics.map((m, idx) => (
              <div key={idx} className="p-2 sm:p-3 bg-[#FAF8F5] rounded-lg border border-[#F0EBE1]">
                <div className="font-mono text-lg sm:text-xl font-bold text-[#6B1724] leading-none mb-1">
                  {m.value}
                </div>
                <div className="text-[11px] font-mono text-[#827577] leading-tight">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Interactive / Architecture Diagram */}
        {diagram && (
          <div className="mb-8 p-4 sm:p-6 bg-white border border-[#E8E1D7] rounded-xl overflow-x-auto">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#827577] mb-3">
              System Architecture & Execution Flow
            </div>
            {diagram}
          </div>
        )}

        {/* Full Markdown Body */}
        {content && (
          <article className="space-y-4 mb-12 bg-white border border-[#E8E1D7] rounded-xl p-6 sm:p-8">
            {renderMarkdown(content)}
          </article>
        )}

        {/* Stack & Links */}
        <section className="mb-10 bg-[#FAF8F5] border border-[#E8E1D7] rounded-xl p-6">
          <h2 className="font-mono text-xs uppercase tracking-wider text-[#6B1724] font-semibold mb-3">
            Technologies & Tools Used
          </h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {study.stack.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded text-xs font-mono bg-white border border-[#E8E1D7] text-[#1C1416]"
              >
                {t}
              </span>
            ))}
          </div>

          {study.links && study.links.length > 0 && (
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-[#827577] font-semibold mb-2">
                External References
              </h3>
              <div className="flex flex-wrap gap-3">
                {study.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[#6B1724] underline hover:text-[#54111B]"
                  >
                    {link.label} &rarr;
                  </a>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Navigation back to all case studies */}
        <div className="flex justify-between items-center pt-6 border-t border-[#E8E1D7]">
          <a
            href="/case-studies/"
            className="text-xs font-mono text-[#6B1724] hover:underline"
          >
            &larr; Back to all Case Studies
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
