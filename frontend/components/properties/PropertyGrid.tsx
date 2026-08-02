import PropertyCard from "@/components/properties/PropertyCard";
import { FEATURED_PROPERTIES } from "@/lib/properties";

export default function PropertyGrid() {
  return (
    <section
      id="featured-properties"
      /*
        Named by the heading rather than an aria-label, so the section's
        accessible name isn't declared in two places that can drift apart.
      */
      aria-labelledby="featured-properties-heading"
      className="flex scroll-mt-24 flex-col gap-8"
    >
      <div className="flex flex-col gap-3">
        {/* Typed in sentence case and uppercased in CSS, so a screen reader
            reads a phrase rather than spelling out initialisms. */}
        <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">
          Handpicked for you
        </p>

        <h2
          id="featured-properties-heading"
          className="font-display text-3xl leading-tight text-ink sm:text-4xl"
        >
          Featured properties
        </h2>

        <p className="max-w-md text-sm leading-relaxed text-muted">
          A curated selection across Colombo and the wider island — from city
          apartments to coastal retreats.
        </p>
      </div>

      {/*
        Cards pair up from `sm`. They stay two-up inside the narrower `lg`
        column too — three-up would squeeze them below a usable width.
      */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {FEATURED_PROPERTIES.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
}
