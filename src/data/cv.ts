/**
 * Nội dung CV — xem hướng dẫn đầy đủ: src/data/HUONG-DAN.md
 */

export type ContactLink = {
  label: string;
  href: string;
  /** icon key: email | phone | location | linkedin | github | website */
  icon: "email" | "phone" | "location" | "linkedin" | "github" | "website";
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

export const cv = {
  /** Thông tin cá nhân */
  personal: {
    fullName: "Nguyễn Văn A",
    title: "Software Engineer",
    tagline: "Xây dựng sản phẩm web hiệu năng cao, dễ bảo trì",
    location: "Hồ Chí Minh, Việt Nam",
    /** Để trống nếu không dùng ảnh — sẽ hiển thị chữ cái đầu */
    avatarUrl: "",
    /** Ngôn ngữ hiển thị trang: "vi" | "en" */
    locale: "vi" as const,
  },

  /** Tóm tắt nghề nghiệp (3–5 câu) */
  summary:
    "Kỹ sư phần mềm với hơn 3 năm kinh nghiệm phát triển ứng dụng web full-stack. Tập trung vào trải nghiệm người dùng, chất lượng code và quy trình làm việc theo Agile. Mong muốn đóng góp vào đội ngũ phát triển sản phẩm có tác động thực tế.",

  /**
   * Thông tin cá nhân bổ sung (sidebar).
   * Để "" hoặc [] để ẩn từng mục — xem HUONG-DAN.md
   */
  personalInfo: {
    /** Phương châm sống */
    motto: "Học hỏi không ngừng, làm việc có trách nhiệm, coi trọng sự tử tế.",
    /** Kỹ năng mềm */
    softSkills: [
      "Giao tiếp & thuyết trình",
      "Làm việc nhóm & Agile",
      "Giải quyết vấn đề",
      "Tư duy phản biện",
      "Quản lý thời gian",
    ],
    /** Sở thích */
    interests: ["Đọc sách công nghệ", "Chạy bộ", "Mở source", "Nhiếp ảnh"],
    /** Mong muốn / định hướng nghề nghiệp */
    aspirations:
      "Mong muốn gia nhập môi trường product-focused, được tham gia xây dựng sản phẩm có quy mô người dùng thật, phát triển lên Senior trong 2–3 năm tới.",
  },

  contact: [
    { label: "email@example.com", href: "mailto:email@example.com", icon: "email" },
    { label: "+84 900 000 000", href: "tel:+84900000000", icon: "phone" },
    { label: "Hồ Chí Minh, Việt Nam", href: "#", icon: "location" },
    {
      label: "linkedin.com/in/username",
      href: "https://linkedin.com/in/username",
      icon: "linkedin",
    },
    { label: "github.com/username", href: "https://github.com/username", icon: "github" },
    { label: "yourdomain.com", href: "https://yourdomain.com", icon: "website" },
  ] satisfies ContactLink[],

  experience: [
    {
      company: "Công ty ABC Technology",
      role: "Senior Frontend Developer",
      location: "TP. Hồ Chí Minh",
      period: "01/2023 – Hiện tại",
      highlights: [
        "Thiết kế và triển khai giao diện dashboard phục vụ 10.000+ người dùng doanh nghiệp.",
        "Giảm 40% thời gian tải trang nhờ tối ưu bundle, lazy loading và caching.",
        "Hướng dẫn 2 junior developer, review code và thiết lập chuẩn component.",
      ],
    },
    {
      company: "Startup XYZ",
      role: "Full-stack Developer",
      location: "Remote",
      period: "06/2021 – 12/2022",
      highlights: [
        "Xây dựng MVP sản phẩm SaaS từ ý tưởng đến production trong 4 tháng.",
        "Tích hợp thanh toán, xác thực OAuth và hệ thống thông báo real-time.",
        "Viết tài liệu API và unit test, đạt coverage ~75%.",
      ],
    },
  ] satisfies Experience[],

  education: [
    {
      school: "Đại học Bách Khoa TP.HCM",
      degree: "Cử nhân Công nghệ Thông tin",
      period: "2017 – 2021",
      details: "Chuyên ngành Kỹ thuật phần mềm · GPA: 3.2/4.0",
    },
  ] satisfies Education[],

  skills: [
    {
      category: "Ngôn ngữ & Framework",
      items: ["TypeScript", "React", "Next.js", "Node.js", "Python"],
    },
    {
      category: "Cơ sở dữ liệu & Cloud",
      items: ["PostgreSQL", "MongoDB", "Redis", "AWS", "Vercel"],
    },
  ] satisfies SkillGroup[],

  projects: [
    {
      name: "Hệ thống quản lý dự án nội bộ",
      link: "https://github.com/username/project",
      period: "2024",
      description:
        "Ứng dụng web quản lý task, sprint và báo cáo tiến độ cho team 15 người.",
      tech: ["Next.js", "Prisma", "PostgreSQL", "Tailwind CSS"],
    },
    {
      name: "Portfolio cá nhân",
      link: "https://yourdomain.com",
      period: "2023",
      description: "Trang giới thiệu bản thân, blog kỹ thuật và form liên hệ.",
      tech: ["Next.js", "MDX", "Vercel"],
    },
  ] satisfies Project[],

  certifications: [
    { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", year: "2024" },
    { name: "Meta Front-End Developer", issuer: "Coursera / Meta", year: "2023" },
  ] satisfies Certification[],

  languages: [
    { name: "Tiếng Việt", level: "Bản ngữ" },
    { name: "Tiếng Anh", level: "TOEIC 850 — Giao tiếp công việc" },
  ] satisfies Language[],

  /** Tùy chọn — để mảng rỗng [] để ẩn section */
  references: [] as { name: string; role: string; contact: string }[],

  /** Meta cho SEO & chia sẻ link */
  meta: {
    siteTitle: "Nguyễn Văn A — CV",
    description: "Curriculum Vitae của Nguyễn Văn A — Software Engineer",
    /** URL sau khi deploy Vercel, ví dụ: https://cv-basic.vercel.app */
    siteUrl: "https://your-cv.vercel.app",
  },
} as const;

export type CVData = typeof cv;
