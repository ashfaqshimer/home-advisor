import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";

/*
  Self-hosted by next/font at build time — no request to Google at runtime.
  Exposed as a CSS variable rather than a className so Tailwind's `font-serif`
  utility can point at it from `@theme`; see --font-serif in globals.css.
  Lora is variable (400-700), so no `weight` is needed.
*/
const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "Home Advisor — Property in Colombo and across Sri Lanka",
  description:
    "AI-guided property search across Sri Lanka's top locations. Tell us what you're looking for and we'll find the right address.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full ${lora.variable}`}>
      <body className="flex min-h-full flex-col font-sans text-neutral-900 antialiased">
        {children}
      </body>
    </html>
  );
}
