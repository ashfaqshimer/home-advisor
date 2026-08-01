import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Navbar from "@/components/layout/Navbar";
import { CHAT_HREF, NAV_LINKS } from "@/components/layout/nav-links";

/**
 * SCOPE LIMIT: jsdom applies no CSS, so nothing here proves the header *looks*
 * right — which items are visible at 375px vs 1440px is a browser check. Class
 * assertions below are deletion guards only.
 *
 * `fireEvent` rather than user-event: the interactions under test are a click, a
 * keydown, and a pointerdown, and fireEvent covers those without pulling in
 * another dependency. Note that `fireEvent.click` does not emit `pointerdown`,
 * which is what keeps the outside-click listener from firing on the toggle.
 */

/**
 * The desktop link row. Resolved as the nav's direct-child list so it stays
 * unambiguous when the mobile panel — whose list sits deeper — is open.
 */
function desktopRow(): HTMLElement {
  const nav = screen.getByRole("navigation", { name: "Main" });
  const row = nav.querySelector<HTMLElement>(":scope > ul");
  if (!row) throw new Error("no direct-child <ul> found in the Main nav");
  return row;
}

function menuButton(): HTMLElement {
  return screen.getByRole("button", { name: /menu/i });
}

function openPanel(): HTMLElement {
  fireEvent.click(menuButton());
  const id = menuButton().getAttribute("aria-controls");
  const panel = document.getElementById(id ?? "");
  if (!panel) throw new Error("menu button's aria-controls target is not in the DOM");
  return panel;
}

describe("Navbar brand", () => {
  it("links home under the brand name", () => {
    render(<Navbar />);

    const brand = screen.getByRole("link", { name: /Terra & Co\./ });
    expect(brand).toHaveAttribute("href", "/");
  });

  it("renders the wordmark in the serif display face", () => {
    render(<Navbar />);

    // Class guard: proves the token is still applied, not that Lora loaded.
    expect(screen.getByText("Terra & Co.")).toHaveClass("font-serif");
  });

  it("hides the letter mark from assistive tech, since the wordmark names it", () => {
    render(<Navbar />);

    const brand = screen.getByRole("link", { name: /Terra & Co\./ });
    expect(within(brand).getByText("T")).toHaveAttribute("aria-hidden", "true");
  });
});

describe("Navbar navigation", () => {
  it("renders every nav link with its in-page anchor", () => {
    render(<Navbar />);
    const row = desktopRow();

    for (const { href, label } of NAV_LINKS) {
      expect(within(row).getByRole("link", { name: label })).toHaveAttribute(
        "href",
        href,
      );
    }
  });

  it("marks Home as the current page", () => {
    render(<Navbar />);

    expect(
      within(desktopRow()).getByRole("link", { name: "Home" }),
    ).toHaveAttribute("aria-current", "page");
  });

  it("nests the links in one Main nav landmark", () => {
    render(<Navbar />);

    // Single landmark even with the panel open — the panel deliberately has no
    // <nav> of its own.
    openPanel();
    expect(screen.getAllByRole("navigation")).toHaveLength(1);
  });
});

describe("Navbar CTA", () => {
  it("points at the chat panel anchor", () => {
    render(<Navbar />);

    const cta = within(screen.getByRole("navigation", { name: "Main" })).getByRole(
      "link",
      { name: "Chat with our AI Agent" },
    );
    expect(cta).toHaveAttribute("href", CHAT_HREF);
  });

  it("is a link, not a button — it navigates rather than opening a session", () => {
    render(<Navbar />);

    expect(
      screen.queryByRole("button", { name: "Chat with our AI Agent" }),
    ).not.toBeInTheDocument();
  });
});

describe("Navbar responsive slots", () => {
  it("swaps the menu button for the inline links and CTA at md", () => {
    render(<Navbar />);

    // Class guards. jsdom cannot evaluate breakpoints; losing any of these
    // silently doubles up or hides the whole right-hand side of the header.
    expect(desktopRow()).toHaveClass("hidden", "md:flex");
    expect(screen.getByRole("link", { name: "Chat with our AI Agent" })).toHaveClass(
      "hidden",
      "md:inline-flex",
    );
    expect(menuButton().parentElement).toHaveClass("md:hidden");
  });

  it("keeps the brand visible at every width", () => {
    render(<Navbar />);

    expect(screen.getByRole("link", { name: /Terra & Co\./ })).not.toHaveClass(
      "hidden",
    );
  });
});

describe("Navbar mobile menu", () => {
  it("starts closed, with no panel in the DOM", () => {
    render(<Navbar />);

    expect(menuButton()).toHaveAttribute("aria-expanded", "false");
    expect(menuButton()).toHaveAccessibleName("Open menu");
    // Absent, not merely hidden — hidden links stay tabbable.
    expect(document.getElementById("mobile-nav-panel")).toBeNull();
  });

  it("opens a panel holding the nav links and the CTA", () => {
    render(<Navbar />);
    const panel = openPanel();

    expect(menuButton()).toHaveAttribute("aria-expanded", "true");
    expect(menuButton()).toHaveAccessibleName("Close menu");
    for (const { label } of NAV_LINKS) {
      expect(within(panel).getByRole("link", { name: label })).toBeInTheDocument();
    }
    expect(
      within(panel).getByRole("link", { name: "Chat with our AI Agent" }),
    ).toBeInTheDocument();
  });

  it("closes when the button is pressed again", () => {
    render(<Navbar />);
    openPanel();

    fireEvent.click(menuButton());

    expect(menuButton()).toHaveAttribute("aria-expanded", "false");
    expect(document.getElementById("mobile-nav-panel")).toBeNull();
  });

  it("closes on Escape and returns focus to the button", () => {
    render(<Navbar />);
    openPanel();

    fireEvent.keyDown(document, { key: "Escape" });

    expect(document.getElementById("mobile-nav-panel")).toBeNull();
    // Focus would otherwise be stranded on a node that just left the DOM.
    expect(menuButton()).toHaveFocus();
  });

  it("ignores keys other than Escape", () => {
    render(<Navbar />);
    openPanel();

    fireEvent.keyDown(document, { key: "a" });

    expect(menuButton()).toHaveAttribute("aria-expanded", "true");
  });

  it("closes when a link inside it is followed", () => {
    render(<Navbar />);
    const panel = openPanel();

    fireEvent.click(within(panel).getByRole("link", { name: "Listings" }));

    expect(document.getElementById("mobile-nav-panel")).toBeNull();
  });

  it("closes when the CTA inside it is followed", () => {
    render(<Navbar />);
    const panel = openPanel();

    fireEvent.click(
      within(panel).getByRole("link", { name: "Chat with our AI Agent" }),
    );

    expect(document.getElementById("mobile-nav-panel")).toBeNull();
  });

  it("closes on a pointer press outside it", () => {
    render(<Navbar />);
    openPanel();

    fireEvent.pointerDown(document.body);

    expect(document.getElementById("mobile-nav-panel")).toBeNull();
  });

  it("stays open on a pointer press inside it", () => {
    render(<Navbar />);
    const panel = openPanel();

    fireEvent.pointerDown(panel);

    expect(menuButton()).toHaveAttribute("aria-expanded", "true");
  });
});
