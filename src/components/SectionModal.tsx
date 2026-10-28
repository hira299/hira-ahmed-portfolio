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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (section) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [section, onClose]);

  if (!section) return null;

  const isService = section === "services";

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isService ? "p-2 sm:p-6" : "p-3 sm:p-6 py-4 sm:py-6"
      } bg-black/60 backdrop-blur-sm animate-in fade-in duration-200`}
    >
      <div
        className={`relative w-full max-w-5xl ${
          isService
            ? "max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
            : "max-h-[85dvh] max-h-[85vh] sm:max-h-[90vh] overflow-hidden"
        } bg-[#FAF8F5] border border-[#E8E1D7] rounded-xl shadow-2xl flex flex-col [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden`}
        role="dialog"
        aria-modal="true"
      >
        {/* Sticky Modal Top Bar */}
        <div className="shrink-0 sticky top-0 z-20 flex items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-4 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E1D7]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#6B1724]" />
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#6B1724] font-medium">
              {section === "services" && "Practice Areas & Engagements"}
              {section === "research" && "Formal Methods & Preprint Publications"}
              {section === "archive" && "Complete Technical Repositories (10+)"}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#5C5254] hover:text-[#1C1416] hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div
          className={`${
            isService ? "" : "flex-1 overflow-y-auto"
          } p-3 sm:p-6 pb-4 sm:pb-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden`}
        >
          {section === "services" && (
            <ServicesSection
              inModal={true}
              onOpenHireModal={(title) => {
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
