# Spec: Hero Section

## Goal

Replace the hero's four placeholder blocks with real content matching
`context/ui-interface.png`: an eyebrow pill, a two-line serif headline, a line of
subcopy, and a dark-green pill CTA that jumps to the chat panel. A visitor landing on
the homepage should immediately understand what the site does and have one obvious
action to take.

## Goal state (from the mockup)

```
        ┌───────────────────────────────────┐
        │   Colombo-based · island-wide     │   pill, #e4e4e2 bg, muted text
        └───────────────────────────────────┘
           Find your next home in               serif, ~48px, #1a1a1a
           Colombo — and beyond                 two lines, tight leading

        AI-guided property search across        sans, ~15px, #7d817d
     Sri Lanka's top locations. Tell us          centred, max ~28rem
   what you're looking for, and we'll find
             the right address.

           ┌──────────────────────────┐
           │ (icon) Chat with our AI  │        #2c4a3e pill, #f5f4f1 text
           └──────────────────────────┘
```

## Acceptance Criteria

- [ ] Hero renders an eyebrow pill reading `Colombo-based · island-wide reach`
      (middot separator, not a hyphen).
- [ ] Hero renders a single `<h1>` — the page's only `h1` — reading
      `Find your next home in Colombo — and beyond` (em dash).
- [ ] The `h1` uses the `font-display` utility, backed by a `--font-display`
      system-serif stack token in `globals.css`. No web font is downloaded.
- [ ] Hero renders subcopy: `AI-guided property search across Sri Lanka's top
      locations. Tell us what you're looking for, and we'll find the right address.`
- [ ] The CTA is an `<a href="#chat">` styled as a filled pill, labelled
      `Chat with our AI Agent`, with a decorative chat-bubble icon marked
      `aria-hidden`.
- [ ] `ChatPanel` renders `id="chat"` so the CTA has a live target, and
      `scroll-behavior: smooth` is set on `html` behind
      `prefers-reduced-motion: no-preference`.
- [ ] Brand colours live as `@theme` tokens in `globals.css`, not inline
      arbitrary values: hero band `#eef1ec`, brand green `#2c4a3e`,
      ink `#1a1a1a`, muted `#7d817d`, pill `#e4e4e2`, on-brand text `#f5f4f1`.
- [ ] The hero's `Placeholder` usages are gone; `Placeholder.tsx` itself stays
      (navbar, cards, chat panel, footer still use it).
- [ ] CTA has a visible `:focus-visible` ring and is reachable by keyboard.
- [ ] Renders without horizontal overflow at 375px and 1440px; headline scales
      down on small screens rather than wrapping to four lines.
- [ ] `pnpm build` and `pnpm test` pass from `frontend/`.

## Out of Scope

- **Web fonts.** Playfair Display / DM Sans (or whatever the final pairing is) are
  deliberately deferred to their own typography feature. This branch ships a
  `--font-display` token pointing at a system serif stack so that swap is one line.
- **Navbar.** Its logo, nav links, and CTA stay as placeholders even though they
  share the hero's green pill and brand mark.
- **A real chat panel.** The CTA anchors to `#chat`; what lives there is still a
  placeholder.
- **Property grid, footer, background imagery.**
- **Dark mode.**

## Edge Cases

- **Narrow viewport (375px).** Headline drops to a smaller step; the eyebrow pill
  wraps its text rather than overflowing the container.
- **Reduced motion.** Smooth scroll is opt-out — users with
  `prefers-reduced-motion: reduce` get an instant jump.
- **No JS / keyboard nav.** The CTA is a real anchor, so it works with no JS and
  shows a focus ring.
- **Icon and screen readers.** The chat-bubble SVG is decorative; the accessible
  name comes from the text alone.

## Notes

- Colours were sampled directly from `context/ui-interface.png`, not eyeballed.
- The mockup's hero band and navbar band are near-identical light tones
  (`#eef1ec` vs `#f9faf9`) separated by a hairline border — keep the border.
- jsdom applies no Tailwind and has no layout engine, so the 375px/1440px and
  smooth-scroll criteria are browser-verified; tests cover text, roles, heading
  level, and the anchor target.
