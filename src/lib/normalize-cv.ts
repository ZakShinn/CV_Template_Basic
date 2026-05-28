import type {
  CVContent,
  Certification,
  ContactLink,
  Education,
  Experience,
  Language,
  Project,
  SkillGroup,
} from "@/resume-types";

const CONTACT_ICONS = new Set<ContactLink["icon"]>([
  "email",
  "phone",
  "location",
  "linkedin",
  "github",
  "website",
  "facebook",
  "zalo",
  "telegram",
]);

function str(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function strArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
}

function safeIcon(value: unknown): ContactLink["icon"] {
  if (typeof value === "string" && CONTACT_ICONS.has(value as ContactLink["icon"])) {
    return value as ContactLink["icon"];
  }
  return "website";
}

function safeUrl(value: unknown): string {
  const url = str(value).trim();
  if (!url) return "";
  try {
    new URL(url);
    return url;
  } catch {
    return "";
  }
}

function normalizeContact(raw: unknown): ContactLink[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object")
    .map((item) => ({
      label: str(item.label).trim(),
      href: str(item.href).trim(),
      icon: safeIcon(item.icon),
    }))
    .filter((item) => item.label.length > 0 && item.href.length > 0);
}

function normalizeExperience(raw: unknown): Experience[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object")
    .map((item) => ({
      company: str(item.company).trim(),
      role: str(item.role).trim(),
      location: str(item.location).trim() || undefined,
      period: str(item.period).trim(),
      highlights: strArray(item.highlights),
    }))
    .filter((item) => item.company.length > 0 || item.role.length > 0);
}

function normalizeEducation(raw: unknown): Education[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object")
    .map((item) => ({
      school: str(item.school).trim(),
      degree: str(item.degree).trim(),
      period: str(item.period).trim(),
      details: str(item.details).trim() || undefined,
    }))
    .filter((item) => item.school.length > 0 || item.degree.length > 0);
}

function normalizeSkills(raw: unknown): SkillGroup[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object")
    .map((item) => ({
      category: str(item.category).trim(),
      items: strArray(item.items),
    }))
    .filter((item) => item.category.length > 0 && item.items.length > 0);
}

function normalizeProjects(raw: unknown): Project[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object")
    .map((item) => ({
      name: str(item.name).trim(),
      link: str(item.link).trim() || undefined,
      period: str(item.period).trim() || undefined,
      description: str(item.description).trim(),
      tech: strArray(item.tech),
    }))
    .filter((item) => item.name.length > 0);
}

function normalizeCertifications(raw: unknown): Certification[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object")
    .map((item) => ({
      name: str(item.name).trim(),
      issuer: str(item.issuer).trim(),
      year: str(item.year).trim(),
    }))
    .filter((item) => item.name.length > 0);
}

function normalizeLanguages(raw: unknown): Language[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object")
    .map((item) => ({
      name: str(item.name).trim(),
      level: str(item.level).trim(),
    }))
    .filter((item) => item.name.length > 0);
}

function normalizeReferences(raw: unknown): CVContent["references"] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object")
    .map((item) => ({
      name: str(item.name).trim(),
      role: str(item.role).trim(),
      contact: str(item.contact).trim(),
    }))
    .filter((item) => item.name.length > 0);
}

/** Gộp & làm sạch dữ liệu — xóa dòng/array rỗng trong resume vẫn chạy bình thường */
export function normalizeCV(raw: Record<string, unknown>): CVContent {
  const personalRaw =
    raw.personal && typeof raw.personal === "object"
      ? (raw.personal as Record<string, unknown>)
      : {};
  const personalInfoRaw =
    raw.personalInfo && typeof raw.personalInfo === "object"
      ? (raw.personalInfo as Record<string, unknown>)
      : {};
  const metaRaw = raw.meta && typeof raw.meta === "object" ? (raw.meta as Record<string, unknown>) : {};

  const fullName = str(personalRaw.fullName).trim() || "Họ và tên";
  const title = str(personalRaw.title).trim() || "Chức danh";

  return {
    personal: {
      fullName,
      title,
      tagline: str(personalRaw.tagline).trim(),
      location: str(personalRaw.location).trim(),
    },
    summary: str(raw.summary).trim(),
    personalInfo: {
      motto: str(personalInfoRaw.motto).trim(),
      softSkills: strArray(personalInfoRaw.softSkills),
      interests: strArray(personalInfoRaw.interests),
      aspirations: str(personalInfoRaw.aspirations).trim(),
    },
    contact: normalizeContact(raw.contact),
    experience: normalizeExperience(raw.experience),
    education: normalizeEducation(raw.education),
    skills: normalizeSkills(raw.skills),
    projects: normalizeProjects(raw.projects),
    certifications: normalizeCertifications(raw.certifications),
    languages: normalizeLanguages(raw.languages),
    references: normalizeReferences(raw.references),
    meta: {
      siteTitle: str(metaRaw.siteTitle).trim() || `${fullName} — CV`,
      description: str(metaRaw.description).trim() || `Curriculum Vitae — ${title}`,
      siteUrl: safeUrl(metaRaw.siteUrl),
    },
  };
}
