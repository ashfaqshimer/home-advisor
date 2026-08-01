import Placeholder from "@/components/Placeholder";
import PropertyCard from "@/components/properties/PropertyCard";

/**
 * Card count is arbitrary scaffolding — the grid must not depend on it being
 * even. Change this number to sanity-check odd counts and short pages.
 */
export const PLACEHOLDER_CARD_COUNT = 8;

export default function PropertyGrid() {
  return (
    <section aria-label="Featured properties" className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <Placeholder label="Eyebrow" className="h-6 w-40 max-w-full" />
        <Placeholder label="Section heading" className="h-10 w-72 max-w-full" />
        <Placeholder label="Section subcopy" className="h-10 w-full max-w-md" />
      </div>

      {/*
        Cards pair up from `sm`. They stay two-up inside the narrower `lg`
        column too — three-up would squeeze them below a usable width.
      */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {Array.from({ length: PLACEHOLDER_CARD_COUNT }, (_, i) => (
          <PropertyCard key={i} />
        ))}
      </div>
    </section>
  );
}
