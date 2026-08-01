import Placeholder from "@/components/Placeholder";

/**
 * Sticky from `lg` up, capped to `--spacing-panel-max` so the panel always
 * fits the viewport — the message region is the part that scrolls. Below `lg`
 * it sits in normal flow after the grid, where no cap is needed.
 */
export default function ChatPanel() {
  return (
    <section
      id="chat"
      aria-label="AI agent chat"
      /*
        `tabIndex={-1}` is what makes the header's "Chat with our AI Agent"
        link move keyboard focus here, not just the viewport — a plain
        <section> is not a focus target otherwise.
      */
      tabIndex={-1}
      className="flex scroll-mt-24 flex-col gap-4 rounded-xl border border-neutral-200 p-4 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:outline-none lg:sticky lg:top-panel-inset lg:max-h-panel-max"
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
