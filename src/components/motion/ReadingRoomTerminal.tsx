import { useState, useEffect, useRef, useId } from "react";
import { services, type Service } from "@/data/services";

const targetSlugs = [
  "ai-automation",
  "n8n-automation",
  "ai-agents",
  "qa-testing",
  "api-testing",
  "multitenant-qa",
];

const standaloneServices: Service[] = targetSlugs
  .map((slug) => services.find((s) => s.slug === slug))
  .filter((s): s is Service => Boolean(s));

export function ReadingRoomTerminal() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [typedChars, setTypedChars] = useState<number>(Infinity);
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const terminalHeadingId = useId();

  const activeService = standaloneServices[selectedIndex] || standaloneServices[0];
  const fullText = `${activeService.description}`;

  const handleSelectService = (index: number) => {
    setSelectedIndex(index);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTypedChars(Infinity);
      setIsTyping(false);
      return;
    }
    setTypedChars(0);
    setIsTyping(true);
  };

  useEffect(() => {
    if (!isTyping) return;
    if (typedChars < fullText.length) {
      timeoutRef.current = setTimeout(() => {
        setTypedChars((prev) => prev + 2);
      }, 16);
    } else {
      setIsTyping(false);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [typedChars, isTyping, fullText.length]);

  const displayedText = isTyping ? fullText.slice(0, typedChars) : fullText;

  return (
    <section className="py-12 sm:py-16 bg-[#FAF8F5]" aria-labelledby={terminalHeadingId}>
      <div className="max-w-5xl mx-auto px-6">
        {/* Leather Ledger Panel: #54111B panel, double cream hairline border, corner stars, hanging bookmark */}
        <div className="relative bg-[#54111B] text-[#FAF8F5] rounded-[4px] p-6 sm:p-10 shadow-lg border-[1.4px] border-[#FAF8F5]/80 overflow-hidden">
          {/* Inner hairline frame (0.5px) */}
          <div className="absolute inset-2 sm:inset-3 border-[0.5px] border-[#FAF8F5]/30 rounded-[2px] pointer-events-none" aria-hidden="true" />

          {/* Hanging Maroon Ribbon Bookmark with V-notch */}
          <div className="absolute top-0 right-8 sm:right-12 w-7 sm:w-8 h-14 sm:h-16 bg-[#6B1724] border-x border-[#FAF8F5]/40 shadow-md z-20 pointer-events-none" aria-hidden="true">
            {/* V-notch bottom */}
            <div
              className="absolute bottom-0 inset-x-0 h-3 bg-[#54111B]"
              style={{ clipPath: "polygon(0 100%, 50% 0, 100% 100%)" }}
            />
          </div>

          {/* Four-point corner star ornaments in cream */}
          <svg className="absolute top-3.5 left-3.5 w-3 h-3 text-[#FAF8F5]/70 pointer-events-none" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5Z"/></svg>
          <svg className="absolute top-3.5 right-3.5 w-3 h-3 text-[#FAF8F5]/70 pointer-events-none" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5Z"/></svg>
          <svg className="absolute bottom-3.5 left-3.5 w-3 h-3 text-[#FAF8F5]/70 pointer-events-none" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5Z"/></svg>
          <svg className="absolute bottom-3.5 right-3.5 w-3 h-3 text-[#FAF8F5]/70 pointer-events-none" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5Z"/></svg>

          {/* Header Bar: Selected service title in serif italic */}
          <div className="relative z-10 flex flex-wrap items-center justify-between pb-4 sm:pb-6 border-b border-[#FAF8F5]/20 gap-3">
            <div>
              <span id={terminalHeadingId} className="font-serif italic text-lg sm:text-2xl text-[#FAF8F5] font-normal">
                {activeService.title}
              </span>
            </div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#FAF8F5]/70">
              0{selectedIndex + 1} / 0{standaloneServices.length}
            </div>
          </div>

          {/* Six Service Buttons (Real <button>s using existing service.title) */}
          <div className="relative z-10 flex flex-wrap gap-2 pt-4 pb-6">
            {standaloneServices.map((svc, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={svc.slug}
                  type="button"
                  onClick={() => handleSelectService(idx)}
                  className={`px-3 py-1.5 rounded-[3px] text-xs font-mono transition-colors border cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FAF8F5] ${
                    isSelected
                      ? "bg-[#FAF8F5] text-[#54111B] border-[#FAF8F5] font-semibold"
                      : "bg-[#54111B] text-[#FAF8F5]/80 border-[#FAF8F5]/25 hover:border-[#FAF8F5]/60 hover:text-[#FAF8F5]"
                  }`}
                >
                  {svc.title}
                </button>
              );
            })}
          </div>

          {/* Ledger Output Body (Typewriter text with prompt and cursor block) */}
          <div
            className="relative z-10 font-mono text-xs sm:text-sm text-[#FAF8F5]/90 space-y-4 pt-2 min-h-[140px]"
            aria-live="polite"
          >
            {/* Terminal prompt symbol + typed description */}
            <div className="flex items-start gap-2">
              <span className="text-[#FAF8F5]/50 select-none">&gt;</span>
              <p className="flex-1 leading-relaxed">
                {displayedText}
                {isTyping && (
                  <span className="inline-block w-2 h-4 bg-[#FAF8F5] ml-1 animate-pulse align-middle" aria-hidden="true" />
                )}
              </p>
            </div>

            {/* Stamped Proof Line with cream wax-seal check */}
            {activeService.proof && activeService.proof[0] && (
              <div className="flex items-start gap-3 p-3 bg-[#1C1416]/40 border border-[#FAF8F5]/20 rounded-[3px]">
                <div className="w-5 h-5 rounded-full border border-[#FAF8F5] flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-[#FAF8F5]" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M13.5 3.5L6.5 10.5L3 7L2 8L6.5 12.5L14.5 4.5Z" />
                  </svg>
                </div>
                <div className="flex-1 text-xs leading-relaxed text-[#FAF8F5]">
                  <span>{activeService.proof[0]}</span>
                </div>
              </div>
            )}

            {/* Direct service page link */}
            <div className="pt-2">
              <a
                href={activeService.href}
                className="inline-flex items-center gap-1.5 text-xs text-[#FAF8F5] underline hover:text-[#FAF8F5]/80"
              >
                <span>{activeService.title}</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>

          {/* Wax Seal at the bottom corner */}
          <div className="absolute bottom-4 right-4 z-10 pointer-events-none" aria-hidden="true">
            <svg className="w-8 h-8 text-[#FAF8F5]/30 wax-seal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <circle cx="12" cy="12" r="9" strokeDasharray="2 1.5" />
              <circle cx="12" cy="12" r="6.5" fill="currentColor" fillOpacity="0.15" />
              <path d="M12 8.5v7M8.5 12h7" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
