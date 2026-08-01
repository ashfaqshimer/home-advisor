import Placeholder from "@/components/Placeholder";

/**
 * Sticky from `lg` up, capped to `--spacing-panel-max` so the panel always
 * fits the viewport — the message region is the part that scrolls. Below `lg`
 * it sits in normal flow after the grid, where no cap is needed.
 */
export default function ChatPanel() {
  return (
    <section
      aria-label="AI agent chat"
      className="flex flex-col gap-4 rounded-xl border border-neutral-200 p-4 lg:sticky lg:top-panel-inset lg:max-h-panel-max"
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
