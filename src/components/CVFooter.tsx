export function CVFooter() {
  return (
    <footer className="no-print mt-10 px-4 sm:px-0" aria-hidden>
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3">
        <div className="flex w-full max-w-md items-center gap-3">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--color-accent)]/40" />
          <span className="flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-light)]/70" />
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]/40" />
          </span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--color-accent)]/40" />
        </div>
        <div className="h-0.5 w-24 rounded-full bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent-light)] to-[var(--color-accent)]" />
      </div>
    </footer>
  );
}
