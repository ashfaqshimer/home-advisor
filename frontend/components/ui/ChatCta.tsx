/**
 * The site's single call to action.
 *
 * An anchor, not a button: the target is a real element on the page, so this
 * works with no JS and is keyboard reachable without any extra handling. It
 * lives here rather than inside Hero because the navbar needs the identical
 * control — that region is still placeholdered, so this has one caller today.
 */
export default function ChatCta({ className = "" }: { className?: string }) {
  return (
    <a
      href="#chat"
      className={`inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-on-brand transition-colors hover:bg-brand/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${className}`}
    >
      {/* Decorative. The accessible name has to come from the label alone. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4 shrink-0"
      >
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      </svg>
      Chat with our AI Agent
    </a>
  );
}
