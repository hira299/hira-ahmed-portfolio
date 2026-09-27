import { useState, useEffect } from "react";
import { profile } from "@/data/profile";
import { email, socialLinks } from "@/data/social-links";

interface HireModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export function HireModal({ isOpen, onClose, defaultService }: HireModalProps) {
  const [selectedService, setSelectedService] = useState(defaultService || "AI Tool Pipelines & Automation");
  const [timeline, setTimeline] = useState("Immediate (< 2 weeks)");
  const [projectBrief, setProjectBrief] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (defaultService) {
      setSelectedService(defaultService);
    }
  }, [defaultService]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project Inquiry: ${selectedService}`);
    const body = encodeURIComponent(
      `Hi Hira,\n\nI would like to discuss an engineering project:\n- Service: ${selectedService}\n- Desired Timeline: ${timeline}\n\nProject Details:\n${projectBrief || "We are looking to implement..."}\n\nBest regards,`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#1C1416]/40 backdrop-blur-sm animate-fade-in">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-white border border-[#E8E1D7] rounded shadow-xl overflow-hidden my-auto z-10 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#FAF8F5] border-b border-[#E8E1D7] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#6B1724] font-semibold uppercase">
              Start an Engagement
            </span>
            <span className="text-[#D8CEC1]">·</span>
            <span className="text-xs font-mono text-[#827577]">Direct &amp; Escrow</span>
          </div>

          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-mono bg-white border border-[#E8E1D7] hover:border-[#6B1724] hover:text-[#6B1724] rounded text-[#5C5254] transition-colors"
          >
            ESC / Close
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div>
            <h2 className="font-serif text-2xl text-[#1C1416] mb-2 font-normal">
              Work directly with {profile.name}
            </h2>
            <p className="text-xs text-[#5C5254] leading-relaxed">
              Available for contract roles, workflow automation architecture, and enterprise QA engagements.
            </p>
          </div>

          {/* Quick Direct Copy Bar */}
          <div className="flex items-center justify-between p-3.5 bg-[#FAF8F5] border border-[#E8E1D7] rounded">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-[#827577] uppercase">Direct Email</span>
              <span className="font-mono text-xs text-[#1C1416] font-medium">{email}</span>
            </div>
            <button
              onClick={handleCopyEmail}
              className="px-3 py-1.5 text-xs font-mono bg-white border border-[#E8E1D7] hover:border-[#6B1724] text-[#6B1724] rounded transition-colors"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSendEmail} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#827577] mb-1.5">
                Area of Interest
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-white border border-[#E8E1D7] focus:border-[#6B1724] rounded px-3 py-2 text-xs text-[#1C1416] outline-none"
              >
                <option>AI Tool Pipelines &amp; Automation</option>
                <option>n8n Complex Workflow Engineering</option>
                <option>AI Agents &amp; RAG Architecture</option>
                <option>B2B SaaS QA &amp; Regression Testing</option>
                <option>API Testing &amp; Postman / Newman Suites</option>
                <option>Multi-Tenant Security &amp; RBAC Validation</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#827577] mb-1.5">
                Desired Timeline
              </label>
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full bg-white border border-[#E8E1D7] focus:border-[#6B1724] rounded px-3 py-2 text-xs text-[#1C1416] outline-none"
              >
                <option>Immediate (&lt; 2 weeks)</option>
                <option>Within 1 Month</option>
                <option>Q2 / Q3 Exploration</option>
                <option>Advisory / Code Audit</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#827577] mb-1.5">
                Brief Scope / Objective
              </label>
              <textarea
                rows={3}
                value={projectBrief}
                onChange={(e) => setProjectBrief(e.target.value)}
                placeholder="Describe your current system bottleneck or testing goals..."
                className="w-full bg-white border border-[#E8E1D7] focus:border-[#6B1724] rounded p-3 text-xs text-[#1C1416] placeholder-[#827577] outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 text-xs font-mono font-medium tracking-wide bg-[#6B1724] hover:bg-[#54111B] text-[#FAF8F5] rounded transition-all text-center"
            >
              Compose Formatted Email →
            </button>
          </form>

          {/* Escrow & Platform Badges */}
          <div className="pt-4 border-t border-[#E8E1D7]">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#827577] mb-3 text-center">
              Or hire via protected escrow &amp; booking platforms:
            </div>
            <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
              {socialLinks
                .filter((s) => ["Upwork", "Fiverr", "Topmate (1:1 Call)", "LinkedIn"].includes(s.label))
                .map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-[#FAF8F5] border border-[#E8E1D7] hover:border-[#6B1724] hover:text-[#6B1724] rounded text-[#5C5254] transition-colors"
                  >
                    {link.label} ↗
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
