import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { timeAgo } from "@/lib/format";

/** Shows the REAL last successful YouTube refresh — never a fake "live" animation. */
export function LiveStatus({
  lastUpdated,
  isFetching,
  onRefresh,
}: {
  lastUpdated: string | null | undefined;
  isFetching: boolean;
  onRefresh?: () => void;
}) {
  const [, tick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => tick((n) => n + 1), 30_000);
    return () => clearInterval(t);
  }, []);

  const fresh = lastUpdated ? Date.now() - new Date(lastUpdated).getTime() < 10 * 60_000 : false;

  return (
    <button
      type="button"
      onClick={onRefresh}
      className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-4 py-2 transition-colors duration-200 hover:border-primary/50"
    >
      <span className="relative flex size-2">
        {fresh && !isFetching ? (
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-70" />
        ) : null}
        <span
          className={`relative inline-flex size-2 rounded-full ${fresh ? "bg-primary" : "bg-muted-foreground"}`}
        />
      </span>
      <span className="micro-label text-muted-foreground">
        {isFetching
          ? "Updating…"
          : lastUpdated
            ? `Updated ${timeAgo(lastUpdated)}`
            : "Waiting for YouTube data"}
      </span>
      <RefreshCw size={13} className={`text-muted-foreground ${isFetching ? "animate-spin" : ""}`} />
    </button>
  );
}