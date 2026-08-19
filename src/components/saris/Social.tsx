import { Youtube, Instagram, Facebook, ArrowUpRight } from "lucide-react";
import { Reveal, SectionHead } from "./Section";
import { TikTokIcon } from "./icons";
import { SOCIAL } from "@/lib/saris";

const platforms = [
  { name: "YouTube", href: SOCIAL.youtube, icon: Youtube, count: "32.4K", label: "Subscribers", desc: "Full reviews, reaction episodes and long-form conversations." },
  { name: "TikTok", href: SOCIAL.tiktok, icon: TikTokIcon, count: "18.9K", label: "Followers", desc: "Fast verdicts, hot takes and the clips people repost." },
  { name: "Instagram", href: SOCIAL.instagram, icon: Instagram, count: "11.2K", label: "Followers", desc: "Behind the scenes, ratings cards and story polls." },
  { name: "Facebook", href: SOCIAL.facebook, icon: Facebook, count: "7.6K", label: "Followers", desc: "Where the comment section becomes its own show." },
];

export function Social() {
  return (
    <section id="follow" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <SectionHead
            kicker="Join In"
            title="Follow the Conversation"
            subtitle="The review doesn't stop here. Join Saris TV across social media."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {platforms.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50">
                <div
                  className="absolute -right-10 -top-10 size-32 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-40"
                  style={{ background: "var(--gradient-accent)" }}
                />
                <div className="relative flex flex-col gap-5">
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl border border-border bg-secondary text-primary">
                    <p.icon size={22} />
                  </span>
                  <div>
                    <p className="font-display text-3xl font-bold">{p.count}</p>
                    <p className="micro-label mt-1 text-muted-foreground">{p.label}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit Saris TV on ${p.name}`}
                    className="font-display mt-2 inline-flex items-center justify-between rounded-full border border-border px-5 py-3 text-sm font-semibold transition-colors duration-200 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"
                  >
                    Follow on {p.name}
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}