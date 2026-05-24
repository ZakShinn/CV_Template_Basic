import {
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
} from "docx";
import type { CVContent } from "@/data/cv";
import type { CVLocale } from "@/components/CVToolbar";

const sectionTitles = {
  vi: {
    summary: "Tóm tắt",
    experience: "Kinh nghiệm làm việc",
    education: "Học vấn",
    skills: "Kỹ năng",
    projects: "Dự án",
    certifications: "Chứng chỉ",
    languages: "Ngôn ngữ",
  },
  en: {
    summary: "Summary",
    experience: "Experience",
    education: "Education",
    skills: "Skills",
    projects: "Projects",
    certifications: "Certifications",
    languages: "Languages",
  },
} as const;

export async function exportCvToDocx(data: CVContent, locale: CVLocale = "vi"): Promise<Blob> {
  const t = sectionTitles[locale];
  const children: Paragraph[] = [];

  children.push(
    new Paragraph({
      heading: HeadingLevel.TITLE,
      children: [new TextRun({ text: data.personal.fullName, bold: true, size: 32 })],
    }),
    new Paragraph({
      children: [new TextRun({ text: data.personal.title, size: 24, color: "1e40af" })],
    }),
  );

  if (data.personal.location) {
    children.push(new Paragraph({ children: [new TextRun(data.personal.location)] }));
  }

  const contacts = data.contact
    .filter((c) => c.icon !== "location")
    .map((c) => c.label)
    .join(" | ");
  if (contacts) {
    children.push(new Paragraph({ children: [new TextRun(contacts)] }));
  }
  children.push(new Paragraph({ text: "" }));

  children.push(
    new Paragraph({ heading: HeadingLevel.HEADING_1, text: t.summary }),
    new Paragraph({ children: [new TextRun(data.summary)] }),
    new Paragraph({ text: "" }),
  );

  children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, text: t.experience }));
  for (const job of data.experience) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: job.role, bold: true }),
          new TextRun({ text: ` — ${job.company} (${job.period})` }),
        ],
      }),
    );
    for (const point of job.highlights) {
      children.push(new Paragraph({ bullet: { level: 0 }, children: [new TextRun(point)] }));
    }
  }
  children.push(new Paragraph({ text: "" }));

  children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, text: t.education }));
  for (const edu of data.education) {
    children.push(
      new Paragraph({
        text: `${edu.degree} — ${edu.school} (${edu.period})${edu.details ? `. ${edu.details}` : ""}`,
      }),
    );
  }
  children.push(new Paragraph({ text: "" }));

  children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, text: t.skills }));
  for (const group of data.skills) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: group.category, bold: true }),
          new TextRun({ text: ": " + group.items.join(", ") }),
        ],
      }),
    );
  }
  children.push(new Paragraph({ text: "" }));

  if (data.projects.length > 0) {
    children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, text: t.projects }));
    for (const project of data.projects) {
      children.push(new Paragraph({ children: [new TextRun({ text: project.name, bold: true })] }));
      if (project.description) {
        children.push(new Paragraph({ children: [new TextRun(project.description)] }));
      }
      if (project.tech.length) {
        children.push(new Paragraph({ children: [new TextRun(project.tech.join(", "))] }));
      }
    }
    children.push(new Paragraph({ text: "" }));
  }

  if (data.certifications.length > 0) {
    children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, text: t.certifications }));
    for (const cert of data.certifications) {
      children.push(new Paragraph({ text: `${cert.name} — ${cert.issuer} (${cert.year})` }));
    }
    children.push(new Paragraph({ text: "" }));
  }

  if (data.languages.length > 0) {
    children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, text: t.languages }));
    for (const lang of data.languages) {
      children.push(new Paragraph({ text: `${lang.name} — ${lang.level}` }));
    }
  }

  const doc = new Document({ sections: [{ properties: {}, children }] });
  return Packer.toBlob(doc);
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
