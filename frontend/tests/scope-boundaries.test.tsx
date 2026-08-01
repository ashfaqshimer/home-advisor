import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";

/**
 * Guards the still-unbuilt regions. Hero, property cards, chat panel, and footer
 * are meant to stay content-free until each becomes its own feature, so these
 * tests fail the moment real content, images, or links get added there.
 *
 * SCOPE: the header is excluded — it is real content as of the site-header
 * feature, and its links and wordmark are covered by `navbar.test.tsx`. As each
 * remaining region ships, drop it from this guard rather than loosening the
 * assertion.
 */
/**
 * The page's top-level children are header/section/main/footer, so dropping the
 * header leaves exactly the regions still under guard. Searching each one's
 * subtree is enough — a region element is never itself an img/a/heading.
 */
function queryAllOutsideHeader(selector: string): Element[] {
  const { container } = render(<Home />);
  const header = screen.getByRole("banner");

  return Array.from(container.children)
    .filter((region) => region !== header)
    .flatMap((region) => Array.from(region.querySelectorAll(selector)));
}

describe("unbuilt regions stay content-free", () => {
  it("renders no images", () => {
    expect(queryAllOutsideHeader("img")).toHaveLength(0);
  });

  it("renders no links", () => {
    expect(queryAllOutsideHeader("a")).toHaveLength(0);
  });

  it("renders no headings, since all copy is deferred", () => {
    expect(queryAllOutsideHeader("h1, h2, h3, h4, h5, h6")).toHaveLength(0);
  });
});

describe("shell carries no create-next-app boilerplate", () => {
  it("has none of the default template copy", () => {
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
