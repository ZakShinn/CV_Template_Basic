/**
 * ═══════════════════════════════════════════════════════════════
 *  CẤU HÌNH FONT — chỉnh tại file này
 *  Hướng dẫn: src/font/HUONG_DAN_DOI_FONT.md
 * ═══════════════════════════════════════════════════════════════
 *
 * Dự án dùng next/font/google — khi đổi font, cập nhật cả `family` ở đây
 * và import tương ứng trong `src/app/layout.tsx`.
 */

export interface FontRole {
  /** Tên hiển thị trên Google Fonts */
  family: string;
  /** Tên import next/font, vd: Be_Vietnam_Pro */
  nextFontId: "Be_Vietnam_Pro" | "Source_Serif_4" | "Inter" | "Roboto" | "Open_Sans";
  variable: string;
}

export const fonts = {
  sans: {
    family: "Be Vietnam Pro",
    nextFontId: "Be_Vietnam_Pro",
    variable: "--font-dm-sans",
  },
  serif: {
    family: "Source Serif 4",
    nextFontId: "Source_Serif_4",
    variable: "--font-source-serif",
  },
} as const;

/** Biến CSS cho Tailwind @theme / body */
export function getFontCssBlock(theme = fonts): string {
  return [
    ":root {",
    `  --font-sans: var(${theme.sans.variable}), "${theme.sans.family}", ui-sans-serif, system-ui, sans-serif;`,
    `  --font-serif: var(${theme.serif.variable}), "${theme.serif.family}", ui-serif, Georgia, serif;`,
    "}",
  ].join("\n");
}
