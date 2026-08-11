import { useEffect, useState } from "react";
import { Menu, Search, X, Youtube, Instagram, Play } from "lucide-react";

const links = ["Home", "Reviews", "Trending", "Videos", "About"];

const hrefFor = (l: string) => (l === "Home" ? "#top" : `#${l.toLowerCase()}`);

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
        <a href="#top" className="flex items-center gap-2">
          <span className="font-display text-xl font-bold tracking-[-0.04em] md:text-2xl">
            SARIS
          </span>
          <span className="font-display rounded-md bg-primary px-1.5 py-0.5 text-xl font-bold tracking-[-0.04em] text-primary-foreground md:text-2xl">
            TV
          </span>
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <a key={l} href={hrefFor(l)} className="nav-link font-display text-sm font-medium">
              {l}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <button
            aria-label="Search"
            className="hidden size-10 items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 hover:bg-secondary hover:text-foreground md:inline-flex"
          >
            <Search size={18} />
          </button>
          <div className="hidden items-center gap-1 xl:flex">
            {[Youtube, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#follow"
                aria-label="Social profile"
                className="inline-flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 hover:bg-secondary hover:text-foreground"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
          <a
            href="#videos"
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
              key={l}
              href={hrefFor(l)}
              onClick={() => setOpen(false)}
              className="font-display block border-b border-border/60 py-4 text-lg font-semibold"
            >
              {l}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}