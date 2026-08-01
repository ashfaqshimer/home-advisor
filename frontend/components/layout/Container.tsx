/**
 * Shared max-width wrapper. Keeps the navbar, hero, main, and footer on one
 * horizontal alignment — every full-bleed band puts its content in this.
 * Width comes from the `--container-page` token in globals.css.
 */
export default function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-page px-4 sm:px-6 ${className}`}>
      {children}
    </div>
  );
}
