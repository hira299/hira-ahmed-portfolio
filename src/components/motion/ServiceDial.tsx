import { useState, useId } from "react";
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

// Coordinates for 6 nodes arranged in an ellipse / circle (radius = 120, cx = 160, cy = 160)
// Angles: -90, -30, 30, 90, 150, 210 degrees
const nodePositions = [
  { x: 160, y: 35 },   // 01: Top (-90°)
  { x: 268, y: 98 },   // 02: Top-right (-30°)
  { x: 268, y: 222 },  // 03: Bottom-right (30°)
  { x: 160, y: 285 },  // 04: Bottom (90°)
  { x: 52, y: 222 },   // 05: Bottom-left (150°)
  { x: 52, y: 98 },    // 06: Top-left (210°)
];

export function ServiceDial() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const headingId = useId();

  const activeService = standaloneServices[selectedIndex] || standaloneServices[0];

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = (index + 1) % standaloneServices.length;
      setSelectedIndex(next);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (index - 1 + standaloneServices.length) % standaloneServices.length;
      setSelectedIndex(prev);
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FAF8F5] border-t border-[#E8E1D7]" aria-labelledby={headingId}>
      <div className="max-w-5xl mx-auto px-6">
        {/* Astrolabe Dial Container (Plate Frame with corner stars) */}
        <div className="relative p-6 sm:p-10 bg-white plate-frame rounded-[4px] shadow-xs">
          {/* Four-point corner star ornaments */}
          <svg className="absolute top-2.5 left-2.5 w-3 h-3 text-[#6B1724]" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5Z"/></svg>
          <svg className="absolute top-2.5 right-2.5 w-3 h-3 text-[#6B1724]" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5Z"/></svg>
          <svg className="absolute bottom-2.5 left-2.5 w-3 h-3 text-[#6B1724]" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5Z"/></svg>
          <svg className="absolute bottom-2.5 right-2.5 w-3 h-3 text-[#6B1724]" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5Z"/></svg>

          {/* Desktop/Tablet Astrolabe Dial View */}
          <div className="hidden sm:flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            {/* Left Astrolabe Dial Mechanism */}
            <div className="relative w-[320px] h-[320px] shrink-0">
              {/* Outer Tick Ring & Orbit Ellipse SVG (aria-hidden) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 320 320" fill="none" aria-hidden="true">
                {/* Outer double tick circles */}
                <circle cx="160" cy="160" r="150" stroke="#6B1724" strokeWidth="1.2" />
                <circle cx="160" cy="160" r="144" stroke="#F0D5D8" strokeWidth="0.6" />

                {/* 72 perimeter dial ticks */}
                {Array.from({ length: 72 }).map((_, i) => (
                  <line
                    key={i}
                    x1="160"
                    y1={i % 6 === 0 ? "138" : "144"}
                    x2="160"
                    y2="150"
                    stroke={i % 6 === 0 ? "#6B1724" : "#D8CEC1"}
                    strokeWidth={i % 6 === 0 ? "1.2" : "0.6"}
                    transform={`rotate(${i * 5} 160 160)`}
                  />
                ))}

                {/* Orbit ellipse circle */}
                <circle cx="160" cy="160" r="125" stroke="#F0D5D8" strokeWidth="0.8" strokeDasharray="3 4" />

                {/* Center double-line disc backdrop */}
                <circle cx="160" cy="160" r="68" fill="#FAF8F5" stroke="#6B1724" strokeWidth="1.2" />
                <circle cx="160" cy="160" r="63" stroke="#F0EAE1" strokeWidth="0.6" />
              </svg>

              {/* Center Card Content: Server-rendered for node 0, updated on selection */}
              <div className="absolute inset-0 flex items-center justify-center p-6 text-center pointer-events-none">
                <div className="max-w-[110px]">
                  <span className="font-serif italic text-sm md:text-base text-[#1C1416] font-normal leading-tight block">
                    {activeService.title}
                  </span>
                </div>
              </div>

              {/* Six Interactive Double-Ring Numbered Nodes (Real Links) */}
              {standaloneServices.map((svc, i) => {
                const pos = nodePositions[i];
                const isSelected = i === selectedIndex;
                const num = `0${i + 1}`;

                return (
                  <a
                    key={svc.slug}
                    href={svc.href}
                    onClick={(e) => {
                      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                      e.preventDefault();
                      setSelectedIndex(i);
                    }}
                    onFocus={() => setSelectedIndex(i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    aria-label={`Select ${svc.title}`}
                    aria-current={isSelected ? "true" : undefined}
                    className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B1724] focus-visible:ring-offset-2 cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95"
                    style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-semibold transition-colors duration-200 border ${
                        isSelected
                          ? "bg-[#6B1724] text-[#FAF8F5] border-[#54111B] shadow-sm"
                          : "bg-white text-[#1C1416] border-[#E8E1D7] hover:border-[#6B1724] hover:text-[#6B1724]"
                      }`}
                    >
                      {/* Double ring inset */}
                      <span className="relative">
                        {num}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Right Information Plate */}
            <div className="flex-1 max-w-md space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-[#F0EBE1]">
                <span className="font-mono text-xs text-[#6B1724] font-semibold">
                  0{selectedIndex + 1}
                </span>
                <span className="text-[#D8CEC1]">/</span>
                <span className="font-mono text-xs text-[#827577]">
                  0{standaloneServices.length}
                </span>
              </div>

              <div id={headingId} className="font-serif italic text-xl sm:text-2xl text-[#1C1416]">
                {activeService.title}
              </div>

              <p className="text-xs sm:text-sm text-[#5C5254] leading-relaxed">
                {activeService.description}
              </p>

              <div className="pt-2">
                <a
                  href={activeService.href}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#6B1724] hover:underline font-medium"
                >
                  <span>{activeService.title}</span>
                  <span>&rarr;</span>
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Fallback: Vertical List of the 6 Real Service Links */}
          <div className="sm:hidden space-y-2">
            <div className="font-serif italic text-lg text-[#1C1416] pb-2 border-b border-[#E8E1D7]">
              {activeService.title}
            </div>
            <div className="space-y-1.5 pt-2 font-mono text-xs">
              {standaloneServices.map((svc, i) => (
                <a
                  key={svc.slug}
                  href={svc.href}
                  className="flex items-center justify-between p-2.5 rounded bg-[#FAF8F5] border border-[#E8E1D7] text-[#1C1416] hover:text-[#6B1724] hover:border-[#6B1724] transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-[#6B1724] font-semibold">0{i + 1}</span>
                    <span>{svc.title}</span>
                  </div>
                  <span className="text-[#827577]">&rarr;</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
