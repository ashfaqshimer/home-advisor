"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import ChatCta from "@/components/layout/ChatCta";
import { NAV_LINKS } from "@/components/layout/nav-links";

const PANEL_ID = "mobile-nav-panel";

/**
 * The only client component in the header — it exists to keep `useState` out of
 * Navbar so the rest of the page stays server-rendered.
 *
 * The panel is unmounted when closed rather than hidden with CSS: hidden links
 * stay tabbable and stay in the accessibility tree, and they'd also duplicate
 * every link in the desktop row for any `getByRole` query.
 *
 * Known gap, accepted: opening the panel and then widening past `md` leaves
 * `open` true while CSS hides the panel, so narrowing again re-reveals it. A
 * resize listener isn't worth the cost for that.
 */
export default function MobileMenu({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      // Escape should hand focus back to the control that opened the panel,
      // otherwise focus is left on a node that just left the DOM.
      buttonRef.current?.focus();
    }

    function onPointerDown(event: PointerEvent) {
      // The panel is a DOM child of rootRef even though it renders visually
      // outside the nav row, so one containment check covers both.
      if (rootRef.current?.contains(event.target as Node)) return;
      setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={className}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={PANEL_ID}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((wasOpen) => !wasOpen)}
        className="flex size-9 items-center justify-center rounded-lg border border-neutral-300 text-neutral-700 transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-800"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      {open && (
        // `top-full` resolves against the <header>, which is the nearest
        // positioned ancestor — this wrapper is deliberately not `relative`.
        <div
          id={PANEL_ID}
          className="absolute inset-x-0 top-full z-50 border-b border-neutral-200 bg-white shadow-lg"
        >
          {/*
            No inner <nav> landmark: this renders inside the header's
            `aria-label="Main"` nav, and nesting a second navigation region
            inside it would announce the same links twice.
          */}
          <ul className="flex flex-col gap-1 p-4">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-800"
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <ChatCta className="flex" onClick={() => setOpen(false)} />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      aria-hidden="true"
      className="size-5"
    >
      <path d="M3.5 6h13M3.5 10h13M3.5 14h13" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      aria-hidden="true"
      className="size-5"
    >
      <path d="M5.5 5.5l9 9M14.5 5.5l-9 9" />
    </svg>
  );
}
