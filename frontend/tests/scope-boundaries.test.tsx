import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";

/**
 * Guards the spec's Out of Scope list. This shell is meant to stay content-free
 * until each region becomes its own feature, so these tests fail the moment
 * real content, images, or nav links get added here by accident.
 */
describe("shell stays content-free", () => {
  it("renders no images", () => {
    const { container } = render(<Home />);
    expect(container.querySelectorAll("img")).toHaveLength(0);
  });

  it("renders no links, including in the nav", () => {
    const { container } = render(<Home />);
    expect(container.querySelectorAll("a")).toHaveLength(0);
  });

  it("renders no headings, since all copy is deferred", () => {
    const { container } = render(<Home />);
    expect(container.querySelectorAll("h1, h2, h3, h4, h5, h6")).toHaveLength(0);
  });

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
