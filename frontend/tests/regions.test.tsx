import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ChatPanel from "@/components/chat/ChatPanel";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PropertyCard from "@/components/properties/PropertyCard";
import PropertyGrid, {
  PLACEHOLDER_CARD_COUNT,
} from "@/components/properties/PropertyGrid";

/**
 * `getByText` matches the label <span> inside a Placeholder; the classes under
 * test live on its parent <div>. This resolves the region itself.
 */
function region(label: string): HTMLElement {
  const parent = screen.getByText(label).parentElement;
  if (!parent) throw new Error(`Placeholder "${label}" has no parent element`);
  return parent;
}

describe("PropertyGrid", () => {
  it("renders one card per PLACEHOLDER_CARD_COUNT", () => {
    const { container } = render(<PropertyGrid />);

    // Asserted against the constant, not a literal, so the grid keeps working
    // when the count changes — including to an odd number.
    expect(container.querySelectorAll("article")).toHaveLength(
      PLACEHOLDER_CARD_COUNT,
    );
  });

  it("renders the section header regions above the cards", () => {
    render(<PropertyGrid />);

    for (const label of ["Eyebrow", "Section heading", "Section subcopy"]) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });
});

describe("PropertyCard", () => {
  it("has an image region above three shorter text regions", () => {
    render(<PropertyCard />);

    for (const label of ["Image", "Title / price", "Description", "Meta"]) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it("keeps the image region on a fixed aspect ratio so rows have real height", () => {
    render(<PropertyCard />);

    // Class-presence guard, not a layout assertion — jsdom cannot compute the
    // resulting box. Catches accidental removal of the ratio.
    expect(region("Image")).toHaveClass("aspect-4/3");
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

describe("Navbar", () => {
  it("swaps the menu slot for inline links at the md breakpoint", () => {
    render(<Navbar />);

    expect(region("Menu")).toHaveClass("md:hidden");
    expect(region("Nav links")).toHaveClass("hidden", "md:block");
    expect(region("Header CTA")).toHaveClass("hidden", "md:block");
  });

  it("shows the logo at every width", () => {
    render(<Navbar />);

    expect(region("Logo")).not.toHaveClass("hidden");
  });
});

describe("Footer", () => {
  it("has three content columns plus a bottom bar", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");
    for (const label of ["Brand / blurb", "Contact", "Follow", "Bottom bar"]) {
      expect(within(footer).getByText(label)).toBeInTheDocument();
    }
  });

  it("gives the brand column double width so the row reads as three columns", () => {
    render(<Footer />);

    expect(region("Brand / blurb")).toHaveClass("lg:col-span-2");
  });
});
