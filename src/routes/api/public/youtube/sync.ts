import { createFileRoute } from "@tanstack/react-router";

// Called by the scheduled job to keep the Saris TV cache fresh.
export const Route = createFileRoute("/api/public/youtube/sync")({
  server: {
    handlers: {
      POST: async () => {
        if (!process.env["YOUTUBE_API_KEY"]) {
          return Response.json({ ok: false, error: "YOUTUBE_API_KEY missing" }, { status: 503 });
        }
        const { syncChannel } = await import("@/lib/youtube.server");
        const result = await syncChannel();
        return Response.json(result, { status: result.ok ? 200 : 502 });
      },
      GET: async () => Response.json({ ok: true, hint: "POST to run a sync" }),
    },
  },
});