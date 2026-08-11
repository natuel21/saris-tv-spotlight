import type { ReactNode } from "react";
import { useReveal } from "./useReveal";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      data-visible={visible}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function SectionHead({
  kicker,
  title,
  subtitle,
  action,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 border-t border-border pt-8 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {kicker ? <p className="micro-label mb-3 text-primary">{kicker}</p> : null}
        <h2 className="text-[2.25rem] leading-[1.05] font-bold sm:text-5xl">{title}</h2>
        {subtitle ? (
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">{subtitle}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}