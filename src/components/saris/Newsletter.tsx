import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Reveal } from "./Section";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("You're on the list — the next review lands in your inbox.");
    setEmail("");
  };

  return (
    <section className="mx-auto max-w-[1400px] px-5 pb-24 md:px-10 md:pb-32">
      <Reveal>
        <div className="grain relative overflow-hidden rounded-[2rem] border border-border bg-card px-6 py-14 text-center md:px-16 md:py-24">
          <div
            className="absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full opacity-25 blur-3xl"
            style={{ background: "var(--gradient-accent)" }}
          />
          <div className="relative mx-auto max-w-2xl">
            <p className="micro-label mb-5 text-primary">Newsletter</p>
            <h2 className="text-[2rem] leading-[1.05] font-bold md:text-5xl">
              Don't Miss the Next Review
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-muted-foreground md:text-lg">
              Get the latest Saris TV reviews, trending stories, and new videos directly in your
              inbox.
            </p>
            <form
              onSubmit={onSubmit}
              className="mx-auto mt-9 flex w-full max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                aria-label="Email address"
                className="h-14 flex-1 rounded-full border border-input bg-background px-6 text-base outline-none transition-colors duration-200 placeholder:text-muted-foreground focus:border-primary"
              />
              <button
                type="submit"
                className="font-display h-14 rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:scale-[1.04]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </Reveal>
    </section>
  );
}