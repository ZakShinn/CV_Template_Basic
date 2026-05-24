"use client";

import { useCallback, useEffect, useState } from "react";
import { cv, type CVContent } from "@/data/cv";
import { CVFooter } from "./CVFooter";
import { CVHeader } from "./CVHeader";
import { CVToolbar, sectionLabels, type CVLocale } from "./CVToolbar";
import { ContactIcon } from "./icons";
import { PersonalInfoSections } from "./PersonalInfoSections";
import { Section } from "./Section";

const translateErrorVi = "Không thể dịch. Vui lòng thử lại.";

export function CVPage() {
  const [locale, setLocale] = useState<CVLocale>("vi");
  const [enData, setEnData] = useState<CVContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const displayData = locale === "vi" ? cv : (enData ?? cv);
  const t = sectionLabels[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const fetchTranslation = useCallback(async () => {
    if (enData) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cv),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Translate failed");
      setEnData(json.data as CVContent);
    } catch {
      setError(translateErrorVi);
      setLocale("vi");
    } finally {
      setLoading(false);
    }
  }, [enData]);

  const handleToggleLocale = () => {
    if (locale === "vi") {
      setLocale("en");
      if (!enData && !loading) void fetchTranslation();
    } else {
      setLocale("vi");
    }
  };

  const personalLabels = {
    motto: t.motto,
    softSkills: t.softSkills,
    interests: t.interests,
    aspirations: t.aspirations,
  };

  const showLoading = loading && locale === "en" && !enData;

  return (
    <div className="min-h-screen">
      <div className="no-print sticky top-0 z-10 border-b border-[var(--color-border)]/80 bg-white/90 backdrop-blur-xl shadow-[0_1px_0_0_rgba(15,23,42,0.04)] dark:border-slate-700 dark:bg-slate-900/90">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-ink-muted)] dark:text-slate-400">
            CV · A4
          </p>
          <CVToolbar
            locale={locale}
            loading={loading}
            error={error}
            onToggleLocale={handleToggleLocale}
            cvData={displayData}
          />
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
        {showLoading ? (
          <div
            className="cv-paper relative flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-[var(--color-border)] bg-white shadow-lg"
            aria-busy="true"
            aria-live="polite"
          >
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-[var(--color-accent)] border-t-transparent" />
            <p className="mt-4 text-sm text-[var(--color-ink-muted)]">Đang dịch sang tiếng Anh…</p>
          </div>
        ) : (
          <article
            id="cv-document"
            itemScope
            itemType="https://schema.org/Person"
            className="cv-paper relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[0_24px_48px_-24px_rgba(15,23,42,0.18),0_0_0_1px_rgba(15,23,42,0.03)]"
            key={locale}
          >
            <div
              className="h-1 w-full bg-gradient-to-r from-[var(--color-accent-dark)] via-[var(--color-accent)] to-[var(--color-accent-light)]"
              aria-hidden
            />
            <CVHeader data={displayData} />

            <div className="grid gap-0 lg:grid-cols-[280px_1fr]">
              <aside className="border-b border-[var(--color-border)] bg-gradient-to-b from-[var(--color-highlight)] via-[var(--color-highlight)]/60 to-white px-6 py-8 lg:border-b-0 lg:border-r">
                <nav aria-label="Liên hệ">
                  <ul className="space-y-3">
                    {displayData.contact.map((item) => (
                      <li key={`${item.icon}-${item.href}`}>
                        <a
                          href={item.href}
                          className="group flex items-start gap-3 text-sm text-[var(--color-ink-muted)] transition hover:text-[var(--color-accent)]"
                          {...(item.icon === "location" ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                        >
                          <ContactIcon
                            type={item.icon}
                            className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-light)] group-hover:text-[var(--color-accent)]"
                          />
                          <span className="break-all leading-snug">{item.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="mt-10 space-y-10">
                  <PersonalInfoSections data={displayData} labels={personalLabels} />

                  <Section id="skills" title={t.skills}>
                    <div className="space-y-5">
                      {displayData.skills.map((group) => (
                        <div key={group.category}>
                          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-muted)]">
                            {group.category}
                          </h3>
                          <ul className="mt-2 flex flex-wrap gap-1.5">
                            {group.items.map((skill) => (
                              <li
                                key={skill}
                                className="rounded-full border border-[var(--color-border)] bg-white px-2.5 py-0.5 text-xs text-[var(--color-ink)] shadow-sm"
                              >
                                {skill}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </Section>

                  {displayData.languages.length > 0 && (
                    <Section id="languages" title={t.languages}>
                      <ul className="space-y-2">
                        {displayData.languages.map((lang) => (
                          <li key={lang.name} className="text-sm">
                            <span className="font-medium text-[var(--color-ink)]">{lang.name}</span>
                            <span className="mt-0.5 block text-[var(--color-ink-muted)]">{lang.level}</span>
                          </li>
                        ))}
                      </ul>
                    </Section>
                  )}

                  {displayData.certifications.length > 0 && (
                    <Section id="certifications" title={t.certifications}>
                      <ul className="space-y-3">
                        {displayData.certifications.map((cert) => (
                          <li key={cert.name} className="text-sm">
                            <p className="font-medium leading-snug text-[var(--color-ink)]">{cert.name}</p>
                            <p className="text-[var(--color-ink-muted)]">
                              {cert.issuer} · {cert.year}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </Section>
                  )}
                </div>
              </aside>

              <div className="space-y-10 px-6 py-8 sm:px-10 sm:py-10">
                <Section id="summary" title={t.summary}>
                  <p className="text-sm leading-relaxed text-[var(--color-ink-muted)]">{displayData.summary}</p>
                </Section>

                <Section id="experience" title={t.experience}>
                  <ol className="relative space-y-8 border-l-2 border-[var(--color-accent)]/20 pl-6">
                    {displayData.experience.map((job) => (
                      <li key={`${job.company}-${job.period}`} className="print-break-inside-avoid relative">
                        <span className="absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full border-2 border-white bg-[var(--color-accent)] shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-accent)_15%,transparent)]" />
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                          <div>
                            <h3 className="font-semibold text-[var(--color-ink)]">{job.role}</h3>
                            <p className="text-sm font-medium text-[var(--color-accent-light)]">
                              {job.company}
                              {job.location && (
                                <span className="font-normal text-[var(--color-ink-muted)]">
                                  {" "}
                                  · {job.location}
                                </span>
                              )}
                            </p>
                          </div>
                          <time className="shrink-0 text-xs font-medium uppercase tracking-wide text-[var(--color-ink-muted)]">
                            {job.period}
                          </time>
                        </div>
                        <ul className="mt-3 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-[var(--color-ink-muted)] marker:text-[var(--color-accent-light)]">
                          {job.highlights.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ol>
                </Section>

                <Section id="education" title={t.education}>
                  <ul className="space-y-4">
                    {displayData.education.map((edu) => (
                      <li key={edu.school} className="print-break-inside-avoid">
                        <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                          <div>
                            <h3 className="font-semibold text-[var(--color-ink)]">{edu.degree}</h3>
                            <p className="text-sm text-[var(--color-accent-light)]">{edu.school}</p>
                            {edu.details && (
                              <p className="mt-1 text-sm text-[var(--color-ink-muted)]">{edu.details}</p>
                            )}
                          </div>
                          <time className="text-xs font-medium uppercase tracking-wide text-[var(--color-ink-muted)]">
                            {edu.period}
                          </time>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Section>

                {displayData.projects.length > 0 && (
                  <Section id="projects" title={t.projects}>
                    <ul className="space-y-5">
                      {displayData.projects.map((project) => (
                        <li
                          key={project.name}
                          className="rounded-xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-highlight)]/80 to-white p-4 print-break-inside-avoid shadow-sm"
                        >
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            {project.link ? (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-[var(--color-accent)] hover:underline"
                              >
                                {project.name}
                              </a>
                            ) : (
                              <h3 className="font-semibold text-[var(--color-ink)]">{project.name}</h3>
                            )}
                            {project.period && (
                              <span className="text-xs text-[var(--color-ink-muted)]">{project.period}</span>
                            )}
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-muted)]">
                            {project.description}
                          </p>
                          <ul className="mt-2 flex flex-wrap gap-1.5">
                            {project.tech.map((tech) => (
                              <li
                                key={tech}
                                className="rounded bg-white px-2 py-0.5 text-xs text-[var(--color-ink-muted)] ring-1 ring-[var(--color-border)]"
                              >
                                {tech}
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </Section>
                )}

                {displayData.references.length > 0 && (
                  <Section id="references" title={t.references}>
                    <ul className="grid gap-4 sm:grid-cols-2">
                      {displayData.references.map((ref) => (
                        <li
                          key={ref.name}
                          className="rounded-lg border border-[var(--color-border)] p-4 text-sm"
                        >
                          <p className="font-semibold">{ref.name}</p>
                          <p className="text-[var(--color-ink-muted)]">{ref.role}</p>
                          <p className="mt-1 text-[var(--color-accent-light)]">{ref.contact}</p>
                        </li>
                      ))}
                    </ul>
                  </Section>
                )}
              </div>
            </div>
          </article>
        )}

        <CVFooter />
      </main>
    </div>
  );
}
