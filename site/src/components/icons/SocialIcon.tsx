import { siFacebook, siInstagram, siTiktok } from "simple-icons";

// Brand icons drawn in the current text color (use text-ink, text-white, ...).
// Instagram, TikTok and Facebook come from the simple-icons package.
// LinkedIn is not in that package, so its glyph is drawn here by hand.

const paths = {
  instagram: siInstagram.path,
  tiktok: siTiktok.path,
  facebook: siFacebook.path,
  linkedin:
    "M20.45 0H3.55A3.55 3.55 0 0 0 0 3.55v16.9A3.55 3.55 0 0 0 3.55 24h16.9A3.55 3.55 0 0 0 24 20.45V3.55A3.55 3.55 0 0 0 20.45 0ZM7.1 20.1H3.6V9h3.5ZM5.35 7.5a2 2 0 1 1 0-4.05 2 2 0 0 1 0 4.05ZM20.4 20.1h-3.5v-5.4c0-1.3 0-2.95-1.8-2.95s-2.07 1.4-2.07 2.86v5.5H9.5V9h3.35v1.52h.05a3.68 3.68 0 0 1 3.3-1.8c3.53 0 4.2 2.32 4.2 5.35Z",
};

export type SocialNetwork = keyof typeof paths;

type SocialIconProps = {
  network: SocialNetwork;
  className?: string;
};

export function SocialIcon({ network, className = "" }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d={paths[network]} />
    </svg>
  );
}
