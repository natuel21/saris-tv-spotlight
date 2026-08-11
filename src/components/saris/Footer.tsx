import { Youtube, Instagram, Facebook, Music2 } from "lucide-react";

const nav = ["Home", "Reviews", "Videos", "Trending", "About"];
const socials = [Youtube, Music2, Instagram, Facebook];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:px-10 md:py-20">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl font-bold tracking-[-0.04em]">SARIS</span>
            <span className="font-display rounded-md bg-primary px-1.5 py-0.5 text-2xl font-bold tracking-[-0.04em] text-primary-foreground">
              TV
            </span>
          </div>
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
            {socials.map((Icon, i) => (
              <a
                key={i}
                href="#follow"
                aria-label="Saris TV social profile"
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