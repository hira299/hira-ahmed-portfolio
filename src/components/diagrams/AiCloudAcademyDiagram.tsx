import { DiagramFrame, Note } from "./primitives";

const id = "ai-cloud-academy-qa";

const types = [
  { label: "Functional defects", value: 20 },
  { label: "Content / Video defects", value: 19 },
  { label: "UX / UI defects", value: 17 },
  { label: "Data / Progress tracking", value: 12 },
  { label: "Media / Audio issues", value: 6 },
  { label: "Logic / Calculation", value: 3 },
  { label: "Interactive elements", value: 3 },
];

const severity = [
  { label: "Critical", value: 12 },
  { label: "Major", value: 46 },
  { label: "Minor", value: 27 },
];

function TypeBars({
  x,
  y,
  items,
  max,
}: {
  x: number;
  y: number;
  items: { label: string; value: number }[];
  max: number;
}) {
  const labelWidth = 175;
  const maxBarWidth = 205;

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
        Defects by Classification Type (85 Entries, 69 Unique)
      </text>
      {items.map((item, index) => {
        const rowY = y + 15 + index * 27;
        const barWidth = Math.max(8, (item.value / max) * maxBarWidth);
        const barX = x + labelWidth;
        return (
          <g key={item.label}>
            <text
              x={x}
              y={rowY + 12}
              fill="#332A2C"
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

function SeverityBars({
  x,
  y,
  items,
  max,
}: {
  x: number;
  y: number;
  items: { label: string; value: number }[];
  max: number;
}) {
  const labelWidth = 80;
  const maxBarWidth = 140;

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
        Defects by Severity
      </text>
      {items.map((item, index) => {
        const rowY = y + 16 + index * 28;
        const barWidth = Math.max(10, (item.value / max) * maxBarWidth);
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

export function AiCloudAcademyDiagram() {
  return (
    <DiagramFrame
      id={id}
      width={960}
      height={330}
      title="AI Cloud Academy QA: defects by classification type and severity across 37 courses"
      description="85 logged entries (69 unique) across 5 QA rounds and 37 courses. Severity: Critical 12, Major 46, Minor 27. 41 fixes verified and closed after retesting. 68 video-content recommendations."
      caption={
        <>
          <strong>Platform and curriculum QA across 37 courses.</strong> 41 fixes verified and closed after retesting.
          Critical findings blocked mobile progression, lesson click locking, certificate issuance failures, and a gamification XP exploit.
        </>
      }
    >
      {/* Left Column: Classification Types */}
      <TypeBars x={24} y={30} items={types} max={20} />

      {/* Subtle Divider */}
      <line x1={530} y1={28} x2={530} y2={280} stroke="#E8E1D7" strokeWidth={1} strokeDasharray="3 3" />

      {/* Right Column Top: Severity Bars */}
      <SeverityBars x={560} y={30} items={severity} max={46} />

      {/* Right Column Bottom: Scope Callout Card */}
      <g>
        <rect
          x={560}
          y={140}
          width={370}
          height={125}
          rx={6}
          fill="#FAF8F5"
          stroke="#E8E2D9"
          strokeWidth={1}
        />
        <text
          x={576}
          y={162}
          fill="#6B1724"
          fontSize={11}
          fontWeight={600}
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          style={{ textTransform: "uppercase" }}
        >
          Scope &amp; Curricular Interventions
        </text>
        <text
          x={576}
          y={183}
          fill="#332A2C"
          fontSize={10.5}
          fontFamily="ui-sans-serif, system-ui, sans-serif"
        >
          • 37 Courses systematically audited across 5 QA rounds
        </text>
        <text
          x={576}
          y={201}
          fill="#332A2C"
          fontSize={10.5}
          fontFamily="ui-sans-serif, system-ui, sans-serif"
        >
          • 41 Fixes verified and closed after regression retests
        </text>
        <text
          x={576}
          y={219}
          fill="#332A2C"
          fontSize={10.5}
          fontFamily="ui-sans-serif, system-ui, sans-serif"
        >
          • 68 Actionable video-content &amp; editorial recommendations
        </text>
        <text
          x={576}
          y={237}
          fill="#5C5254"
          fontSize={10}
          fontFamily="ui-monospace, monospace"
        >
          Eliminated XP rapid-click gamification exploit
        </text>
      </g>

      {/* Footer Note */}
      <Note x={24} y={262} text="80+ defects logged (85 entries, 69 unique) · 5 QA rounds · 37 courses · 40+ fixes verified (41 closed after retest)" />
    </DiagramFrame>
  );
}
