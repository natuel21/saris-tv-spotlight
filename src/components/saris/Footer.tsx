import { Youtube, Instagram, Facebook, Music2 } from "lucide-react";
import logo from "@/assets/saris-logo.png.asset.json";
import { SOCIAL } from "@/lib/saris";

const nav = ["Home", "Reviews", "Videos", "Trending", "About"];
const socials = [
  { Icon: Youtube, href: SOCIAL.youtube, label: "YouTube" },
  { Icon: Music2, href: SOCIAL.tiktok, label: "TikTok" },
  { Icon: Instagram, href: SOCIAL.instagram, label: "Instagram" },
  { Icon: Facebook, href: SOCIAL.facebook, label: "Facebook" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:px-10 md:py-20">
        <div>
          <img src={logo.url} alt="Saris TV logo" width={320} height={160} className="h-12 w-auto" />
          <p className="micro-label mt-4 text-muted-foreground">Watch. Think. Talk.</p>
        </div>

        <nav className="flex flex-col gap-3">
          <p className="micro-label mb-2 text-primary">Explore</p>
          {nav.map((n) => (
            <a
              key={n}
              href={n === "Home" ? "#top" : `#${n.toLowerCase()}`}
              className="font-display text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {n}
            </a>
          ))}
        </nav>

        <div>
          <p className="micro-label mb-5 text-primary">Follow</p>
          <div className="flex gap-3">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Saris TV on ${label}`}
                className="inline-flex size-12 items-center justify-center rounded-2xl border border-border transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-5 py-6 md:px-10">
          <p className="micro-label text-muted-foreground">© 2026 Saris TV. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}