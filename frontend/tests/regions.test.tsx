import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ChatPanel from "@/components/chat/ChatPanel";
import Footer from "@/components/layout/Footer";
import PropertyGrid from "@/components/properties/PropertyGrid";

/**
 * `getByText` matches the label <span> inside a Placeholder; the classes under
 * test live on its parent <div>. This resolves the region itself.
 */
function region(label: string): HTMLElement {
  const parent = screen.getByText(label).parentElement;
  if (!parent) throw new Error(`Placeholder "${label}" has no parent element`);
  return parent;
}

// The property grid is no longer a placeholder region — its header, cards, and
// fixture data are covered by `property-grid.test.tsx`. Only its place in the
// shell is asserted here, alongside the other regions' layout guards.
describe("PropertyGrid", () => {
  it("is the target of the header's Listings link", () => {
    render(<PropertyGrid />);
    const section = screen.getByRole("region", { name: "Featured properties" });

    expect(section).toHaveAttribute("id", "featured-properties");
    // Class guard: without it an anchor jump parks the section flush against
    // the top edge. jsdom cannot verify the resulting offset.
    expect(section).toHaveClass("scroll-mt-24");
  });
});

describe("ChatPanel", () => {
  it("renders header, message list, chips, and input regions", () => {
    render(<ChatPanel />);

    for (const label of [
      "Agent header",
      "Message list (scrolls)",
      "Prompt chips",
      "Chat input",
    ]) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it("is a focusable target for the header CTA", () => {
    render(<ChatPanel />);
    const panel = screen.getByRole("region", { name: "AI agent chat" });

    expect(panel).toHaveAttribute("id", "chat");
    // Without tabIndex a #chat jump moves the viewport but not keyboard focus.
    expect(panel).toHaveAttribute("tabindex", "-1");
    // Scroll margin matches the sticky inset so the panel lands where it settles.
    expect(panel).toHaveClass("scroll-mt-panel-inset");
  });

  it("has no interactive chat controls yet", () => {
    const { container } = render(<ChatPanel />);

    expect(container.querySelectorAll("input, textarea, button")).toHaveLength(0);
  });

  it("caps its height and scrolls the message region when sticky", () => {
    render(<ChatPanel />);

    // Class-presence guards. A sticky box taller than the viewport can never
    // scroll to its own bottom, so losing either of these silently breaks the
    // panel at `lg`. Real behaviour is browser-verified, not asserted here.
    expect(screen.getByRole("region", { name: "AI agent chat" })).toHaveClass(
      "lg:sticky",
      "lg:top-panel-inset",
      "lg:max-h-panel-max",
    );
    expect(region("Message list (scrolls)")).toHaveClass(
      "lg:overflow-y-auto",
      "lg:min-h-0",
    );
  });
});

// Navbar's own tests live in `navbar.test.tsx` — content, links, and the mobile
// menu. Only its place in the shell is asserted here.

// The footer is no longer a placeholder region — its content, links, and
// headings are covered by `footer.test.tsx`. Only its grid shape is asserted
// here, alongside the other regions' layout guards.
describe("Footer", () => {
  it("is the target of the header's Contact link", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");

    expect(footer).toHaveAttribute("id", "contact");
    // Class guard: without it an anchor jump parks the footer flush against the
    // top edge. jsdom cannot verify the resulting offset.
    expect(footer).toHaveClass("scroll-mt-24");
  });

  it("gives the brand column double width so the row reads as three columns", () => {
    render(<Footer />);

    // Class-presence guard, not a layout assertion — jsdom computes no columns.
    const brand = within(screen.getByRole("contentinfo"))
      .getByText("Home Advisor")
      .closest("div");

    expect(brand).toHaveClass("lg:col-span-2");
  });
});
