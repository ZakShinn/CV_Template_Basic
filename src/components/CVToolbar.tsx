"use client";

import { useTheme } from "next-themes";
import type { CVContent } from "@/data/cv";
import { ExportToolbar } from "./ExportToolbar";

type CVLocale = "vi" | "en";

const uiLabels = {
  vi: { print: "In CV", pdf: "Tải PDF", docx: "Tải DOCX", switchLang: "English", translating: "Đang dịch…" },
  en: { print: "Print", pdf: "Download PDF", docx: "Download DOCX", switchLang: "Tiếng Việt", translating: "Translating…" },
} as const;

export function CVToolbar({
  locale,
  loading,
  error,
  cvData,
  onToggleLocale,
}: {
  locale: CVLocale;
  loading?: boolean;
  error?: string | null;
  cvData: CVContent;
  onToggleLocale: () => void;
}) {
  const { setTheme, resolvedTheme } = useTheme();
  const ui = uiLabels[locale];
  const isDark = resolvedTheme === "dark";

  return (
    <div className="flex flex-wrap items-center gap-2">
      {error && (
        <span className="text-xs text-red-600 dark:text-red-400" role="alert">
          {error}
        </span>
      )}
      <button
        type="button"
        onClick={onToggleLocale}
        disabled={loading}
        className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-muted)] transition hover:border-[var(--color-accent)] disabled:opacity-60 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300"
        aria-label="Switch language"
      >
        {loading ? ui.translating : ui.switchLang}
      </button>
      <button
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-xs font-medium text-[var(--color-ink-muted)] transition hover:border-[var(--color-accent)] dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300"
        aria-label={isDark ? "Light mode" : "Dark mode"}
      >
        {isDark ? "☀" : "☾"}
      </button>
      <ExportToolbar labels={{ print: ui.print, pdf: ui.pdf, docx: ui.docx }} cvData={cvData} locale={locale} />
    </div>
  );
}

export const sectionLabels = {
  vi: {
    summary: "Tóm tắt",
    experience: "Kinh nghiệm làm việc",
    education: "Học vấn",
    skills: "Kỹ năng",
    projects: "Dự án",
    certifications: "Chứng chỉ",
    languages: "Ngôn ngữ",
    references: "Người tham chiếu",
    motto: "Phương châm sống",
    softSkills: "Kỹ năng mềm",
    interests: "Sở thích",
    aspirations: "Mong muốn",
  },
  en: {
    summary: "Summary",
    experience: "Experience",
    education: "Education",
    skills: "Skills",
    projects: "Projects",
    certifications: "Certifications",
    languages: "Languages",
    references: "References",
    motto: "Life motto",
    softSkills: "Soft skills",
    interests: "Interests",
    aspirations: "Career goals",
  },
} as const;

export type { CVLocale };
