import type { ReactNode } from "react";

export type Tone = "default" | "ai" | "data" | "warn" | "muted" | "ok";

type FrameProps = {
  id: string;
  title: string;
  description: string;
  width: number;
  height: number;
  caption: ReactNode;
  children: ReactNode;
};

export function DiagramFrame({ id, title, description, width, height, caption, children }: FrameProps) {
  return (
    <figure className="diagram">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-labelledby={`${id}-title ${id}-desc`}
        className="diagram-svg"
      >
        <title id={`${id}-title`}>{title}</title>
        <desc id={`${id}-desc`}>{description}</desc>
        <defs>
          {(["default", "warn", "ok"] as const).map((tone) => (
            <marker
              key={tone}
              id={`${id}-arrow-${tone}`}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" className={`arrow-head tone-${tone}`} />
            </marker>
          ))}
        </defs>
        <DiagramContext id={id}>{children}</DiagramContext>
      </svg>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function DiagramContext({ id, children }: { id: string; children: ReactNode }) {
  return <g data-diagram={id}>{children}</g>;
}

type BoxProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: string;
  tone?: Tone;
};

export function Box({ x, y, w, h, title, sub, tone = "default" }: BoxProps) {
  const titleLines = title.split("\n");
  const subLines = sub ? sub.split("\n") : [];
  const lineHeight = 17;
  const subHeight = 14;
  const total = titleLines.length * lineHeight + subLines.length * subHeight;
  const startY = y + h / 2 - total / 2 + 13;

  return (
    <g className={`d-box tone-${tone}`}>
      <rect x={x} y={y} width={w} height={h} rx={12} />
      <text x={x + w / 2} textAnchor="middle">
        {titleLines.map((line, index) => (
          <tspan key={line} x={x + w / 2} y={startY + index * lineHeight} className="d-title">
            {line}
          </tspan>
        ))}
        {subLines.map((line, index) => (
          <tspan
            key={line}
            x={x + w / 2}
            y={startY + titleLines.length * lineHeight + index * subHeight}
            className="d-sub"
          >
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

type ArrowProps = {
  id: string;
  d: string;
  tone?: "default" | "warn" | "ok";
  dashed?: boolean;
  label?: string;
  labelX?: number;
  labelY?: number;
};

export function Arrow({ id, d, tone = "default", dashed, label, labelX, labelY }: ArrowProps) {
  return (
    <g className={`d-arrow tone-${tone}`}>
      <path d={d} markerEnd={`url(#${id}-arrow-${tone})`} strokeDasharray={dashed ? "6 5" : undefined} />
      {label && labelX !== undefined && labelY !== undefined ? (
        <text x={labelX} y={labelY} textAnchor="middle" className="d-label">
          {label}
        </text>
      ) : null}
    </g>
  );
}

type GroupProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  tone?: Tone;
};

export function Group({ x, y, w, h, label, tone = "muted" }: GroupProps) {
  return (
    <g className={`d-group tone-${tone}`}>
      <rect x={x} y={y} width={w} height={h} rx={16} />
      <text x={x + 14} y={y + 22} className="d-group-label">
        {label}
      </text>
    </g>
  );
}

export function Note({ x, y, text, anchor = "start" }: { x: number; y: number; text: string; anchor?: "start" | "middle" | "end" }) {
  return (
    <text x={x} y={y} textAnchor={anchor} className="d-note">
      {text}
    </text>
  );
}
