import { useEffect, useRef, useState } from "react";

interface TrailPoint {
  x: number;
  y: number;
  alpha: number;
  birth: number;
}

export function CustomCursor() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  // High precision position tracking
  const mousePos = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const trailPoints = useRef<TrailPoint[]>([]);
  const animFrameId = useRef<number | null>(null);
  const lastTrailTime = useRef<number>(0);

  useEffect(() => {
    // Only disable if explicitly a coarse-only touch device (phone) without hover
    const isTouchOnly = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouchOnly) {
      setIsEnabled(false);
      return;
    }
    setIsEnabled(true);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Mouse movement listener
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!cursorVisible) setCursorVisible(true);

      // Add trail point spaced by distance and time
      const now = performance.now();
      if (now - lastTrailTime.current > 24) {
        // Only drop a dot if moved enough
        const last = trailPoints.current[trailPoints.current.length - 1];
        const dist = last ? Math.hypot(e.clientX - last.x, e.clientY - last.y) : 100;
        if (dist > 8) {
          trailPoints.current.push({
            x: e.clientX,
            y: e.clientY,
            alpha: 0.75,
            birth: now,
          });
          lastTrailTime.current = now;
        }
      }

      // Check if hovering over a clickable element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = !!target.closest(
          "button, a, input, textarea, select, [role='button'], summary, .cursor-pointer"
        );
        setIsHoveringClickable(isClickable);
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => setCursorVisible(false);
    const handleMouseEnter = () => setCursorVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Render loop for trail canvas and smooth ring position
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = performance.now();

      // Smooth lerp for outer ring
      const ease = 0.35;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      // Draw fading dotted trail
      const points = trailPoints.current;
      for (let i = points.length - 1; i >= 0; i--) {
        const p = points[i];
        const age = now - p.birth;
        const maxLife = 500; // Trail fades over 0.5s

        if (age >= maxLife) {
          points.splice(i, 1);
          continue;
        }

        const progress = age / maxLife;
        const alpha = (1 - progress) * 0.65;
        const radius = Math.max(1, 2.2 * (1 - progress * 0.5));

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(107, 23, 36, ${alpha})`; // Warm maroon trail dot
        ctx.fill();
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <>
      {/* Hide native cursor on desktop fine pointer devices */}
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          body, a, button, [role="button"], input, select, textarea {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Hardware-accelerated canvas for fading dotted trail */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[99998]"
        style={{ opacity: cursorVisible ? 1 : 0 }}
      />

      {/* Hollow Circle Ring Pointer */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          opacity: cursorVisible ? 1 : 0,
        }}
      >
        <div
          className={`rounded-full border transition-all duration-150 ease-out flex items-center justify-center ${
            isMouseDown
              ? "w-4 h-4 border-[#6B1724] border-[2px] bg-[#6B1724]/15 scale-90"
              : isHoveringClickable
              ? "w-8 h-8 border-[#6B1724] border-[1.75px] bg-[#6B1724]/8"
              : "w-6 h-6 border-[#2B171A] border-[1.5px] bg-transparent"
          }`}
        >
          {/* Faint center precision dot */}
          <div
            className={`rounded-full bg-[#6B1724] transition-all duration-150 ${
              isHoveringClickable ? "w-2 h-2 opacity-100" : "w-1 h-1 opacity-50"
            }`}
          />
        </div>
      </div>
    </>
  );
}
