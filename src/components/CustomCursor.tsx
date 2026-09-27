import { useEffect, useRef, useState } from "react";

/**
 * Clean 8-bit Pixel Cursor Grid.
 * Standard Windows/Mac classic 16x16 pixel pointer grid.
 * 0 = transparent
 * 1 = outer pixel border (#4A0E18 deep maroon)
 * 2 = inner pixel fill (#FCECEF light warm cream/blush)
 * 3 = pixel highlight (#FFFFFF pure crisp white)
 */
// Classic pixel pointer arrow (12 x 19 grid)
// Each row represents pixels from x=0 to x=11
const ARROW_GRID: number[][] = [
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 3, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0],
  [1, 3, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0],
  [1, 3, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0],
  [1, 3, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0],
  [1, 3, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0],
  [1, 3, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0],
  [1, 3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
  [1, 3, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1],
  [1, 3, 2, 1, 2, 2, 1, 0, 0, 0, 0, 0],
  [1, 2, 1, 0, 1, 2, 2, 1, 0, 0, 0, 0],
  [1, 1, 0, 0, 1, 2, 2, 1, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 1, 2, 2, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 2, 2, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
];

// Classic pixel pointer hand (15 x 18 grid)
const HAND_GRID: number[][] = [
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 3, 2, 1, 0, 1, 1, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 3, 2, 1, 1, 2, 2, 1, 0, 1, 1, 0],
  [1, 2, 2, 1, 3, 2, 1, 2, 2, 2, 1, 1, 2, 2, 1],
  [1, 3, 2, 1, 3, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1],
  [1, 3, 2, 2, 3, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
  [0, 1, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
  [0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0],
  [0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
];

const PIXEL_SCALE = 2; // 2px per pixel unit = perfectly sharp, natural 24x36px size

function renderPixelGrid(grid: number[][], palette: Record<number, string>) {
  return grid.flatMap((row, y) =>
    row.map((val, x) => {
      if (!val || !palette[val]) return null;
      return (
        <rect
          key={`${x}-${y}`}
          x={x * PIXEL_SCALE}
          y={y * PIXEL_SCALE}
          width={PIXEL_SCALE}
          height={PIXEL_SCALE}
          fill={palette[val]}
        />
      );
    })
  );
}

export function CustomCursor() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);

  const cursorRef = useRef<HTMLDivElement | null>(null);
  const mousePos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only disable if device does not support hover (mobile phone/tablet)
    const isTouchOnly = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouchOnly) {
      setIsEnabled(false);
      return;
    }
    setIsEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!cursorVisible) setCursorVisible(true);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

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

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorVisible]);

  if (!isEnabled) return null;

  // Exact theme palette:
  // 1: Crisp Dark Maroon Pixel Border (#4A0E18)
  // 2: Clean Rose/Blush body fill (#F9CCD3)
  // 3: Crisp highlight border inner edge (#FFFFFF)
  const palette: Record<number, string> = {
    1: "#4A0E18", // Dark pixel border
    2: "#F6C1C8", // Warm blush/rose body fill matching reference image
    3: "#FFF5F6", // Clean inner edge highlight
  };

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

      {/* Crisp 8-Bit Pixel Pointer */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999] will-change-transform"
        style={{
          opacity: cursorVisible ? 1 : 0,
          transform: `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`,
        }}
      >
        <div
          className={`transition-transform duration-75 ${
            isMouseDown ? "scale-90" : "scale-100"
          }`}
          style={{
            // Hotspot alignment: top-left tip is directly on mouse point
            transform: isHoveringClickable ? "translate(-8px, -2px)" : "translate(0px, 0px)",
          }}
        >
          {isHoveringClickable ? (
            /* Pixel Pointer Hand */
            <svg
              width={15 * PIXEL_SCALE}
              height={17 * PIXEL_SCALE}
              viewBox={`0 0 ${15 * PIXEL_SCALE} ${17 * PIXEL_SCALE}`}
              shapeRendering="crispEdges"
              className="filter drop-shadow-[0_2px_4px_rgba(74,14,24,0.15)]"
            >
              {renderPixelGrid(HAND_GRID, palette)}
            </svg>
          ) : (
            /* Pixel Pointer Arrow */
            <svg
              width={12 * PIXEL_SCALE}
              height={18 * PIXEL_SCALE}
              viewBox={`0 0 ${12 * PIXEL_SCALE} ${18 * PIXEL_SCALE}`}
              shapeRendering="crispEdges"
              className="filter drop-shadow-[0_2px_4px_rgba(74,14,24,0.15)]"
            >
              {renderPixelGrid(ARROW_GRID, palette)}
            </svg>
          )}
        </div>
      </div>
    </>
  );
}
