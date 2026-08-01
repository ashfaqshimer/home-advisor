import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";

/**
 * Guards the spec's Out of Scope list. The regions that are still placeholders
 * — navbar, hero, property grid, chat panel — must stay content-free until each
 * becomes its own feature, so these fail the moment real content, images, or
 * nav links get added to them by accident.
 *
 * The footer is excluded: it is built, and its own content is covered by
 * `footer.test.tsx`. As each remaining region ships, add it to BUILT_REGIONS —
 * do not weaken the assertions, or they stop guarding anything.
 */
const BUILT_REGIONS = ["footer"];

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

  it("renders no links, including in the nav", () => {
    expect(unbuiltShell().querySelectorAll("a")).toHaveLength(0);
  });

  it("renders no headings, since all copy is deferred", () => {
    expect(
      unbuiltShell().querySelectorAll("h1, h2, h3, h4, h5, h6"),
    ).toHaveLength(0);
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
