import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, title, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`print-break-inside-avoid ${className}`}>
      <div className="mb-4 flex items-center gap-3">
        <span
          className="h-5 w-1 shrink-0 rounded-full bg-gradient-to-b from-[var(--color-accent)] to-[var(--color-accent-light)]"
          aria-hidden
        />
        <h2 className="font-serif text-[0.9375rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-ink)]">
          {title}
        </h2>
        <span
          className="hidden h-px flex-1 bg-gradient-to-r from-[var(--color-border)] to-transparent sm:block"
          aria-hidden
        />
      </div>
      {children}
    </section>
  );
}
