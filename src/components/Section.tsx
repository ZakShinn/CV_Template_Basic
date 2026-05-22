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
      <h2 className="mb-4 border-b border-[var(--color-border)] pb-2 font-serif text-lg font-semibold tracking-tight text-[var(--color-accent)]">
        {title}
      </h2>
      {children}
    </section>
  );
}
