import { useEffect, useRef, useState } from "react";

interface TrailPoint {
  x: number;
  y: number;
  id: number;
  opacity: number;
  size: number;
}

export function CustomCursor() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [trail, setTrail] = useState<TrailPoint[]>([]);

  const cursorRef = useRef<HTMLDivElement | null>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const trailIdRef = useRef(0);
  const lastTrailPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only disable if device does not support hover (mobile phone/tablet)
    const isTouchOnly = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouchOnly) {
      setIsEnabled(false);
      return;
    }
    setIsEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      const currentY = e.clientY;
      mousePos.current = { x: currentX, y: currentY };
      if (!cursorVisible) setCursorVisible(true);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      // Add gentle trail points when moving
      const dist = Math.hypot(currentX - lastTrailPos.current.x, currentY - lastTrailPos.current.y);
      if (dist > 5) {
        lastTrailPos.current = { x: currentX, y: currentY };
        trailIdRef.current += 1;
        setTrail((prev) => [
          ...prev.slice(-15), // Extended trail: 16 points for longer elegant flow
          {
            x: currentX,
            y: currentY,
            id: trailIdRef.current,
            opacity: 0.5,
            size: 4.5,
          },
        ]);
      }

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = !!target.closest(
          "button, a, input, textarea, select, [role='button'], summary, .cursor-pointer"
        );
        setIsHoveringClickable(isClickable);
      }
    };

    // Fade trail points smoothly for a long, lightweight whisper trail
    const trailInterval = setInterval(() => {
      setTrail((prev) =>
        prev
          .map((pt) => ({
            ...pt,
            opacity: pt.opacity * 0.84, // Slower gentle fade creates longer trail
            size: Math.max(1, pt.size * 0.92),
          }))
          .filter((pt) => pt.opacity > 0.04)
      );
    }, 28);

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => {
      setCursorVisible(false);
      setTrail([]);
    };
    const handleMouseEnter = () => setCursorVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      clearInterval(trailInterval);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorVisible]);

  if (!isEnabled) return null;

  return (
    <>
      {/* Hide default OS arrow cursor */}
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          *, *::before, *::after {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Floating Lightweight Trail Particles */}
      {cursorVisible &&
        trail.map((pt) => (
          <div
            key={pt.id}
            className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full will-change-transform"
            style={{
              transform: `translate3d(${pt.x}px, ${pt.y}px, 0) translate(-50%, -50%)`,
              width: `${pt.size}px`,
              height: `${pt.size}px`,
              backgroundColor: "#6B1724",
              opacity: pt.opacity,
              boxShadow: "0 0 5px rgba(107, 23, 36, 0.35)",
              transition: "opacity 0.08s ease-out, transform 0.08s ease-out",
            }}
          />
        ))}

      {/* Sleek Stick-less Maroon Pointer Arrow */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999] will-change-transform"
        style={{
          opacity: cursorVisible ? 1 : 0,
          transform: `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`,
        }}
      >
        <div
          className={`transition-transform duration-100 ease-out ${
            isMouseDown ? "scale-90" : isHoveringClickable ? "scale-110" : "scale-100"
          }`}
          style={{
            // Hotspot tip aligns with top-left origin
            transformOrigin: "0 0",
          }}
        >
          {isHoveringClickable ? (
            /* Hover state: Elegant small open pointer chevron with diamond accent */
            <svg
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              className="drop-shadow-[0_2px_5px_rgba(107,23,36,0.35)]"
            >
              {/* Outer soft glow border */}
              <polygon
                points="1,1 21.5,9 11.5,11.5 9,21.5"
                fill="#6B1724"
                stroke="#FAF8F5"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              <polygon
                points="3.2,3.2 17,9 11,11 9,17"
                fill="#8C2535"
              />
              {/* Tiny jewel center dot */}
              <circle cx="9.2" cy="9.2" r="1.3" fill="#FAF8F5" />
            </svg>
          ) : (
            /* Default stick-less chevron arrowhead - scaled up very slightly for ideal visibility */
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              className="drop-shadow-[0_2px_4px_rgba(107,23,36,0.3)]"
            >
              {/* Sleek stick-less triangular arrowhead */}
              <polygon
                points="1,1 20,8 11,11 8,20"
                fill="#6B1724"
                stroke="#FAF8F5"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              {/* Inner chic gradient fill */}
              <polygon
                points="2.8,2.8 15.8,7.8 10,10 7.8,15.8"
                fill="#801C2B"
              />
            </svg>
          )}
        </div>
      </div>
    </>
  );
}
