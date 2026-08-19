const TEXT =
  "የቤት ባለቤት ይሁኑ  ታላቅ ቅናሽ ከሁዳ ፕሮፐርቲስ  በቦሌ | 24 ሳይት የቤት ባለቤት ይሁኑ ለበለጠ መረጃ 0912144789 0919415875";

/** Seamless right-to-left announcement banner. Only used inside the Promotion section. */
export function PromoMarquee() {
  return (
    <div
      className="saris-marquee mt-12 overflow-hidden rounded-2xl border border-white/10 py-3.5 backdrop-blur-sm"
      style={{ backgroundColor: "rgba(0, 85, 91, 0.85)" }}
    >
      <div className="saris-marquee-track flex w-max">
        {[0, 1].map((i) => (
          <span
            key={i}
            aria-hidden={i === 1}
            className="whitespace-nowrap px-8 text-base font-semibold tracking-wide text-white md:text-lg"
          >
            {TEXT}
            <span className="px-8">•</span>
            {TEXT}
            <span className="px-8">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
