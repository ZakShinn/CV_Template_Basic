/**
 * ═══════════════════════════════════════════════════════════════
 *  THÔNG TIN CƠ BẢN CV — chỉnh tại file này
 *  Hướng dẫn: src/README.md
 * ═══════════════════════════════════════════════════════════════
 *
 * ⚠️ CHỈ NHẬP NỘI DUNG BẰNG TIẾNG VIỆT.
 * Bản tiếng Anh: bấm "English" trên website (dịch tự động).
 *
 * Có thể xóa từng dòng trong `contact`, để `[]` hoặc `""` — trang vẫn chạy bình thường.
 */

import type { ContactLink } from "./resume-types";

export const resumeBasic = {
  personal: {
    fullName: "Võ Hoàng Hải Nghĩa",
    title: "Senior System Administrator / DevOps Engineer / Lead Developer",
    tagline: "Nghĩa Zakshin · Sinh năm 06/09/1996",
    location: "Phường Long An - Tỉnh Tây Ninh",
  },

  summary:
    "Chuyên gia CNTT (IT Specialist) với nhiều năm kinh nghiệm trong quản trị hệ thống, hạ tầng mạng và phát triển phần mềm. Thế mạnh chuyên sâu về tối ưu hóa hạ tầng mạng doanh nghiệp (MikroTik RouterOS v7), ảo hóa, triển khai giải pháp VPN bảo mật cao (WireGuard, Tailscale) và tự động hóa quy trình (Automation Scripts). Đồng thời là Full-stack Developer với Next.js 15, React 19, PHP. Hướng tới hệ sinh thái vận hành ổn định, tự động hóa tối đa và bảo mật cao cho doanh nghiệp.",

  personalInfo: {
    motto: "Thích hệ điều hành Ubuntu Server.",
    softSkills: [
      "Lãnh đạo nhóm & phong trào",
      "Làm việc nhóm",
      "Tự nghiên cứu & giải quyết vấn đề",
      "Trách nhiệm cao trong môi trường y tế",
    ],
    interests: [
      "Ubuntu Server",
      "MikroTik RouterOS",
      "VPN (WireGuard, Tailscale)",
      "Open-source & Automation",
    ],
    aspirations:
      "Công việc mong muốn: Senior System Administrator / DevOps Engineer / Lead Developer.",
  },

  /** Thêm/xóa dòng — icon có sẵn & cách thêm mạng khác: src/HuongDan.md */
  contact: [
    {
      label: "nghiasoothsayer@gmail.com",
      href: "mailto:nghiasoothsayer@gmail.com",
      icon: "email",
    },
    { label: "0968.884.946", href: "tel:+84968884946", icon: "phone" },
    { label: "github.com/ZakShinn", href: "https://github.com/ZakShinn", icon: "github" },
    {
      label: "Facebook",
      href: "https://www.facebook.com/profile.php?id=100006985387032",
      icon: "facebook",
    },
    { label: "Zalo · 0968.884.946", href: "https://zalo.me/0968884946", icon: "zalo" },
  ] as ContactLink[],
};
