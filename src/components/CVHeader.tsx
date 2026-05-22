import { cv } from "@/data/cv";

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(-2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export function CVHeader() {
  const initials = getInitials(cv.personal.fullName);

  return (
    <header className="relative overflow-hidden border-b border-[var(--color-border)] bg-gradient-to-b from-white via-white to-[var(--color-highlight)]/50">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,color-mix(in_srgb,var(--color-accent)_6%,transparent)_0%,transparent_42%)]"
        aria-hidden
      />

      <div className="relative px-6 py-11 sm:px-10 sm:py-14">
        <div className="flex flex-col items-center gap-9 md:flex-row md:items-center md:gap-12 lg:gap-14">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div
              className="relative h-[7.75rem] w-[7.75rem] overflow-hidden rounded-full bg-[var(--color-highlight)] shadow-[0_8px_30px_-6px_rgba(15,23,42,0.12)] sm:h-[8.5rem] sm:w-[8.5rem]"
              style={{
                boxShadow:
                  "0 0 0 1px color-mix(in srgb, var(--color-accent) 12%, transparent), 0 8px 24px -8px rgba(15, 23, 42, 0.15)",
              }}
            >
              {cv.personal.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={cv.personal.avatarUrl}
                  alt={cv.personal.fullName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span
                  className="flex h-full w-full items-center justify-center text-[1.65rem] font-semibold tracking-[0.12em] text-[var(--color-accent)] sm:text-[1.85rem]"
                  style={{
                    background:
                      "linear-gradient(145deg, color-mix(in srgb, var(--color-accent) 12%, white), color-mix(in srgb, var(--color-accent) 4%, var(--color-highlight)))",
                  }}
                >
                  {initials}
                </span>
              )}
            </div>
            <span
              className="pointer-events-none absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-white bg-[var(--color-accent)]"
              aria-hidden
            />
          </div>

          {/* Tên & thông tin */}
          <div className="min-w-0 flex-1 text-center md:text-left">
            <h1 className="font-serif text-[1.75rem] font-semibold leading-[1.15] tracking-tight text-[var(--color-ink)] sm:text-[2.125rem] lg:text-[2.375rem]">
              {cv.personal.fullName}
            </h1>

            <div className="mx-auto mt-3 h-px w-12 bg-[var(--color-accent)] md:mx-0" aria-hidden />

            <p className="mt-3 text-base font-medium text-[var(--color-accent)] sm:text-lg">
              {cv.personal.title}
            </p>

            {cv.personal.location && (
              <p className="mt-2 flex items-center justify-center gap-1.5 text-sm text-[var(--color-ink-muted)] md:justify-start">
                <svg
                  className="h-4 w-4 shrink-0 text-[var(--color-accent-light)]/80"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  aria-hidden
                >
                  <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                {cv.personal.location}
              </p>
            )}

            {cv.personal.tagline && (
              <p className="mx-auto mt-5 max-w-xl border-t border-[var(--color-border)] pt-5 text-sm leading-[1.7] text-[var(--color-ink-muted)] md:mx-0 sm:text-[0.9375rem]">
                {cv.personal.tagline}
              </p>
            )}
          </div>
        </div>
      </div>

      <div
        className="h-px w-full bg-gradient-to-r from-transparent via-[var(--color-accent)]/25 to-transparent"
        aria-hidden
      />
    </header>
  );
}
