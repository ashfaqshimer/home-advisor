import Placeholder from "@/components/Placeholder";

/**
 * Sticky from `lg` up, capped to `--spacing-panel-max` so the panel always
 * fits the viewport — the message region is the part that scrolls. Below `lg`
 * it sits in normal flow after the grid, where no cap is needed.
 *
 * `id="chat"` is the hero CTA's jump target. The scroll margin matches the
 * sticky inset so the panel lands where it will settle, not flush to the
 * viewport edge and then nudged down a beat later.
 */
export default function ChatPanel() {
  return (
    <section
      id="chat"
      aria-label="AI agent chat"
      /*
        `tabIndex={-1}` is what makes the CTA move keyboard focus here, not just
        the viewport — a plain <section> is not a focus target otherwise.
      */
      tabIndex={-1}
      className="flex scroll-mt-panel-inset flex-col gap-4 rounded-xl border border-neutral-200 p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand lg:sticky lg:top-panel-inset lg:max-h-panel-max"
    >
      <Placeholder label="Agent header" className="h-14 shrink-0" />
      <Placeholder
        label="Message list (scrolls)"
        className="min-h-72 shrink-0 lg:min-h-0 lg:flex-1 lg:overflow-y-auto"
      />
      <Placeholder label="Prompt chips" className="h-20 shrink-0" />
      <Placeholder label="Chat input" className="h-12 shrink-0" />
    </section>
  );
}
