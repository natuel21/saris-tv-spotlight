import { useEffect, useState } from "react";
import { Menu, X, Youtube, Instagram, Facebook, Play } from "lucide-react";
import logo from "@/assets/saris-logo-new.png.asset.json";
import { SOCIAL } from "@/lib/saris";
import { TikTokIcon } from "./icons";

const links = [
  { label: "Home", href: "#top" },
  { label: "Latest", href: "#reviews" },
  { label: "Trending", href: "#trending" },
  { label: "Promote", href: "#promote" },
  { label: "Promotions", href: "#promotions" },
  { label: "About", href: "#about" },
];

export const SOCIAL_LINKS = [
  { key: "youtube", href: SOCIAL.youtube, label: "YouTube", Icon: Youtube },
  { key: "instagram", href: SOCIAL.instagram, label: "Instagram", Icon: Instagram },
  { key: "facebook", href: SOCIAL.facebook, label: "Facebook", Icon: Facebook },
  { key: "tiktok", href: SOCIAL.tiktok, label: "TikTok", Icon: TikTokIcon },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:h-20 md:px-10">
        <a href="#top" className="flex items-center py-1.5 pr-3">
          <img
            src={logo.url}
            alt="Saris TV logo"
            width={706}
            height={353}
            className="h-9 w-auto md:h-12"
          />
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="nav-link font-display text-sm font-medium">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden items-center gap-1 md:flex">
            {SOCIAL_LINKS.map(({ key, Icon, href, label }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit Saris TV on ${label}`}
                title={`Visit Saris TV on ${label}`}
                className="inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-all duration-200 hover:scale-110 hover:bg-secondary hover:text-primary"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
          <a
            href={SOCIAL.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:scale-[1.04] md:px-5"
          >
            <Play size={14} className="fill-current" strokeWidth={0} />
            Watch Now
          </a>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-border bg-background/95 px-5 pb-6 pt-2 backdrop-blur-xl lg:hidden">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display block border-b border-border/60 py-4 text-lg font-semibold"
            >
              {l.label}
            </a>
          ))}
          <div className="flex gap-2 pt-5 md:hidden">
            {SOCIAL_LINKS.map(({ key, Icon, href, label }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit Saris TV on ${label}`}
                className="inline-flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
