/**
 * ═══════════════════════════════════════════════════════════════
 *  HIỂN THỊ & BẬT/TẮT TÍNH NĂNG — chỉnh tại file này
 *  Hướng dẫn: src/README.md
 * ═══════════════════════════════════════════════════════════════
 */

/** Chế độ hiển thị CV: `basic` = gọn · `full` = đầy đủ theo toggles bên dưới */
export type DisplayMode = "basic" | "full";

/** Tên các khối nội dung trên CV — dùng cho `sections` và hàm kiểm tra */
export type SectionKey =
  | "contact" // Liên hệ (sidebar)
  | "personalInfo" // Phương châm, kỹ năng mềm, sở thích, mong muốn
  | "skills" // Kỹ năng chuyên môn
  | "languages" // Ngôn ngữ
  | "certifications" // Chứng chỉ
  | "summary" // Tóm tắt / mục tiêu nghề nghiệp
  | "experience" // Kinh nghiệm làm việc
  | "education" // Học vấn
  | "projects" // Dự án
  | "references"; // Người tham chiếu

/** Cấu hình gốc — sửa giá trị tại đây, không cần đụng file React */
export const displayConfig = {
  /** `basic`: tự ẩn thêm personalInfo, projects, certifications, references */
  mode: "full" as DisplayMode,

  /** Bật/tắt từng section trên CV (`false` = không hiện dù `resume-*.ts` có dữ liệu) */
  sections: {
    contact: true, // Khối liên hệ (SĐT, GitHub, …)
    personalInfo: true, // Phương châm, kỹ năng mềm, sở thích, mong muốn
    skills: true, // Kỹ năng (sidebar)
    languages: true, // Ngôn ngữ (sidebar)
    certifications: true, // Chứng chỉ (sidebar)
    summary: true, // Tóm tắt (cột chính)
    experience: true, // Kinh nghiệm (cột chính)
    education: true, // Học vấn (cột chính)
    projects: true, // Dự án (cột chính)
    references: true, // Người tham chiếu (cột chính)
  },

  /** Bật/tắt tính năng trang web (toolbar, SEO, trang trí) */
  features: {
    languageSwitch: true, // Nút chuyển Việt / English (dịch tự động)
    darkMode: true, // Nút sáng / tối
    print: true, // Nút In CV (Ctrl+P)
    pdfExport: true, // Nút Tải PDF
    docxExport: true, // Nút Tải DOCX
    accentBar: true, // Thanh gradient màu trên đầu khung CV
    pageFooter: true, // Trang trí dưới trang (ngoài khung CV, không in)
    allowSearchIndexing: false, // `true` = cho Google index · `false` = chặn (robots.txt + noindex)
  },
} as const; // Khóa kiểu — tránh sửa nhầm tên key

/** Các section bị ẩn thêm khi `mode: "basic"` (dù `sections.*` vẫn là `true`) */
const basicHiddenSections = new Set<SectionKey>([
  "personalInfo",
  "projects",
  "certifications",
  "references",
]);

/** Section có được hiển thị không (chưa xét dữ liệu rỗng trong resume) */
export function isSectionEnabled(section: SectionKey): boolean {
  if (!displayConfig.sections[section]) return false; // Tắt thủ công trong config
  if (displayConfig.mode === "basic" && basicHiddenSections.has(section)) {
    return false; // Chế độ basic: ẩn mục nâng cao
  }
  return true;
}

/** Tính năng toolbar / trang có bật không */
export function isFeatureEnabled(feature: keyof typeof displayConfig.features): boolean {
  return displayConfig.features[feature];
}

/** Cho phép Google và bot tìm kiếm index trang không */
export function isSearchIndexingAllowed(): boolean {
  return displayConfig.features.allowSearchIndexing;
}
