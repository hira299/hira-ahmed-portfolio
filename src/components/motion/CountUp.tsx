import { useEffect, useState, useRef } from "react";

interface CountUpProps {
  value: string;
  className?: string;
}

export function CountUp({ value, className }: CountUpProps) {
  // Always initialize with final string so SSR / pre-render and first paint contain the exact final text
  const [displayValue, setDisplayValue] = useState<string>(value);
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // If reduced motion is preferred, keep final value
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Parse numeric core and prefix/suffix
    const match = value.match(/^([^0-9.]*)([0-9.,]+)(.*)$/);
    if (!match) return;

    const prefix = match[1];
    const rawNumberStr = match[2];
    const suffix = match[3];

    // Determine if comma format is used
    const hasCommas = rawNumberStr.includes(",");
    const numericTarget = parseFloat(rawNumberStr.replace(/,/g, ""));
    if (isNaN(numericTarget)) return;

    const isDecimal = rawNumberStr.includes(".");
    const decimalPlaces = isDecimal ? (rawNumberStr.split(".")[1] || "").length : 0;

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            observer.disconnect();

            const duration = 1200; // ms
            const startTime = performance.now();

            const formatVal = (current: number) => {
              let numStr = current.toFixed(decimalPlaces);
              if (hasCommas) {
                const parts = numStr.split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                numStr = parts.join(".");
              }
              return `${prefix}${numStr}${suffix}`;
            };

            const step = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(1, elapsed / duration);
              // Ease-out cubic: 1 - pow(1 - progress, 3)
              const ease = 1 - Math.pow(1 - progress, 3);
              const currentNum = numericTarget * ease;

              if (progress < 1) {
                setDisplayValue(formatVal(currentNum));
                requestAnimationFrame(step);
              } else {
                setDisplayValue(value); // strictly guarantee final exact string
              }
            };

            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={containerRef} className={className}>
      {displayValue}
    </span>
  );
}
