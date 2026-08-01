import Link from "next/link";

import { CHAT_HREF } from "@/components/layout/nav-links";

/**
 * The dark pill CTA. Rendered twice — once in the desktop row, once inside the
 * mobile panel — so it lives here rather than being duplicated.
 *
 * It only navigates to the chat panel region; it does not open or mount a chat
 * session. That's the chat feature's job.
 */
export default function ChatCta({
  className = "",
  onClick,
}: {
  className?: string;
  /** Lets the mobile panel close itself when the CTA is used. */
  onClick?: () => void;
}) {
  return (
    <Link
      href={CHAT_HREF}
      onClick={onClick}
      className={`items-center justify-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-hover focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:outline-none ${className}`}
    >
      <ChatBubbleIcon />
      Chat with our AI Agent
    </Link>
  );
}

function ChatBubbleIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-4 shrink-0"
    >
      <path d="M14 7.6c0 2.8-2.7 5.1-6 5.1a7 7 0 0 1-1.9-.3L3.2 13.7l.7-2.4A5 5 0 0 1 2 7.6c0-2.8 2.7-5.1 6-5.1s6 2.3 6 5.1Z" />
    </svg>
  );
}
