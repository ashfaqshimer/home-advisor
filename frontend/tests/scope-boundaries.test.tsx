import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";

/**
 * Guards the spec's Out of Scope list: anything outside a shipped region must
 * stay content-free, so these fail the moment real content, images, or links
 * get added to the shell by accident.
 *
 * Every region has now shipped, so what is left is the bare page scaffolding.
 * Built regions are excluded; their own content is covered by their own test
 * files. As each new region ships, add it to BUILT_REGIONS — do not weaken the
 * assertions, or they stop guarding anything.
 */
const BUILT_REGIONS = [
  "footer",
  "header",
  "section[aria-labelledby='hero-heading']",
  "section[aria-labelledby='featured-properties-heading']",
  "section#chat",
];

/** The rendered page with every built region removed. */
function unbuiltShell(): HTMLElement {
  const { container } = render(<Home />);
  const shell = container.cloneNode(true) as HTMLElement;

  for (const selector of BUILT_REGIONS) {
    shell.querySelectorAll(selector).forEach((el) => el.remove());
  }
  return shell;
}

describe("unbuilt regions stay content-free", () => {
  it("renders no images", () => {
    expect(unbuiltShell().querySelectorAll("img")).toHaveLength(0);
  });

  it("renders no links", () => {
    expect(unbuiltShell().querySelectorAll("a")).toHaveLength(0);
  });

  it("renders no headings, since all copy is deferred", () => {
    expect(
      unbuiltShell().querySelectorAll("h1, h2, h3, h4, h5, h6"),
    ).toHaveLength(0);
  });

  it("strips a region for every selector in BUILT_REGIONS", () => {
    const { container } = render(<Home />);

    // Without this, a typo'd or stale selector silently strips nothing and the
    // assertions above quietly pass by testing content that is still there.
    for (const selector of BUILT_REGIONS) {
      expect(container.querySelectorAll(selector).length).toBeGreaterThan(0);
    }
  });
});

describe("whole page", () => {
  it("carries no create-next-app boilerplate text", () => {
    const { container } = render(<Home />);
    const text = container.textContent ?? "";

    for (const phrase of [
      "Get started",
      "Deploy Now",
      "Documentation",
      "nextjs.org",
      "vercel",
    ]) {
      expect(text.toLowerCase()).not.toContain(phrase.toLowerCase());
    }
  });
});
