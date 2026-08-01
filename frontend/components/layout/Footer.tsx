import Placeholder from "@/components/Placeholder";
import Container from "@/components/layout/Container";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-100/50">
      <Container className="py-12 sm:py-14">
        {/* Brand takes half the row; contact and follow split the rest. */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
          <Placeholder label="Brand / blurb" className="h-28 lg:col-span-2" />
          <Placeholder label="Contact" className="h-28" />
          <Placeholder label="Follow" className="h-28" />
        </div>
        <Placeholder label="Bottom bar" className="mt-10 h-10" />
      </Container>
    </footer>
  );
}
