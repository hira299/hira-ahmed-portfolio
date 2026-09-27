import { Arrow, Box, DiagramFrame, Group, Note } from "./primitives";

const id = "compliance";
const top = [
  { x: 24, title: "Security questionnaire", sub: "CAIQ · SOC 2 · SIG" },
  { x: 262, title: "Queue worker", sub: "n8n + PostgreSQL · row locks" },
  { x: 500, title: "FastAPI service", sub: "one question per run" },
];
const inner = { y: 170, w: 180, h: 72 };
const xs = [48, 280, 512, 744];

export function ComplianceDiagram() {
  return (
    <DiagramFrame
      id={id}
      width={960}
      height={500}
      title="Evidence-based AI auditing engine, second version"
      description="Questionnaire questions go through an n8n and PostgreSQL queue to a FastAPI service running a LangGraph Corrective RAG state machine. It retrieves live AWS evidence and policy passages from pgvector, grades relevance with Llama 3.1 8B, corrects weak retrievals, generates an answer, and a Critic Agent rejects any answer without a verified ARN or document citation."
      caption={
        <>
          <strong>Simplified view</strong> of the Corrective RAG loop. An answer is only accepted when the Critic Agent
          confirms it cites a real AWS ARN or document section. It answers questionnaires with evidence; it is not a
          certification or attestation.
        </>
      }
    >
      {top.map((box) => (
        <Box key={box.title} x={box.x} y={24} w={210} h={64} title={box.title} sub={box.sub} />
      ))}
      <Arrow id={id} d="M236 56 H258" />
      <Arrow id={id} d="M474 56 H496" />

      <Group x={24} y={128} w={912} h={252} label="" tone="ai" />
      <Note x={920} y={368} anchor="end" text="LangGraph state machine · Corrective RAG" />
      <Arrow id={id} d="M605 90 V112 H138 V166" />

      <Box x={xs[0]} {...inner} title="Retrieve" sub={"AWS evidence +\npgvector passages"} tone="data" />
      <Box x={xs[1]} {...inner} title="Grade relevance" sub="Llama 3.1 8B on Groq" tone="ai" />
      <Box x={xs[2]} {...inner} title="Generate answer" sub="from graded passages" tone="ai" />
      <Box x={xs[3]} {...inner} title="Critic Agent" sub={"verify ARN or\ndocument section"} tone="ai" />

      <Arrow id={id} d={`M${xs[0] + 182} 206 H${xs[1] - 4}`} />
      <Arrow id={id} d={`M${xs[1] + 182} 206 H${xs[2] - 4}`} label="relevant" labelX={496} labelY={198} />
      <Arrow id={id} d={`M${xs[2] + 182} 206 H${xs[3] - 4}`} />

      <Box x={280} y={286} w={180} h={58} title="Correct retrieval" sub="re-query weak passages" tone="warn" />
      <Arrow id={id} d="M370 244 V282" tone="warn" label="weak" labelX={394} labelY={268} />
      <Arrow id={id} d="M278 315 H190 V246" tone="warn" />

      <Arrow id={id} d="M834 168 V148 H602 V166" tone="warn" dashed label="no verified citation" labelX={718} labelY={142} />

      <Box x={24} y={412} w={210} h={64} title="AWS account" sub="50+ CIS checks · CLI sidecar" tone="data" />
      <Box x={262} y={412} w={210} h={64} title="Policy PDFs" sub="PyMuPDF · FastEmbed" tone="data" />
      <Arrow id={id} d="M100 410 V246" />
      <Arrow id={id} d="M367 410 V396 H130 V246" />

      <Box x={744} y={412} w={180} h={64} title="Cited answer" sub="ARN or document section" tone="ok" />
      <Arrow id={id} d="M834 244 V408" tone="ok" label="verified" labelX={862} labelY={330} />
    </DiagramFrame>
  );
}
