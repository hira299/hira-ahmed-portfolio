import { useEffect } from "react";

export function usePaperSettle() {
  useEffect(() => {
    // Under prefers-reduced-motion, do not apply reveals
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Select elements with data-paper-settle below the fold
    const elements = document.querySelectorAll<HTMLElement>("[data-paper-settle]");
    if (!elements.length) return;

    // Post-hydration: add unrevealed state via JS class
    elements.forEach((el) => {
      el.classList.add("paper-settle-init");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.classList.add("paper-settled");
            target.classList.remove("paper-settle-init");
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
