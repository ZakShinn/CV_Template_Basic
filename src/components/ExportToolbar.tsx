"use client";

import { useState } from "react";
import type { CVContent } from "@/data/cv";
import { downloadBlob, exportCvToDocx } from "@/lib/export-docx";
import { exportToPDF } from "@/lib/export-pdf";
import { printCV } from "@/lib/print";
import { ATS_PDF_HINT } from "@/lib/seo";
import type { CVLocale } from "./CVToolbar";

type ExportLabels = {
  print: string;
  pdf: string;
  docx: string;
};

export function ExportToolbar({
  labels,
  cvData,
  locale,
}: {
  labels: ExportLabels;
  cvData: CVContent;
  locale: CVLocale;
}) {
  const [loading, setLoading] = useState<"pdf" | "docx" | null>(null);

  const baseName = cvData.personal.fullName.replace(/\s+/g, "_");

  async function handlePdf() {
    const el = document.getElementById("cv-document");
    if (!el) return;
    setLoading("pdf");
    try {
      await exportToPDF(el, `CV_${baseName}.pdf`);
    } finally {
      setLoading(null);
    }
  }

  async function handleDocx() {
    setLoading("docx");
    try {
      const blob = await exportCvToDocx(cvData, locale);
      downloadBlob(blob, `CV_${baseName}.docx`);
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={printCV}
        className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm font-medium text-[var(--color-ink)] shadow-sm transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-blue-400 dark:hover:text-blue-300"
      >
        {labels.print}
      </button>
      <button
        type="button"
        onClick={handlePdf}
        disabled={loading !== null}
        title={ATS_PDF_HINT}
        className="rounded-lg bg-[var(--color-accent)] px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-accent-light)] disabled:opacity-60"
      >
        {loading === "pdf" ? "…" : labels.pdf}
      </button>
      <button
        type="button"
        onClick={handleDocx}
        disabled={loading !== null}
        className="rounded-lg border border-[var(--color-accent)] px-3 py-2 text-sm font-medium text-[var(--color-accent)] transition hover:bg-[var(--color-highlight)] disabled:opacity-60 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-slate-800"
      >
        {loading === "docx" ? "…" : labels.docx}
      </button>
    </div>
  );
}
