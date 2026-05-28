export type ContactLink = {
  label: string;
  href: string;
  icon:
    | "email"
    | "phone"
    | "location"
    | "linkedin"
    | "github"
    | "website"
    | "facebook"
    | "zalo"
    | "telegram";
};

export type Experience = {
  company: string;
  role: string;
  location?: string;
  period: string;
  highlights: string[];
};

export type Education = {
  school: string;
  degree: string;
  period: string;
  details?: string;
};

export type Project = {
  name: string;
  link?: string;
  period?: string;
  description: string;
  tech: string[];
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type Certification = {
  name: string;
  issuer: string;
  year: string;
};

export type Language = {
  name: string;
  level: string;
};

export type CVContent = {
  personal: {
    fullName: string;
    title: string;
    tagline: string;
    location: string;
  };
  summary: string;
  personalInfo: {
    motto: string;
    softSkills: string[];
    interests: string[];
    aspirations: string;
  };
  contact: ContactLink[];
  experience: Experience[];
  education: Education[];
  skills: SkillGroup[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  references: { name: string; role: string; contact: string }[];
  meta: {
    siteTitle: string;
    description: string;
    siteUrl: string;
  };
};
