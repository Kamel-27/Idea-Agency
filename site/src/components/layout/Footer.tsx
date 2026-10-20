import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-line py-9 text-sm text-muted">
      <Container className="flex flex-wrap justify-between gap-3">
        <span>&copy; {siteConfig.name}</span>
        <span>{siteConfig.location}</span>
      </Container>
    </footer>
  );
}
