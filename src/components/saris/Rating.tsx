import { Star, StarHalf } from "lucide-react";

export type Verdict = "MUST WATCH" | "WORTH IT" | "MIXED" | "SKIP IT";

export function Rating({ value, size = 16 }: { value: number; size?: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.25;
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5 text-primary">
        {Array.from({ length: 5 }).map((_, i) => {
          if (i < full)
            return <Star key={i} size={size} className="fill-current" strokeWidth={0} />;
          if (i === full && half)
            return <StarHalf key={i} size={size} className="fill-current" strokeWidth={0} />;
          return <Star key={i} size={size} className="text-muted-foreground/35" strokeWidth={1.5} />;
        })}
      </div>
      <span className="font-display text-sm font-semibold text-foreground">
        {value.toFixed(1)}
        <span className="text-muted-foreground">/5</span>
      </span>
    </div>
  );
}

const verdictClass: Record<Verdict, string> = {
  "MUST WATCH": "border-primary/50 bg-primary/15 text-primary",
  "WORTH IT": "border-primary/25 bg-primary/8 text-primary/90",
  MIXED: "border-border bg-secondary text-muted-foreground",
  "SKIP IT": "border-destructive/40 bg-destructive/10 text-destructive",
};

export function VerdictBadge({ verdict }: { verdict: Verdict }) {
  return (
    <span
      className={`micro-label inline-flex items-center rounded-full border px-3 py-1 ${verdictClass[verdict]}`}
    >
      {verdict}
    </span>
  );
}