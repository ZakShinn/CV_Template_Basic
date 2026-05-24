/**
 * ═══════════════════════════════════════════════════════════════
 *  CẤU HÌNH ẢNH ĐẠI DIỆN — chỉnh tại file này
 *  Hướng dẫn: src/avatar/HUONG_DAN_ANH_DAI_DIEN.md
 * ═══════════════════════════════════════════════════════════════
 */

export type AvatarObjectFit = "cover" | "contain";

export interface AvatarConfig {
  /** `true` = hiển thị avatar (ảnh hoặc chữ cái đầu); `false` = ẩn hoàn toàn */
  enabled: boolean;
  /** Đường dẫn từ `public/`, vd: `/avatar/anh-cua-toi.jpg` — để trống dùng placeholder mẫu */
  src: string;
  /** Mô tả ảnh (accessibility) — để trống sẽ dùng họ tên từ cv.ts */
  alt: string;
  objectFit: AvatarObjectFit;
  /** `true` = không in ảnh ra PDF */
  hideInPrint: boolean;
}

/** Ảnh mẫu khi chưa thay ảnh thật — `public/avatar/placeholder.svg` */
export const DEFAULT_AVATAR_SRC = "/avatar/placeholder.svg";

export const avatarConfig: AvatarConfig = {
  enabled: true,
  src: DEFAULT_AVATAR_SRC,
  alt: "Ảnh đại diện — thay bằng ảnh của bạn",
  objectFit: "cover",
  hideInPrint: false,
};

/** URL hiển thị — ưu tiên `src` tùy chỉnh, sau đó placeholder mẫu */
export function resolveAvatarSrc(customSrc?: string): string {
  if (!avatarConfig.enabled) return "";
  const custom = customSrc?.trim() || avatarConfig.src.trim();
  return custom || DEFAULT_AVATAR_SRC;
}
