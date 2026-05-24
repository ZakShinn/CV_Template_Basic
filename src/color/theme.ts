/**
 * ═══════════════════════════════════════════════════════════════
 *  CẤU HÌNH MÀU — chỉnh tại file này
 *  Hướng dẫn: src/color/HUONG_DAN_DOI_MAU.md
 * ═══════════════════════════════════════════════════════════════
 */

/** Màu chính trên CV và trang web */
export const colors = {
  ink: "#0f172a",
  inkMuted: "#475569",
  surface: "#f8fafc",
  accent: "#1e40af",
  accentLight: "#2563eb",
  accentDark: "#1e3a8a",
  border: "#e2e8f0",
  highlight: "#f1f5f9",
} as const;

/** Preset gợi ý — copy vào `colors` nếu muốn đổi nhanh cả bộ */
export const presets = {
  navy: { ...colors },
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

/** Khối CSS inject vào :root (layout.tsx) */
export function getThemeCssBlock(
  palette: typeof colors = colors
): string {
  return [
    ":root {",
    `  --color-ink: ${palette.ink};`,
    `  --color-ink-muted: ${palette.inkMuted};`,
    `  --color-surface: ${palette.surface};`,
    `  --color-accent: ${palette.accent};`,
    `  --color-accent-light: ${palette.accentLight};`,
    `  --color-accent-dark: ${palette.accentDark};`,
    `  --color-border: ${palette.border};`,
    `  --color-highlight: ${palette.highlight};`,
    "}",
  ].join("\n");
}
