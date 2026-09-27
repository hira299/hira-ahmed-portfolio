import { DiagramFrame, Note } from "./primitives";

const id = "qa-coverage";

const groups = ["Order to delivery", "Payments", "Returns", "Security"];
const personas: { name: string; counts: number[] }[] = [
  { name: "Pharmacy manager", counts: [1, 1, 1, 0] },
  { name: "Distributor manager", counts: [4, 3, 2, 2] },
  { name: "Driver", counts: [1, 0, 1, 1] },
  { name: "All roles (sweeps)", counts: [0, 0, 0, 3] },
];
const totals = [6, 4, 4, 6];

const severity = [
  { label: "P1", value: 11 },
  { label: "P2", value: 19 },
  { label: "P3", value: 43 },
  { label: "P4", value: 7 },
];
const layers = [
  { label: "Frontend only", value: 58 },
  { label: "Backend only", value: 10 },
  { label: "Both layers", value: 12 },
];

const cellW = 104;
const cellH = 44;
const gridX = 175;
const gridY = 82;

function getCellColors(count: number) {
  if (count === 0) {
    return {
      fill: "#F7F5F0",
      stroke: "#E8E2D9",
      textColor: "#A89F95",
      isZero: true,
    };
  }
  if (count === 1) {
    return {
      fill: "#FCEEEF",
      stroke: "#F0D3D7",
      textColor: "#6B1724",
      isZero: false,
    };
  }
  if (count === 2) {
    return {
      fill: "#F3D0D5",
      stroke: "#E3AAB3",
      textColor: "#6B1724",
      isZero: false,
    };
  }
  if (count === 3) {
    return {
      fill: "#9E2A3B",
      stroke: "#8B2433",
      textColor: "#FFFFFF",
      isZero: false,
    };
  }
  return {
    fill: "#6B1724",
    stroke: "#54111B",
    textColor: "#FFFFFF",
    isZero: false,
  };
}

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
            {/* Label */}
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

            {/* Track Background */}
            <rect
              x={barX}
              y={rowY + 1}
              width={maxBarWidth}
              height={14}
              rx={3}
              fill="#EFEAE1"
            />

            {/* Filled Bar */}
            <rect
              x={barX}
              y={rowY + 1}
              width={barWidth}
              height={14}
              rx={3}
              fill="#6B1724"
            />

            {/* Value Label */}
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

export function QaCoverageDiagram() {
  return (
    <DiagramFrame
      id={id}
      width={960}
      height={330}
      title="QA coverage: journeys by persona, defects by severity and layer"
      description="Twenty journeys across four groups: order to delivery 6, payments and finance 4, returns 4, security and boundaries 6, each run as the persona that performs it. Defects by severity: 11 P1, 19 P2, 43 P3, 7 P4. By layer: 58 frontend only, 10 backend only, 12 in both."
      caption={
        <>
          <strong>Journeys were run as the real persona.</strong> Boundary sweeps covered all roles at once. Recording
          the affected layer separated UI fixes from API-level fixes.
        </>
      }
    >
      {/* Matrix Header */}
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
        Journeys by persona
      </text>

      {/* Column Group Headers */}
      {groups.map((group, col) => {
        const colCenter = gridX + col * cellW + cellW / 2;
        return (
          <g key={group}>
            <text
              x={colCenter}
              y={gridY - 22}
              textAnchor="middle"
              fill="#1C1416"
              fontSize={11}
              fontWeight={500}
              fontFamily="ui-sans-serif, system-ui, sans-serif"
            >
              {group}
            </text>
            <text
              x={colCenter}
              y={gridY - 8}
              textAnchor="middle"
              fill="#827577"
              fontSize={10}
              fontFamily="ui-monospace, monospace"
            >
              {totals[col]} journeys
            </text>
          </g>
        );
      })}

      {/* Persona Rows & Cells */}
      {personas.map((persona, row) => {
        const rowY = gridY + row * cellH;
        return (
          <g key={persona.name}>
            <text
              x={24}
              y={rowY + cellH / 2 + 4}
              fill="#332A2C"
              fontSize={11.5}
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              textAnchor="start"
            >
              {persona.name}
            </text>

            {persona.counts.map((count, col) => {
              const cellX = gridX + col * cellW + 3;
              const cellY = rowY + 3;
              const cellWidth = cellW - 6;
              const cellHeight = cellH - 6;
              const style = getCellColors(count);

              return (
                <g key={col}>
                  <rect
                    x={cellX}
                    y={cellY}
                    width={cellWidth}
                    height={cellHeight}
                    rx={6}
                    fill={style.fill}
                    stroke={style.stroke}
                    strokeWidth={1}
                  />
                  <text
                    x={cellX + cellWidth / 2}
                    y={cellY + cellHeight / 2 + (style.isZero ? 4 : 5)}
                    textAnchor="middle"
                    fill={style.textColor}
                    fontSize={style.isZero ? 13 : 13.5}
                    fontWeight={style.isZero ? 400 : 600}
                    fontFamily="ui-monospace, monospace"
                  >
                    {count === 0 ? "–" : count}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}

      {/* Summary Note */}
      <Note x={gridX} y={gridY + 4 * cellH + 24} text="20 journeys · 6 roles · 15 modules" />

      {/* Subtle Divider */}
      <line x1={616} y1={28} x2={616} y2={280} stroke="#E8E1D7" strokeWidth={1} strokeDasharray="3 3" />

      {/* Analytics Bars on Right */}
      <Bars x={645} y={32} title="Defects by severity" items={severity} max={43} />
      <Bars x={645} y={185} title="Defects by layer" items={layers} max={58} />
    </DiagramFrame>
  );
}
