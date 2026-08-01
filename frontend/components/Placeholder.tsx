/**
 * TEMPORARY — layout scaffolding only.
 *
 * Marks out an empty region so the page structure is visible in a browser
 * before any real content exists. Every usage gets replaced as each region
 * becomes its own feature; when the last one goes, delete this file.
 */
export default function Placeholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-lg border border-dashed border-neutral-300 bg-neutral-50 ${className}`}
    >
      {/*
        `left/right` inset plus `w-fit` shrink-wraps the chip but still caps it
        at the region width, so a long label truncates instead of forcing
        horizontal overflow in the narrow chat and card columns.
      */}
      <span className="absolute top-1.5 right-1.5 left-1.5 w-fit truncate rounded bg-neutral-200/70 px-1.5 font-mono text-xs tracking-wide text-neutral-500 uppercase">
        {label}
      </span>
    </div>
  );
}
