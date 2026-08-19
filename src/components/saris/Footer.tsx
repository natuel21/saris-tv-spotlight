import { Phone, Mail } from "lucide-react";
import logo from "@/assets/saris-logo-new.png.asset.json";
import { CONTACT } from "@/lib/saris";
import { SOCIAL_LINKS } from "./Nav";

const nav = ["Home", "Reviews", "Videos", "Trending", "About"];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-10 md:py-20">
        <div>
          <img src={logo.url} alt="Saris TV logo" width={706} height={353} className="h-14 w-auto" />
          <p className="mt-5 max-w-xs text-sm text-muted-foreground">
            Saris TV is an Ethiopian digital media platform covering business, entrepreneurship,
            entertainment, lifestyle and opportunities.
          </p>
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
          <p className="micro-label mb-5 text-primary">Contact</p>
          <div className="flex flex-col gap-3">
            <a
              href={`tel:${CONTACT.phone}`}
              aria-label="Call Saris TV"
              className="font-display inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
            >
              <Phone size={16} />
              {CONTACT.phoneDisplay}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              aria-label="Email Saris TV"
              className="font-display inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
            >
              <Mail size={16} />
              {CONTACT.email}
            </a>
          </div>
        </div>

        <div>
          <p className="micro-label mb-5 text-primary">Follow Saris TV</p>
          <div className="flex flex-wrap gap-3">
            {SOCIAL_LINKS.map(({ key, Icon, href, label }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit Saris TV on ${label}`}
                title={`Visit Saris TV on ${label}`}
                className="inline-flex size-12 items-center justify-center rounded-2xl border border-border transition-all duration-200 hover:scale-105 hover:border-primary hover:bg-primary hover:text-primary-foreground"
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
