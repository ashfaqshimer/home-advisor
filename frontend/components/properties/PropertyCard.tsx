import Placeholder from "@/components/Placeholder";

/**
 * Takes no props yet — it renders a fixed-size skeleton so grid rows have a
 * realistic height. Property data arrives when this becomes its own feature.
 */
export default function PropertyCard() {
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-neutral-200 p-3">
      <Placeholder label="Image" className="aspect-4/3 w-full" />
      <Placeholder label="Title / price" className="h-10" />
      <Placeholder label="Description" className="h-10" />
      <Placeholder label="Meta" className="h-8" />
    </article>
  );
}
