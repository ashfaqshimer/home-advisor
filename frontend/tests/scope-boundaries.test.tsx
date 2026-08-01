import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";

/**
 * Guards the current feature's Out of Scope list. The hero is real now; every
 * other region — navbar, property grid, chat panel, footer — is still meant to
 * be a placeholder, so these tests fail the moment content leaks into one.
 *
 * Each shipped region relaxes a bound here. Tighten the expected counts as
 * regions land rather than deleting the assertion.
 */
describe("shell stays content-free outside the hero", () => {
  it("renders no images", () => {
    const { container } = render(<Home />);
    expect(container.querySelectorAll("img")).toHaveLength(0);
  });

  it("renders exactly one link — the hero CTA — and none in the nav", () => {
    const { container } = render(<Home />);

    const links = Array.from(container.querySelectorAll("a"));
    expect(links.map((a) => a.getAttribute("href"))).toEqual(["#chat"]);
    expect(container.querySelectorAll("nav a")).toHaveLength(0);
  });

  it("renders the hero h1 and no other heading, since the rest is deferred", () => {
    const { container } = render(<Home />);

    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(container.querySelectorAll("h2, h3, h4, h5, h6")).toHaveLength(0);
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
