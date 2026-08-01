/** Padding only — the hero's CTA is a headline-scale control, the header's is not. */
const SIZES = {
  sm: "px-4 py-2",
  lg: "px-6 py-3",
};

/**
 * The site's single call to action. Used by the hero and, three times over, by
 * the header (desktop row and mobile panel).
 *
 * An anchor, not a button: the target is a real element on the page, so this
 * works with no JS and is keyboard reachable without any extra handling.
 *
 * Size is a prop rather than an overridable class because two competing `px-*`
 * utilities in one class list resolve by stylesheet order, not by argument
 * order — passing `px-4` via className would not reliably beat the default.
 */
export default function ChatCta({
  className = "",
  size = "lg",
  onClick,
}: {
  className?: string;
  size?: keyof typeof SIZES;
  /** Lets the header's mobile panel close itself when the CTA is used. */
  onClick?: () => void;
}) {
  return (
    <a
      href="#chat"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full bg-brand ${SIZES[size]} text-sm font-semibold text-on-brand transition-colors hover:bg-brand/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${className}`}
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
