import { Arrow, Box, DiagramFrame, Note } from "./primitives";

const id = "guardrail";
const w = 160;
const h = 72;

export function GuardrailDiagram() {
  return (
    <DiagramFrame
      id={id}
      width={960}
      height={360}
      title="Profitability guardrail state machine"
      description="Project budget data from ClickUp is validated in n8n. Malformed payloads go to a PostgreSQL dead-letter queue. Valid data is scored as Healthy, Warning, or Critical and compared with the last stored state. Only a state change triggers a Slack alert and an audit log entry."
      caption={
        <>
          <strong>Alerts fire on transitions, not on every run.</strong> Malformed payloads are isolated in a dead-letter
          queue instead of breaking the workflow.
        </>
      }
    >
      <Box x={24} y={24} w={w} h={h} title="Project data" sub="ClickUp" />
      <Box x={216} y={24} w={w} h={h} title="Validate payload" sub="n8n" />
      <Box x={408} y={24} w={w} h={h} title="Score budget" sub="3 budget states" />
      <Box x={600} y={24} w={w} h={h} title={"Compare with\nlast state"} sub="PostgreSQL" tone="data" />
      <Box x={792} y={24} w={w} h={h} title="Alert + audit log" sub="on change · Slack" tone="ok" />
      <Arrow id={id} d="M186 60 H212" />
      <Arrow id={id} d="M378 60 H404" />
      <Arrow id={id} d="M570 60 H596" />
      <Arrow id={id} d="M762 60 H788" tone="ok" />

      <Box x={216} y={150} w={w} h={64} title="Dead-letter queue" sub="malformed payloads" tone="warn" />
      <Box x={600} y={150} w={w} h={64} title="No alert" sub="state unchanged" tone="muted" />
      <Arrow id={id} d="M296 98 V146" tone="warn" label="invalid" labelX={322} labelY={126} />
      <Arrow id={id} d="M680 98 V146" label="same" labelX={704} labelY={126} />

      <Box x={250} y={262} w={140} h={56} title="Healthy" tone="ok" />
      <Box x={430} y={262} w={140} h={56} title="Warning" tone="warn" />
      <Box x={610} y={262} w={140} h={56} title="Critical" tone="warn" />
      <Arrow id={id} d="M392 282 H426" />
      <Arrow id={id} d="M572 282 H606" />
      <Arrow id={id} d="M606 300 H572" />
      <Arrow id={id} d="M426 300 H392" />
      <Note x={500} y={344} anchor="middle" text="States can move both ways; each transition sends one alert." />
    </DiagramFrame>
  );
}
