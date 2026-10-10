import { DiagramFrame, Note } from "./primitives";

const id = "tekruiter-qa";

const personas = [
  "Recruiter",
  "Account Manager",
  "Candidate",
  "System Admin",
  "Finance / Billing",
  "External Agency",
];

const modulesCovered = [
  { area: "Org-Wide Defaults & Privacy", focus: "Confidential pay, bill rates, margin leakages & role isolation" },
  { area: "Timesheets & Placements", focus: "Pre-start date hour logging prevention & placement workflows" },
  { area: "Financial Invoicing Engine", focus: "$7.95M rate multiplier bug, auto-drafting & DB save locks" },
  { area: "Candidate & ATS Portal", focus: "External-agency job leakage & candidate portal privacy sweeps" },
];

const severity = [
  { label: "P1", value: 1 },
  { label: "P2", value: 14 },
  { label: "P3", value: 34 },
  { label: "P4", value: 8 },
];

const layers = [
  { label: "Frontend only", value: 31 },
  { label: "Backend only", value: 13 },
  { label: "Both layers", value: 13 },
];

function Bars({
  x,
  y,
  title,
  items,
  max,
}: {
  x: number;
  y: number;
  title: string;
  items: { label: string; value: number }[];
  max: number;
}) {
  const labelWidth = 105;
  const maxBarWidth = 125;

  return (
    <g>
      <text
        x={x}
        y={y}
        fill="#6B1724"
        fontSize={11}
        fontWeight={600}
        letterSpacing="0.05em"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        style={{ textTransform: "uppercase" }}
      >
        {title}
      </text>
      {items.map((item, index) => {
        const rowY = y + 15 + index * 26;
        const barWidth = Math.max(8, (item.value / max) * maxBarWidth);
        const barX = x + labelWidth;
        return (
          <g key={item.label}>
            <text
              x={x}
              y={rowY + 12}
              fill="#5C5254"
              fontSize={11}
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              textAnchor="start"
            >
              {item.label}
            </text>

            <rect
              x={barX}
              y={rowY + 1}
              width={maxBarWidth}
              height={14}
              rx={3}
              fill="#EFEAE1"
            />

            <rect
              x={barX}
              y={rowY + 1}
              width={barWidth}
              height={14}
              rx={3}
              fill="#6B1724"
            />

            <text
              x={barX + maxBarWidth + 10}
              y={rowY + 12}
              fill="#1C1416"
              fontSize={11}
              fontWeight={600}
              fontFamily="ui-monospace, monospace"
              textAnchor="start"
            >
              {item.value}
            </text>
          </g>
        );
      })}
    </g>
  );
}

export function TekruiterDiagram() {
  return (
    <DiagramFrame
      id={id}
      width={960}
      height={330}
      title="Tekruiter QA coverage: testing across 20+ modules, defects by severity and layer"
      description="57 defects logged in export sheet (47 by lead tester, 10 by second tester) across 20+ modules and 6 personas. Defects by severity: 1 P1, 14 P2, 34 P3, 8 P4. By layer: 31 frontend only, 13 backend only, 13 in both."
      caption={
        <>
          <strong>Testing led with a second tester across 20+ modules.</strong> Recording the affected layer exposed
          backend data leaks and database integrity faults that UI checks alone would miss.
        </>
      }
    >
      {/* Left Column: Scope & Personas */}
      <text
        x={24}
        y={32}
        fill="#6B1724"
        fontSize={11}
        fontWeight={600}
        letterSpacing="0.05em"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        style={{ textTransform: "uppercase" }}
      >
        Verified Modules &amp; Coverage Pillars (20+ Modules)
      </text>

      {/* Module Cards */}
      <g>
        {modulesCovered.map((mod, idx) => {
          const cardY = 50 + idx * 52;
          return (
            <g key={mod.area}>
              <rect
                x={24}
                y={cardY}
                width={560}
                height={44}
                rx={6}
                fill="#FAF8F5"
                stroke="#E8E2D9"
                strokeWidth={1}
              />
              <circle cx={40} cy={cardY + 22} r={4} fill="#6B1724" />
              <text
                x={54}
                y={cardY + 18}
                fill="#1C1416"
                fontSize={12}
                fontWeight={600}
                fontFamily="ui-sans-serif, system-ui, sans-serif"
              >
                {mod.area}
              </text>
              <text
                x={54}
                y={cardY + 34}
                fill="#5C5254"
                fontSize={10.5}
                fontFamily="ui-sans-serif, system-ui, sans-serif"
              >
                {mod.focus}
              </text>
            </g>
          );
        })}
      </g>

      {/* 6 Personas Pill Row */}
      <g>
        <text
          x={24}
          y={272}
          fill="#827577"
          fontSize={10}
          fontFamily="ui-monospace, monospace"
          style={{ textTransform: "uppercase" }}
        >
          6 Personas tested:
        </text>
        {personas.map((p, idx) => {
          const px = 145 + idx * 75;
          return (
            <g key={p}>
              <rect
                x={px}
                y={260}
                width={70}
                height={18}
                rx={4}
                fill="#FAF0F0"
                stroke="#F0D5D8"
                strokeWidth={1}
              />
              <text
                x={px + 35}
                y={272}
                textAnchor="middle"
                fill="#6B1724"
                fontSize={9}
                fontFamily="ui-monospace, monospace"
              >
                {p}
              </text>
            </g>
          );
        })}
      </g>

      {/* Note */}
      <Note x={24} y={305} text="60+ defects documented · 20+ modules · 6 personas · 57 in export sheet (47 lead + 10 second tester)" />

      {/* Subtle Divider */}
      <line x1={616} y1={28} x2={616} y2={280} stroke="#E8E1D7" strokeWidth={1} strokeDasharray="3 3" />

      {/* Analytics Bars on Right */}
      <Bars x={645} y={32} title="Defects by severity" items={severity} max={34} />
      <Bars x={645} y={185} title="Defects by layer" items={layers} max={31} />
    </DiagramFrame>
  );
}
