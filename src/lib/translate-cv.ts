import type { CVContent } from "@/data/cv";
import { translateTextFree } from "@/lib/translate-providers";

/** Không dịch URL, email, SĐT; giữ thuật ngữ / tên Latin */
export function shouldSkipTranslation(text: string): boolean {
  const t = text.trim();
  if (!t) return true;
  if (/^https?:\/\//i.test(t)) return true;
  if (/^[\w.-]+@[\w.-]+\.\w+$/.test(t)) return true;
  if (/^[+\d\s\-().[\]]+$/.test(t)) return true;
  if (!/[\u00C0-\u1EF9]/i.test(t) && /^[a-zA-Z0-9\s#.+/&\-–—():,'"]+$/.test(t)) {
    return true;
  }
  return false;
}

const CONCURRENCY = 4;

async function runPool<T>(
  items: T[],
  worker: (item: T) => Promise<void>,
  concurrency = CONCURRENCY,
) {
  const queue = [...items];
  const runners = Array.from({ length: Math.min(concurrency, queue.length) }, async () => {
    while (queue.length > 0) {
      const item = queue.shift()!;
      await worker(item);
    }
  });
  await Promise.all(runners);
}

async function translateString(text: string): Promise<string> {
  if (shouldSkipTranslation(text)) return text;

  if (text.length <= 1800) {
    return translateTextFree(text);
  }

  const parts = text.match(/[^.!?…]+[.!?…]?/g) || [text];
  const out: string[] = [];
  for (const part of parts) {
    if (!part.trim()) continue;
    out.push(await translateTextFree(part));
  }
  return out.join("") || text;
}

function collectTranslatableStrings(data: CVContent, set: Set<string>) {
  const add = (s?: string) => {
    if (s && !shouldSkipTranslation(s)) set.add(s);
  };

  add(data.personal.fullName);
  add(data.personal.title);
  add(data.personal.tagline);
  add(data.personal.location);

  add(data.summary);
  add(data.personalInfo.motto);
  add(data.personalInfo.aspirations);
  data.personalInfo.softSkills.forEach(add);
  data.personalInfo.interests.forEach(add);

  data.contact.forEach((c) => {
    if (c.icon === "location") add(c.label);
  });

  data.experience.forEach((job) => {
    add(job.company);
    add(job.role);
    add(job.location);
    add(job.period);
    job.highlights.forEach(add);
  });

  data.education.forEach((edu) => {
    add(edu.school);
    add(edu.degree);
    add(edu.period);
    add(edu.details);
  });

  data.skills.forEach((group) => {
    add(group.category);
    group.items.forEach(add);
  });

  data.projects.forEach((project) => {
    add(project.name);
    add(project.description);
    add(project.period);
    project.tech.forEach(add);
  });

  data.certifications.forEach((cert) => {
    add(cert.name);
    add(cert.issuer);
  });

  data.languages.forEach((lang) => {
    add(lang.name);
    add(lang.level);
  });

  data.references.forEach((ref) => {
    add(ref.name);
    add(ref.role);
  });
}

function applyMap(text: string, map: Map<string, string>): string {
  if (shouldSkipTranslation(text)) return text;
  return map.get(text.trim()) ?? text;
}

export async function translateCVData(data: CVContent): Promise<CVContent> {
  const unique = new Set<string>();
  collectTranslatableStrings(data, unique);

  const map = new Map<string, string>();

  await runPool([...unique], async (original) => {
    try {
      map.set(original, await translateString(original));
    } catch {
      map.set(original, original);
    }
  });

  return {
    ...data,
    personal: {
      ...data.personal,
      fullName: applyMap(data.personal.fullName, map),
      title: applyMap(data.personal.title, map),
      tagline: applyMap(data.personal.tagline, map),
      location: applyMap(data.personal.location, map),
    },
    summary: applyMap(data.summary, map),
    personalInfo: {
      motto: applyMap(data.personalInfo.motto, map),
      aspirations: applyMap(data.personalInfo.aspirations, map),
      softSkills: data.personalInfo.softSkills.map((s) => applyMap(s, map)),
      interests: data.personalInfo.interests.map((s) => applyMap(s, map)),
    },
    contact: data.contact.map((c) =>
      c.icon === "location" ? { ...c, label: applyMap(c.label, map) } : c,
    ),
    experience: data.experience.map((job) => ({
      ...job,
      company: applyMap(job.company, map),
      role: applyMap(job.role, map),
      location: job.location ? applyMap(job.location, map) : undefined,
      period: applyMap(job.period, map),
      highlights: job.highlights.map((h) => applyMap(h, map)),
    })),
    education: data.education.map((edu) => ({
      ...edu,
      school: applyMap(edu.school, map),
      degree: applyMap(edu.degree, map),
      period: applyMap(edu.period, map),
      details: edu.details ? applyMap(edu.details, map) : undefined,
    })),
    skills: data.skills.map((group) => ({
      category: applyMap(group.category, map),
      items: group.items.map((item) => applyMap(item, map)),
    })),
    projects: data.projects.map((project) => ({
      ...project,
      name: applyMap(project.name, map),
      description: applyMap(project.description, map),
      period: project.period ? applyMap(project.period, map) : undefined,
      tech: project.tech.map((t) => applyMap(t, map)),
    })),
    certifications: data.certifications.map((cert) => ({
      name: applyMap(cert.name, map),
      issuer: applyMap(cert.issuer, map),
      year: cert.year,
    })),
    languages: data.languages.map((lang) => ({
      name: applyMap(lang.name, map),
      level: applyMap(lang.level, map),
    })),
    references: data.references.map((ref) => ({
      name: applyMap(ref.name, map),
      role: applyMap(ref.role, map),
      contact: ref.contact,
    })),
  };
}
