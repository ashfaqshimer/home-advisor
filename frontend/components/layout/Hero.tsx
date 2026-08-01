import Placeholder from "@/components/Placeholder";
import Container from "@/components/layout/Container";

export default function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="border-b border-neutral-200 bg-neutral-100/50"
    >
      <Container className="py-16 sm:py-24">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-5">
          <Placeholder label="Eyebrow badge" className="h-7 w-64 max-w-full" />
          <Placeholder label="Headline" className="h-24 w-full sm:h-32" />
          <Placeholder label="Subcopy" className="h-12 w-full max-w-md" />
          <Placeholder label="Hero CTA" className="h-11 w-52 max-w-full" />
        </div>
      </Container>
    </section>
  );
}
