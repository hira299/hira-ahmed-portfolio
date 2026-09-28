import { useEffect, type ReactNode } from "react";
import { caseStudies, type CaseStudy } from "@/data/case-studies";
import { caseStudyContent } from "@/data/case-study-content";
import {
  PipelineDiagram,
  SentinelDiagram,
  EmailAgentDiagram,
  MatrixDiagram,
  ComplianceDiagram,
} from "./diagrams";

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

    // H2 header
    if (trimmed.startsWith("## ")) {
      return (
        <h2
          key={bidx}
          className="font-serif text-lg sm:text-2xl text-[#1C1416] pt-3 sm:pt-4 font-normal"
        >
          {renderInline(trimmed.replace(/^##\s+/, ""))}
        </h2>
      );
    }

    // H3 header
    if (trimmed.startsWith("### ")) {
      return (
        <h3
          key={bidx}
          className="font-serif text-base sm:text-xl text-[#1C1416] pt-2 font-normal"
        >
          {renderInline(trimmed.replace(/^###\s+/, ""))}
        </h3>
      );
    }

    // Standalone bold subtitle like **First version: automated AWS audit**
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

    // Check if this block is an unordered list
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

    // Check if this block is an ordered list
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

    // Regular paragraph
    return (
      <p key={bidx} className="leading-relaxed text-xs sm:text-sm">
        {renderInline(trimmed)}
      </p>
    );
  });
}

interface CaseStudyModalProps {
  slug: string | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export function CaseStudyModal({ slug, onClose, onOpenContact }: CaseStudyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (slug) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [slug, onClose]);

  if (!slug) return null;

  const normalizedSlug = slug.replace(/^\/case-studies\//, "").replace(/\/$/, "");
  const study = caseStudies.find((s: CaseStudy) => s.slug === normalizedSlug || s.slug === slug);
  const mdxData = normalizedSlug ? (caseStudyContent[normalizedSlug] || caseStudyContent[slug]) : caseStudyContent[slug];

  if (!study) return null;

  const renderEmbeddedDiagram = () => {
    switch (normalizedSlug) {
      case "28k-record-pipeline":
        return <PipelineDiagram />;
      case "sentinel-mesh":
        return <SentinelDiagram />;
      case "multitenant-saas-qa":
        return <MatrixDiagram />;
      case "n8n-email-agent":
        return <EmailAgentDiagram />;
      case "cloud-compliance":
        return <ComplianceDiagram />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#1C1416]/40 backdrop-blur-sm animate-fade-in">
      {/* Backdrop click area */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-white border border-[#E8E1D7] rounded shadow-xl overflow-hidden my-auto z-10 max-h-[92vh] flex flex-col">
        {/* Modal Top Header */}
        <div className="sticky top-0 bg-[#FAF8F5] border-b border-[#E8E1D7] px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="font-mono text-[11px] sm:text-xs text-[#6B1724] font-semibold uppercase">
              Case Study / {study.kind}
            </span>
            <span className="text-[#D8CEC1]">·</span>
            <span className="text-[11px] sm:text-xs font-mono text-[#827577]">{study.client}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] sm:text-xs font-mono bg-white border border-[#E8E1D7] hover:border-[#6B1724] hover:text-[#6B1724] rounded text-[#5C5254] transition-colors"
            >
              ESC / Close
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto px-4 sm:px-10 py-5 sm:py-8 space-y-5 sm:space-y-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {/* Main Title Header */}
          <div>
            <h1 className="font-serif text-lg sm:text-3xl text-[#1C1416] font-normal leading-snug sm:leading-tight mb-2 sm:mb-4">
              {study.title}
            </h1>
            <p className="text-xs sm:text-base text-[#5C5254] leading-relaxed">
              {study.description}
            </p>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 p-3 sm:p-5 bg-[#FAF8F5] border border-[#E8E1D7] rounded">
            {study.metrics.map((metric: { value: string; label: string }, idx: number) => (
              <div key={idx}>
                <div className="text-[8.5px] sm:text-[10px] font-mono text-[#827577] uppercase tracking-wider mb-0.5 sm:mb-1">
                  {metric.label}
                </div>
                <div className="font-serif text-base sm:text-2xl text-[#6B1724] font-medium">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>

          {/* Embedded Architecture Diagram */}
          <div className="pt-1 sm:pt-2">
            <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[#827577] mb-2 sm:mb-3">
              Verified System Schematic
            </div>
            <div className="bg-[#FAF8F5] border border-[#E8E1D7] rounded p-2.5 sm:p-4 overflow-x-auto">
              {renderEmbeddedDiagram()}
            </div>
          </div>

          {/* Technology Stack Badges */}
          <div>
            <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[#827577] mb-2 sm:mb-3">
              Technologies &amp; Infrastructure
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {study.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-mono bg-[#FAF8F5] text-[#1C1416] border border-[#E8E1D7] rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Technical Resources & Repositories */}
          {study.links && study.links.length > 0 && (
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#827577] mb-3">
                Technical Resources &amp; Repositories
              </div>
              <div className="flex flex-wrap gap-2.5">
                {study.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono text-[#6B1724] bg-[#FAF8F5] border border-[#E8E1D7] hover:border-[#6B1724] hover:bg-white transition-colors"
                  >
                    <span>{link.label}</span>
                    <span className="text-[#827577]">↗</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* In-Depth Technical Body */}
          {mdxData?.content && (
            <div className="pt-4 sm:pt-6 border-t border-[#E8E1D7] space-y-4 sm:space-y-6 text-[#5C5254] leading-relaxed text-xs sm:text-base">
              <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[#6B1724] font-semibold">
                Technical Specifications &amp; Architecture
              </div>
              <div className="prose prose-neutral max-w-none text-[#5C5254] font-normal space-y-3 sm:space-y-4">
                {renderMarkdown(mdxData.content)}
              </div>
            </div>
          )}

          {/* Bottom Engagement CTA */}
          <div className="pt-5 sm:pt-8 border-t border-[#E8E1D7] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="text-xs text-[#827577]">
              Interested in implementing a similar architecture for your company?
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-mono bg-[#6B1724] hover:bg-[#54111B] text-[#FAF8F5] rounded transition-colors font-medium text-center"
            >
              Discuss This Architecture →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
