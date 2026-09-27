import { Arrow, Box, DiagramFrame, Group, Note } from "./primitives";

const id = "pipeline";
const w = 196;
const h = 70;
const xs = [24, 262, 500, 738];

const row1 = [
  { title: "Scraped", sub: "10 source platforms" },
  { title: "Social links", sub: "extracted" },
  { title: "Labels &\ncategories", sub: "LLM stage 1", tone: "ai" as const },
  { title: "Descriptions", sub: "LLM stage 2", tone: "ai" as const },
];

const row2 = [
  { title: "FAQ", sub: "LLM stage 3", tone: "ai" as const },
  { title: "Translation", sub: "LLM stage 4 · 9 languages", tone: "ai" as const },
  { title: "Thumbnail", sub: "generated" },
  { title: "Complete", sub: "ready for frontend", tone: "ok" as const },
];

export function PipelineDiagram() {
  return (
    <DiagramFrame
      id={id}
      width={960}
      height={450}
      title="Status-gated AI enrichment pipeline"
      description="Records move through eight stages: scraped, social links, four LLM stages (labels and categories, descriptions, FAQ, translation into nine languages), thumbnail, and complete. Every stage reads and writes the record status in PostgreSQL. A failed LLM stage records the failure and leaves the status unchanged for retry."
      caption={
        <>
          <strong>Conceptual view.</strong> Each stage only picks up records the previous stage completed. LLM stages run
          through OpenRouter with Gemini Flash Lite; a failed call never advances the record.
        </>
      }
    >
      {row1.map((stage, index) => (
        <Box key={stage.title} x={xs[index]} y={30} w={w} h={h} {...stage} />
      ))}
      {[0, 1, 2].map((index) => (
        <Arrow key={index} id={id} d={`M${xs[index] + w + 2} 65 H${xs[index + 1] - 4}`} />
      ))}
      <Arrow id={id} d={`M${xs[3] + w / 2} ${30 + h + 2} V${160 - 4}`} />
      {row2.map((stage, index) => (
        <Box key={stage.title} x={xs[3 - index]} y={160} w={w} h={h} {...stage} />
      ))}
      {[0, 1, 2].map((index) => (
        <Arrow key={index} id={id} d={`M${xs[3 - index] - 2} 195 H${xs[2 - index] + w + 4}`} />
      ))}

      <Group x={24} y={278} w={910} h={62} label="" tone="data" />
      <Note x={479} y={305} anchor="middle" text="PostgreSQL · one status per record, per stage" />
      <Note x={479} y={326} anchor="middle" text="Progress lives in the database, so any stage can stop, resume, or rerun without redoing finished work" />
      {xs.map((x) => (
        <Arrow key={x} id={id} d={`M${x + w / 2} 232 V${278 - 4}`} dashed />
      ))}

      <Box
        x={220}
        y={366}
        w={520}
        h={62}
        tone="warn"
        title="Stage fails: timeout, malformed JSON, API error"
        sub="failure recorded · status not advanced · retried later"
      />
    </DiagramFrame>
  );
}
