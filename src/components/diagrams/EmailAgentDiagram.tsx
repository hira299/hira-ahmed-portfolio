import { Arrow, Box, DiagramFrame } from "./primitives";

const id = "email-agent";
const w = 160;
const h = 72;

export function EmailAgentDiagram() {
  return (
    <DiagramFrame
      id={id}
      width={960}
      height={260}
      title="Stateful n8n email agent"
      description="New Gmail messages reach a self-hosted n8n instance through a Cloudflare Tunnel. The workflow loads the thread history from Google Sheets, screens the inquiry with Groq, then either drafts a grounded reply from verified profile data or flags high-value leads for a person. Thread state is written back after every message."
      caption={
        <>
          <strong>Thread state lives outside the model.</strong> It is read before every reply and written back after,
          so multi-turn conversations stay coherent.
        </>
      }
    >
      <Box x={24} y={24} w={w} h={h} title="Gmail API" sub="via Cloudflare Tunnel" />
      <Box x={216} y={24} w={w} h={h} title="n8n trigger" sub="self-hosted" />
      <Box x={408} y={24} w={w} h={h} title="Thread history" sub="Google Sheets" tone="data" />
      <Box x={600} y={24} w={w} h={h} title="Screening" sub="Groq · classify" tone="ai" />
      <Box x={792} y={24} w={w} h={h} title="Grounded answer" sub={"routine questions ·\nverified profile data"} tone="ai" />
      <Arrow id={id} d="M186 60 H212" />
      <Arrow id={id} d="M378 60 H404" />
      <Arrow id={id} d="M570 60 H596" />
      <Arrow id={id} d="M762 60 H788" />

      <Box x={792} y={164} w={w} h={h} title="Draft reply" sub="Groq" tone="ai" />
      <Box x={600} y={164} w={w} h={h} title="Gmail draft" sub="saved for review" />
      <Box x={408} y={164} w={w} h={h} title="Update thread" sub="history written back" tone="data" />
      <Box x={24} y={164} w={w + 32} h={h} title="Flag for a person" sub="with context notes" tone="warn" />
      <Arrow id={id} d="M872 98 V160" />
      <Arrow id={id} d="M790 200 H764" />
      <Arrow id={id} d="M598 200 H572" />
      <Arrow id={id} d="M540 162 V100" dashed />
      <Arrow id={id} d="M640 98 V130 H120 V160" tone="warn" label="high-value lead" labelX={300} labelY={124} />
    </DiagramFrame>
  );
}
