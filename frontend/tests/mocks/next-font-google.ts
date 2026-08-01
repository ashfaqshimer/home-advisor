/**
 * Stand-in for `next/font/google` under Vitest.
 *
 * The real module is not callable on its own — Next's SWC plugin rewrites
 * `Lora({...})` at build time into a self-hosted font loader. Vitest runs the
 * source without that transform, so importing `app/layout.tsx` (which any test
 * touching `metadata` or the full page does) throws "Lora is not a function".
 *
 * Aliased in `vitest.config.mts`. Fonts are exported by name on purpose rather
 * than through a Proxy: adding a font should fail here loudly and get one line,
 * not silently resolve to something untested.
 */
type FontOptions = { variable?: string };

type FontResult = {
  className: string;
  variable: string;
  style: { fontFamily: string };
};

function stubFont(family: string) {
  return ({ variable }: FontOptions = {}): FontResult => ({
    className: `mock-font-${family}`,
    // The real value is a generated class that declares the CSS variable. Tests
    // must not assert on its contents — only that it lands on <html>.
    variable: variable ? `mock-font-variable-${family}` : "",
    style: { fontFamily: family },
  });
}

export const Lora = stubFont("Lora");
