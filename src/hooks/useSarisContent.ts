import { useEffect, useRef } from "react";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { getSiteContent, type SiteContent } from "@/lib/youtube.functions";

export const sarisContentQuery = queryOptions<SiteContent>({
  queryKey: ["saris-content"],
  queryFn: () => getSiteContent(),
  staleTime: 60_000,
  refetchInterval: 120_000,
  refetchOnWindowFocus: true,
});

/** Live channel content + a subtle toast whenever a brand new upload appears. */
export function useSarisContent() {
  const query = useQuery(sarisContentQuery);
  const knownLatest = useRef<string | null>(null);

  useEffect(() => {
    const newest = query.data?.latest?.[0] ?? query.data?.trending?.[0];
    if (!newest) return;
    if (knownLatest.current === null) {
      knownLatest.current = newest.id;
      return;
    }
    if (knownLatest.current !== newest.id) {
      knownLatest.current = newest.id;
      toast("NEW FROM SARIS TV", {
        description: newest.title,
        action: {
          label: "Watch Now",
          onClick: () => window.open(newest.url, "_blank", "noopener"),
        },
        duration: 12_000,
      });
    }
  }, [query.data]);

  return query;
}