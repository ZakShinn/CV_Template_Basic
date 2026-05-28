/**
 * Nội dung CV — gộp basic + advanced (tự làm sạch khi thiếu/xóa dòng)
 *
 * Sửa dữ liệu: src/resume-basic.ts | src/resume-advanced.ts
 * Hướng dẫn: src/HuongDan.md
 */

import { normalizeCV } from "@/lib/normalize-cv";
import { resumeAdvanced } from "./resume-advanced";
import { resumeBasic } from "./resume-basic";

export type {
  CVContent,
  Certification,
  ContactLink,
  Education,
  Experience,
  Language,
  Project,
  SkillGroup,
} from "./resume-types";

export { resumeBasic } from "./resume-basic";
export { resumeAdvanced } from "./resume-advanced";

export const cv = normalizeCV({
  ...resumeBasic,
  ...resumeAdvanced,
} as Record<string, unknown>);

export type CVData = typeof cv;
