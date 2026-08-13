import { AlertTriangle, Youtube } from "lucide-react";
import { CHANNEL_URL } from "@/lib/saris";
import { timeAgo } from "@/lib/format";

export function ContentProblem({
  lastUpdated,
  error,
}: {
  lastUpdated: string | null | undefined;
  error: string | null | undefined;
}) {
  return (
    <div className="rounded-3xl border border-border bg-surface p-8 text-center">
      <AlertTriangle className="mx-auto mb-4 text-accent" size={28} />
      <p className="font-display text-lg font-semibold">
        We&apos;re having trouble refreshing the latest videos.
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        {lastUpdated
          ? `Showing cached data. Last updated ${timeAgo(lastUpdated)}.`
          : "No Saris TV content has been loaded yet."}
      </p>
      {error ? <p className="mt-1 text-xs text-muted-foreground">{error}</p> : null}
      <a
        href={CHANNEL_URL}
        target="_blank"
        rel="noreferrer noopener"
        className="font-display mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
      >
        <Youtube size={16} />
        Watch Saris TV on YouTube
      </a>
    </div>
  );
}