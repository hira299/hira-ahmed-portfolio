import { useState, useEffect } from "react";
import { profile } from "@/data/profile";

interface NavbarProps {
  onOpenHireModal: () => void;
  onOpenSectionModal?: (section: "services" | "research" | "archive") => void;
}

export function Navbar({ onOpenHireModal, onOpenSectionModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleExperienceClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const elem = document.getElementById("experience");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", "#experience");
      window.dispatchEvent(new CustomEvent("trigger-experience-animation"));
    }
  };

  return (
    <div className="fixed top-0 sm:top-8 inset-x-0 z-50 flex justify-center px-0 sm:px-4 pointer-events-none">
      <header className="pointer-events-auto flex items-center justify-between w-full sm:max-w-3xl px-6 py-3.5 sm:px-5 sm:py-3 rounded-none sm:rounded-full bg-[#FAF8F5]/90 sm:bg-[#FAF8F5]/50 backdrop-blur-md border-b sm:border border-[#E8E1D7]/70 shadow-none sm:shadow-[0_4px_24px_rgba(28,20,22,0.05)] transition-all sm:hover:bg-[#FAF8F5]/70">
        {/* Brand identity */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="hidden sm:flex w-5 h-5 rounded-full bg-[#6B1724] text-[#FAF8F5] items-center justify-center font-serif text-[11px] font-semibold">
            H
          </span>
          <span className="font-serif text-base sm:text-sm font-medium text-[#1C1416] tracking-tight group-hover:text-[#6B1724] transition-colors">
            {profile.name}
          </span>
        </a>

        {/* Centered Desktop Nav Pill Links */}
        <nav className="hidden md:flex items-center gap-5 text-xs font-mono text-[#5C5254]">
          <a
            href="#work"
            className="hover:text-[#6B1724] transition-colors py-1"
          >
            Work
          </a>
          <button
            onClick={() => onOpenSectionModal?.("services")}
            className="hover:text-[#6B1724] transition-colors py-1 cursor-pointer"
          >
            Services
          </button>
          <a
            href="#experience"
            onClick={handleExperienceClick}
            className="hover:text-[#6B1724] transition-colors py-1 cursor-pointer"
          >
            Experience
          </a>
          <button
            onClick={() => onOpenSectionModal?.("research")}
            className="hover:text-[#6B1724] transition-colors py-1 cursor-pointer"
          >
            Research
          </button>
          <button
            onClick={() => onOpenSectionModal?.("archive")}
            className="hover:text-[#6B1724] transition-colors py-1 cursor-pointer"
          >
            Archive
          </button>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-2">
          <div className="relative group/avail hidden sm:inline-block">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#FAF0F0]/80 border border-[#F0D5D8]/80 text-[10px] font-mono text-[#6B1724] cursor-help transition-colors hover:bg-[#FAF0F0]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6B1724] animate-pulse" />
              <span>Available</span>
            </div>

            {/* Hover Tooltip: Available Hours */}
            <div className="absolute right-0 top-full mt-2 w-64 p-3 bg-[#FAF8F5]/95 backdrop-blur-md rounded-xl border border-[#E8E1D7] shadow-xl text-left opacity-0 pointer-events-none group-hover/avail:opacity-100 group-hover/avail:pointer-events-auto transition-all duration-200 z-50">
              <div className="text-[11px] font-mono font-medium text-[#1C1416] flex items-center justify-between pb-1.5 border-b border-[#E8E1D7]">
                <span>Available Hours</span>
                <span className="text-[9px] uppercase tracking-wider text-[#6B1724] font-semibold">Open</span>
              </div>
              <div className="mt-2 space-y-1.5 text-xs text-[#5C5254]">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-mono text-[#827577]">Schedule:</span>
                  <span className="font-medium text-[#1C1416]">Mon – Fri</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-mono text-[#827577]">Hours:</span>
                  <span className="font-medium text-[#1C1416]">9:00 AM – 6:00 PM EST</span>
                </div>
                <div className="text-[10px] font-mono text-[#6B1724] pt-1.5 border-t border-[#E8E1D7]/70 leading-snug">
                  US Eastern &amp; Pacific overlap · Remote
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={onOpenHireModal}
            className="hidden md:inline-flex px-3.5 py-1 text-xs font-mono font-medium tracking-wide bg-[#6B1724] hover:bg-[#54111B] text-[#FAF8F5] rounded-full transition-all shadow-xs cursor-pointer active:scale-95"
          >
            Inquire
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-1 text-[#1C1416] hover:bg-black/5 rounded transition-colors cursor-pointer"
            aria-label="Open navigation menu"
          >
            <svg className="w-5 h-5 text-[#1C1416]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Side Slide-Over Navigation Drawer */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-[#1C1416]/40 backdrop-blur-xs z-50 transition-opacity duration-300 md:hidden pointer-events-auto ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-out Drawer Panel */}
      <div
        className={`fixed inset-y-0 right-0 w-[290px] max-w-[85vw] bg-[#FAF8F5] border-l border-[#E8E1D7] shadow-2xl z-50 flex flex-col p-6 pointer-events-auto transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E1D7]">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#6B1724] text-[#FAF8F5] flex items-center justify-center font-serif text-xs font-semibold">
              H
            </span>
            <span className="font-serif text-sm font-medium text-[#1C1416]">
              {profile.name}
            </span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1.5 rounded-full text-[#5C5254] hover:text-[#6B1724] hover:bg-[#FAF0F0] transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <nav className="flex-1 py-6 space-y-1 font-mono text-xs">
          <a
            href="#work"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-3 py-2.5 rounded-lg text-[#1C1416] hover:bg-[#FAF0F0] hover:text-[#6B1724] transition-colors"
          >
            <span>Selected Work</span>
            <span className="text-[10px] text-[#827577]">01</span>
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSectionModal?.("services");
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[#1C1416] hover:bg-[#FAF0F0] hover:text-[#6B1724] transition-colors text-left cursor-pointer"
          >
            <span>Services &amp; Practice Areas</span>
            <span className="text-[10px] text-[#827577]">02</span>
          </button>
          <a
            href="#experience"
            onClick={handleExperienceClick}
            className="flex items-center justify-between px-3 py-2.5 rounded-lg text-[#1C1416] hover:bg-[#FAF0F0] hover:text-[#6B1724] transition-colors cursor-pointer"
          >
            <span>Experience Timeline</span>
            <span className="text-[10px] text-[#827577]">03</span>
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSectionModal?.("research");
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[#1C1416] hover:bg-[#FAF0F0] hover:text-[#6B1724] transition-colors text-left cursor-pointer"
          >
            <span>Research &amp; Verification</span>
            <span className="text-[10px] text-[#827577]">04</span>
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSectionModal?.("archive");
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[#1C1416] hover:bg-[#FAF0F0] hover:text-[#6B1724] transition-colors text-left cursor-pointer"
          >
            <span>Full Project Archive</span>
            <span className="text-[10px] text-[#827577]">10+</span>
          </button>
        </nav>

        {/* Drawer Footer */}
        <div className="pt-4 border-t border-[#E8E1D7] space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-mono text-[#827577]">Status</span>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#FAF0F0] border border-[#F0D5D8] text-[10px] font-mono text-[#6B1724]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6B1724] animate-pulse" />
              <span>Available for Hire</span>
            </div>
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenHireModal();
            }}
            className="w-full py-2.5 px-4 text-xs font-mono font-medium tracking-wide bg-[#6B1724] hover:bg-[#54111B] text-[#FAF8F5] rounded-full transition-all shadow-xs cursor-pointer active:scale-98 text-center"
          >
            Inquire / Start Engagement
          </button>
        </div>
      </div>
    </div>
  );
}
