/**
 * ═══════════════════════════════════════════════════════════════
 *  NỘI DUNG NÂNG CAO CV & TRANG WEB — chỉnh tại file này
 *  Hướng dẫn: src/HuongDan.md
 *
 * Mảng rỗng [] hoặc xóa dòng — trang vẫn chạy bình thường.
 * ═══════════════════════════════════════════════════════════════
 */

import type {
  Certification,
  Education,
  Experience,
  Language,
  Project,
  SkillGroup,
} from "./resume-types";

export const resumeAdvanced = {
  experience: [
    {
      company: "Bệnh viện Đa khoa Vạn An",
      role: "IT Specialist – Chuyên viên Hạ tầng & Hệ thống",
      period: "2025 – Hiện tại",
      highlights: [
        "Thiết kế, vận hành và bảo trì toàn bộ hạ tầng mạng, hệ thống máy chủ của bệnh viện.",
        "Quản lý HIS (Hospital Information System); lên phương án và thực thi Backup dữ liệu EMR (Bệnh án điện tử) định kỳ, đảm bảo tính toàn vẹn và sẵn sàng cao theo quy định.",
        "Tối ưu định tuyến, triển khai chính sách Firewall nghiêm ngặt trên MikroTik nhằm bảo vệ dữ liệu bệnh nhân trước nguy cơ tấn công mạng.",
      ],
    },
    {
      company: "Trường Cao đẳng Công nghệ và Du lịch",
      role: "Giảng viên",
      period: "2024 – Hiện tại",
      highlights: [
        "Giảng dạy các học phần thuộc khối Công nghệ thông tin cho sinh viên cao đẳng.",
        "Hướng dẫn thực hành, bài tập và đồ án; truyền đạt kinh nghiệm triển khai hệ thống, mạng và phát triển phần mềm thực tế.",
      ],
    },
    {
      company: "Dự án độc lập & Đóng góp cộng đồng (Open-source)",
      role: "Lead Developer / Creator",
      period: "2025 – Hiện tại",
      highlights: [
        "Zakshin MikroTik WireGuard Admin — tự động hóa cấu hình WireGuard trên MikroTik RouterOS.",
        "Linux-Telegram-Monitor — giám sát tài nguyên Linux (CPU, RAM, Storage, Network), cảnh báo qua Telegram.",
        "Backup & giám sát MikroTik RouterOS v7 — xuất .rsc/.backup, nén và gửi an toàn về Telegram.",
        "Giải pháp IPTV & Multicast — công cụ PHP quét luồng multicast (MyTV API), xuất playlist M3U.",
        "Web maias-landing & Telegram Control Builder — Next.js 15, React 19, deploy Vercel, điều khiển Android root qua Telegram.",
      ],
    },
  ] as Experience[],

  education: [
    {
      school: "Tự nghiên cứu & Phát triển",
      degree: "Công nghệ thông tin / Quản trị mạng",
      period: "Liên tục",
      details:
        "Kiến trúc nhân Linux (Kernel), tối ưu phần cứng ARM64 (AArch64), kỹ thuật Modding Android cấp hệ thống.",
    },
    {
      school: "Đại học Cần Thơ",
      degree: "Công nghệ thông tin",
      period: "2022 – 2024",
      details: "Hoàn thiện và nâng cao tư duy hệ thống, thuật toán và công nghệ phần mềm chuyên sâu.",
    },
    {
      school: "Trường Cao Đẳng Công Nghệ Ladec",
      degree: "Công nghệ thông tin",
      period: "2016 – 2019",
      details:
        "Quản lý nhóm thanh niên trong hoạt động phong trào, tình nguyện; rèn luyện kỹ năng lãnh đạo và làm việc nhóm.",
    },
    {
      school: "Trường Cao đẳng Bách Khoa Nam Sài Gòn",
      degree: "Y Sỹ Đa Khoa",
      period: "2014 – 2016",
      details:
        "Hoạt động ngoại khóa, kỹ năng mềm; kiến thức y khoa thực tiễn phục vụ công việc tại hệ thống y tế sau này.",
    },
    {
      school: "Trường THPT Nguyễn Thông",
      degree: "Trung học phổ thông",
      period: "2011 – 2014",
      details: "Học sinh khối THPT; định hình trách nhiệm cá nhân qua các bài học từ cuộc sống.",
    },
    {
      school: "Trường THCS Vĩnh Công",
      degree: "Trung học cơ sở",
      period: "2007 – 2011",
      details: "Hoàn thành chương trình THCS; rèn luyện tính tự lập trước các biến cố gia đình.",
    },
    {
      school: "Trường TH Vĩnh Công",
      degree: "Tiểu học",
      period: "2002 – 2007",
      details: "Bắt đầu hình thành niềm đam mê tự nghiên cứu và tìm tòi những điều yêu thích.",
    },
  ] satisfies Education[],

  skills: [
    {
      category: "Quản trị hệ thống & Mạng",
      items: [
        "MikroTik RouterOS v7 (Firewall, Routing, DNS Hijacking, Layer7)",
        "WireGuard · Tailscale",
        "Ubuntu Server (kernel, firmware, bảo trì)",
        "HIS · EMR · Backup dữ liệu y tế",
      ],
    },
    {
      category: "Phát triển phần mềm & Tự động hóa",
      items: [
        "PHP · Bash · RouterOS Scripting",
        "Next.js 15 · React 19",
        "Magisk · KernelSU · Telegram Bot",
        "Git · GitHub · Cloudflare · Vercel",
      ],
    },
  ] satisfies SkillGroup[],

  projects: [
    {
      name: "Zakshin MikroTik WireGuard Admin",
      link: "https://github.com/ZakShinn",
      period: "2025 – Hiện tại",
      description:
        "Tiện ích tự động hóa cấu hình WireGuard trên MikroTik RouterOS — đơn giản hóa khởi tạo, quản lý và cấp phát quyền truy cập VPN cho người dùng cuối.",
      tech: ["MikroTik", "WireGuard", "RouterOS Script"],
    },
    {
      name: "Linux-Telegram-Monitor",
      link: "https://github.com/ZakShinn",
      period: "2025 – Hiện tại",
      description:
        "Giám sát tài nguyên máy chủ Linux (CPU, RAM, Storage, Network) và gửi cảnh báo thời gian thực về Telegram qua Shell Script.",
      tech: ["Bash", "Linux", "Telegram Bot"],
    },
    {
      name: "Backup & Giám sát MikroTik RouterOS v7 qua Telegram",
      period: "2025 – Hiện tại",
      description:
        "Script RouterOS v7 tự động xuất cấu hình .rsc và .backup, nén và gửi trực tiếp về Telegram một cách an toàn.",
      tech: ["RouterOS v7", "Telegram", "Automation"],
    },
    {
      name: "Giải pháp IPTV & Xử lý luồng Multicast",
      period: "2025 – Hiện tại",
      description:
        "Công cụ PHP quét luồng multicast thu phát từ nhà mạng (MyTV API), chuyển đổi và đóng gói danh sách phát M3U tùy biến.",
      tech: ["PHP", "IPTV", "Multicast", "M3U"],
    },
    {
      name: "Web maias-landing & Telegram Control Builder",
      period: "2025 – Hiện tại",
      description:
        "Ứng dụng web Next.js 15 và React 19, CI/CD deploy Vercel; module builder điều khiển thiết bị Android (Samsung Active Series) đã root qua Telegram.",
      tech: ["Next.js 15", "React 19", "Vercel", "Telegram"],
    },
  ] satisfies Project[],

  certifications: [] satisfies Certification[],

  languages: [{ name: "Tiếng Việt", level: "Bản ngữ" }] satisfies Language[],

  references: [] as { name: string; role: string; contact: string }[],

  meta: {
    siteTitle: "Võ Hoàng Hải Nghĩa — CV",
    description:
      "CV Võ Hoàng Hải Nghĩa (Nghĩa Zakshin) — IT Specialist, DevOps, Lead Developer. MikroTik, Ubuntu Server, Next.js, Automation.",
    siteUrl: "https://your-cv.vercel.app",
  },
};
