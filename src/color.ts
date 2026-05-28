/**
 * ═══════════════════════════════════════════════════════════════
 *  MÀU CV & TRANG WEB — chỉnh tại file này
 *  Hướng dẫn: src/HuongDan.md
 * ═══════════════════════════════════════════════════════════════
 *
 * Sửa mã hex trong `colors` → lưu → F5 trình duyệt.
 * `layout.tsx` tự inject biến CSS — không cần sửa globals.css.
 */

/** Bảng màu chính — đổi hex tại đây */
export const colors = {
  /** Chữ đậm: họ tên, tiêu đề section, tên công ty/vai trò, thẻ kỹ năng */
  ink: "#0f172a",
  /** Chữ phụ: mô tả, bullet, thời gian, liên hệ, tóm tắt, nhãn sidebar */
  inkMuted: "#475569",
  /** Nền trang web (vùng ngoài khung CV), body trong globals.css */
  surface: "#f8fafc",
  /** Màu nhấn chính: chức danh, nút Tải PDF, thanh accent đầu CV, gạch dưới tên */
  accent: "#1e40af",
  /** Nhấn sáng hơn: icon liên hệ, tên trường/công ty, link hover, bullet marker */
  accentLight: "#2563eb",
  /** Nhấn tối hơn: đầu gradient thanh màu trên cùng khung CV */
  accentDark: "#1e3a8a",
  /** Viền: khung CV, kẻ ngăn, thẻ dự án, nút toolbar, badge kỹ năng */
  border: "#e2e8f0",
  /** Nền nhạt: sidebar trái, nền avatar khi lỗi ảnh, thẻ dự án, hover nút DOCX */
  highlight: "#f1f5f9",
} as const;

/**
 * Bộ màu gợi ý — copy toàn bộ object vào `colors` hoặc dùng trong layout:
 * `getThemeCssBlock(presets.green)`
 */
export const presets = {
  /** Giống `colors` mặc định (xanh navy) */
  navy: { ...colors },
  /** Tông xanh lá — accent / accentLight / accentDark đổi, chữ & viền giữ nguyên */
  green: {
    ink: "#0f172a",
    inkMuted: "#475569",
    surface: "#f8fafc",
    accent: "#14532d",
    accentLight: "#166534",
    accentDark: "#052e16",
    border: "#e2e8f0",
    highlight: "#f1f5f9",
  },
  /** Tông tím — thêm đổi surface, border, highlight cho đồng bộ */
  purple: {
    ink: "#0f172a",
    inkMuted: "#475569",
    surface: "#faf8ff",
    accent: "#4c1d95",
    accentLight: "#6d28d9",
    accentDark: "#2e1065",
    border: "#e9e5f5",
    highlight: "#f5f3ff",
  },
} as const;

/** Sinh biến CSS `--color-*` gắn vào `:root` — được gọi trong `app/layout.tsx` */
export function getThemeCssBlock(palette: typeof colors = colors): string {
  return [
    ":root {",
    `  --color-ink: ${palette.ink};`, // → text chính
    `  --color-ink-muted: ${palette.inkMuted};`, // → text phụ
    `  --color-surface: ${palette.surface};`, // → nền trang
    `  --color-accent: ${palette.accent};`, // → nhấn chính
    `  --color-accent-light: ${palette.accentLight};`, // → nhấn sáng
    `  --color-accent-dark: ${palette.accentDark};`, // → nhấn tối / gradient
    `  --color-border: ${palette.border};`, // → viền
    `  --color-highlight: ${palette.highlight};`, // → nền sidebar / thẻ
    "}",
  ].join("\n");
}
