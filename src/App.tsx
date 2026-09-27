import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { CaseStudiesSection } from "./components/CaseStudiesSection";
import { ExperienceTimeline } from "./components/ExperienceTimeline";
import { Footer } from "./components/Footer";
import { CaseStudyModal } from "./components/CaseStudyModal";
import { HireModal } from "./components/HireModal";
import { SectionModal } from "./components/SectionModal";
import { CustomCursor } from "./components/CustomCursor";

export default function App() {
  const [activeCaseStudySlug, setActiveCaseStudySlug] = useState<string | null>(null);
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [selectedServiceForHire, setSelectedServiceForHire] = useState<string | undefined>(undefined);
  const [activeSectionModal, setActiveSectionModal] = useState<"services" | "research" | "archive" | null>(null);

  const handleOpenHireModal = (serviceTitle?: string) => {
    setSelectedServiceForHire(serviceTitle);
    setIsHireModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1416] antialiased selection:bg-[#6B1724] selection:text-[#FAF8F5]">
      {/* Precision Hollow Ring Pointer & Fading Dotted Trail (Desktop Only) */}
      <CustomCursor />

      {/* Translucent Floating Pill Navigation Header */}
      <Navbar
        onOpenHireModal={() => handleOpenHireModal()}
        onOpenSectionModal={(section) => setActiveSectionModal(section)}
      />

      <main id="main">
        {/* Minimal Hero: Editorial Name, Bio, Start Engagement, Airy Businesses List & Hoverable Numbers */}
        <Hero
          onOpenHireModal={() => handleOpenHireModal()}
          onSelectCaseStudy={(slug) => setActiveCaseStudySlug(slug)}
        />

        {/* Selected Works: 1 Row, 3 Columns (3 Cards) */}
        <CaseStudiesSection
          onSelectCaseStudy={(slug) => setActiveCaseStudySlug(slug)}
          onOpenArchive={() => setActiveSectionModal("archive")}
        />

        {/* Compact Production Experience Timeline */}
        <ExperienceTimeline
          onSelectCaseStudy={(slug) => setActiveCaseStudySlug(slug)}
        />
      </main>

      {/* Minimalist Colophon & Contact Footer */}
      <Footer onOpenHireModal={() => handleOpenHireModal()} />

      {/* Locked Interactive Case Study Reader Modal */}
      <CaseStudyModal
        slug={activeCaseStudySlug}
        onClose={() => setActiveCaseStudySlug(null)}
        onOpenContact={() => handleOpenHireModal()}
      />

      {/* Locked Direct Hire / Inquiry Modal */}
      <HireModal
        isOpen={isHireModalOpen}
        onClose={() => setIsHireModalOpen(false)}
        defaultService={selectedServiceForHire}
      />

      {/* Dedicated Section Reader Modal (Services, Research, Archive) */}
      <SectionModal
        section={activeSectionModal}
        onClose={() => setActiveSectionModal(null)}
        onOpenHireModal={(service) => handleOpenHireModal(service)}
        onSelectCaseStudy={(slug) => setActiveCaseStudySlug(slug)}
      />
    </div>
  );
}
