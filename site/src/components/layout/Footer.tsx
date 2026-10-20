import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-line py-9 text-sm text-muted">
      <Container>
        <span dir="ltr">&copy; {siteConfig.name}</span>
      </Container>
    </footer>
  );
}
