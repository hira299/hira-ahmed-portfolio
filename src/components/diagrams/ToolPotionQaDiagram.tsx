import { DiagramFrame, Note } from "./primitives";

const id = "toolpotion-qa";

const categories = [
  { label: "Wrong category / miscategorized", value: 544 },
  { label: "Ranking / relevancy failures", value: 457 },
  { label: "Data integrity errors", value: 214 },
  { label: "Duplicate listings", value: 122 },
  { label: "Fake or dead tools", value: 71 },
  { label: "Broken listing links", value: 22 },
];

const severity = [
  { label: "Critical", value: 172 },
  { label: "Major", value: 1003 },
  { label: "Minor", value: 223 },
];

function CategoryBars({
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
  const labelWidth = 190;
  const maxBarWidth = 220;

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
        Top Defect Categories (Tagged across 1,398 entries)
      </text>
      {items.map((item, index) => {
        const rowY = y + 16 + index * 32;
        const barWidth = Math.max(10, (item.value / max) * maxBarWidth);
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
              height={15}
              rx={3}
              fill="#EFEAE1"
            />

            <rect
              x={barX}
              y={rowY + 1}
              width={barWidth}
              height={15}
              rx={3}
              fill="#6B1724"
            />

            <text
              x={barX + maxBarWidth + 12}
              y={rowY + 13}
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
  const labelWidth = 85;
  const maxBarWidth = 135;

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
        const rowY = y + 16 + index * 32;
        const barWidth = Math.max(12, (item.value / max) * maxBarWidth);
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
              height={15}
              rx={3}
              fill="#EFEAE1"
            />

            <rect
              x={barX}
              y={rowY + 1}
              width={barWidth}
              height={15}
              rx={3}
              fill="#6B1724"
            />

            <text
              x={barX + maxBarWidth + 10}
              y={rowY + 13}
              fill="#1C1416"
              fontSize={11}
              fontWeight={600}
              fontFamily="ui-monospace, monospace"
              textAnchor="start"
            >
              {item.value.toLocaleString()}
            </text>
          </g>
        );
      })}
    </g>
  );
}

export function ToolPotionQaDiagram() {
  return (
    <DiagramFrame
      id={id}
      width={960}
      height={330}
      title="ToolPotion QA: 1,300+ defects across 10 rounds, defect categories and severity"
      description="1,398 logged entries across 10 QA rounds for a 28K+ AI tools directory. Severity: Critical 172, Major 1,003, Minor 223. 316 fixes verified and closed after retesting."
      caption={
        <>
          <strong>Ten QA rounds across a 28K+ AI tool directory.</strong> 316 fixes verified and closed. Security testing
          flagged a phishing listing, a malware listing, and a clone listing redirecting to a gambling site.
        </>
      }
    >
      {/* Left Column: Top Categories */}
      <CategoryBars x={24} y={30} items={categories} max={544} />

      {/* Subtle Divider */}
      <line x1={540} y1={28} x2={540} y2={280} stroke="#E8E1D7" strokeWidth={1} strokeDasharray="3 3" />

      {/* Right Column: Severity Bars */}
      <SeverityBars x={570} y={30} items={severity} max={1003} />

      {/* Right Column Bottom: Security Callout Box */}
      <g>
        <rect
          x={570}
          y={150}
          width={360}
          height={115}
          rx={6}
          fill="#FAF8F5"
          stroke="#F0D5D8"
          strokeWidth={1}
        />
        <text
          x={585}
          y={172}
          fill="#6B1724"
          fontSize={11}
          fontWeight={600}
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          style={{ textTransform: "uppercase" }}
        >
          Security &amp; Abuse Flags Isolated
        </text>
        <text
          x={585}
          y={194}
          fill="#332A2C"
          fontSize={10.5}
          fontFamily="ui-sans-serif, system-ui, sans-serif"
        >
          • 1 Phishing-flagged listing detected &amp; removed
        </text>
        <text
          x={585}
          y={213}
          fill="#332A2C"
          fontSize={10.5}
          fontFamily="ui-sans-serif, system-ui, sans-serif"
        >
          • 1 Malware-flagged listing intercepted
        </text>
        <text
          x={585}
          y={232}
          fill="#332A2C"
          fontSize={10.5}
          fontFamily="ui-sans-serif, system-ui, sans-serif"
        >
          • 1 Clone listing redirecting to an external gambling site
        </text>
        <text
          x={585}
          y={251}
          fill="#5C5254"
          fontSize={10}
          fontFamily="ui-monospace, monospace"
        >
          190+ dead or fake tools identified across multi-tool records
        </text>
      </g>

      {/* Footer Note */}
      <Note x={24} y={260} text="1,300+ defects (1,398 logged entries) · 10 QA rounds · 170+ critical (172) · 300+ fixes verified (316)" />
    </DiagramFrame>
  );
}
