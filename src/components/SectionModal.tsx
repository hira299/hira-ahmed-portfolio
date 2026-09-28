import { useEffect } from "react";
import { ServicesSection } from "./ServicesSection";
import { ResearchSection } from "./ResearchSection";
import { ProjectExplorer } from "./ProjectExplorer";

interface SectionModalProps {
  section: "services" | "research" | "archive" | null;
  onClose: () => void;
  onOpenHireModal: (serviceTitle?: string) => void;
  onSelectCaseStudy: (slug: string) => void;
}

export function SectionModal({
  section,
  onClose,
  onOpenHireModal,
  onSelectCaseStudy,
}: SectionModalProps) {
  useEffect(() => {
    if (section) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [section]);

  if (!section) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl max-h-[92vh] sm:max-h-[90vh] bg-[#FAF8F5] border border-[#E8E1D7] rounded-xl shadow-2xl overflow-y-auto flex flex-col [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Sticky Modal Top Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E1D7]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#6B1724]" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#6B1724] font-medium">
              {section === "services" && "Practice Areas & Engagements"}
              {section === "research" && "Formal Methods & Preprint Publications"}
              {section === "archive" && "Complete Technical Repositories (10+)"}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#5C5254] hover:text-[#1C1416] hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-1 sm:p-6">
          {section === "services" && (
            <ServicesSection
              onOpenHireModal={(title) => {
                onClose();
                onOpenHireModal(title);
              }}
            />
          )}

          {section === "research" && (
            <ResearchSection
              onSelectCaseStudy={(slug) => {
                onClose();
                onSelectCaseStudy(slug);
              }}
            />
          )}

          {section === "archive" && (
            <ProjectExplorer
              onSelectCaseStudy={(slug) => {
                onClose();
                onSelectCaseStudy(slug);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
