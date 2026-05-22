# Hướng dẫn chỉnh sửa CV

Tài liệu này mô tả cách cập nhật **nội dung**, **màu sắc**, **font chữ** và các tuỳ chỉnh khác của trang CV.

---

## Mục lục

1. [Tổng quan file](#1-tổng-quan-file)
2. [Cập nhật dữ liệu (`cv.ts`)](#2-cập-nhật-dữ-liệu-cvts)
3. [Màu sắc (`globals.css`)](#3-màu-sắc-globalscss)
4. [Font chữ (`layout.tsx` + `globals.css`)](#4-font-chữ-layouttsx--globalscss)
5. [Nhãn section tiếng Việt / Anh](#5-nhãn-section-tiếng-việt--anh)
6. [Ảnh đại diện](#6-ảnh-đại-diện)
7. [Ẩn / hiện section](#7-ẩn--hiện-section)
8. [In hoặc xuất PDF](#8-in-hoặc-xuất-pdf)
9. [SEO & meta](#9-seo--meta)
10. [Xem thay đổi sau khi sửa](#10-xem-thay-đổi-sau-khi-sửa)

---

## 1. Tổng quan file

| File | Mục đích |
|------|----------|
| `src/data/cv.ts` | **Toàn bộ nội dung CV** (tên, kinh nghiệm, kỹ năng, …) |
| `src/app/globals.css` | **Màu**, font mặc định, style in PDF |
| `src/app/layout.tsx` | **Font Google** tải về (Be Vietnam Pro, Source Serif 4) |
| `src/components/CVPage.tsx` | Bố cục trang, nhãn section (`vi` / `en`) |
| `src/components/CVHeader.tsx` | Header (avatar, tên, badge chức danh, tagline) |
| `src/components/CVFooter.tsx` | Footer trang trí (chỉ hiện trên web, ẩn khi in) |
| `src/components/Section.tsx` | Tiêu đề từng section (dùng màu accent) |
| `src/components/PersonalInfoSections.tsx` | Phương châm, kỹ năng mềm, sở thích, mong muốn |
| `src/components/PrintButton.tsx` | Nút In / PDF trên thanh toolbar |

**Quy tắc:** Chỉnh nội dung → `cv.ts`. Chỉnh màu chính → `globals.css`. Chỉnh font → `layout.tsx` + `globals.css`.

---

## 2. Cập nhật dữ liệu (`cv.ts`)

Mở `src/data/cv.ts` và sửa object `cv`. Mỗi trường tương ứng một khu vực trên trang.

### 2.1. `personal` — Thông tin đầu trang

```ts
personal: {
  fullName: "Họ và tên",
  title: "Chức danh / vị trí ứng tuyển",
  tagline: "Một dòng mô tả ngắn (slogan nghề nghiệp)",
  location: "Thành phố, quốc gia",  // có thể trùng với contact location
  avatarUrl: "",                   // xem mục 6
  locale: "vi",                      // "vi" hoặc "en" — nhãn section
},
```

| Trường | Hiển thị ở đâu |
|--------|----------------|
| `fullName` | Tiêu đề lớn trong header |
| `title` | Dòng dưới tên |
| `tagline` | Đoạn mô tả ngắn trong header |
| `avatarUrl` | Ảnh tròn hoặc chữ cái đầu nếu để trống |
| `locale` | Ngôn ngữ nhãn: Tóm tắt / Summary, … |

---

### 2.2. `summary` — Tóm tắt

Chuỗi văn bản thuần (string), 3–5 câu:

```ts
summary: "Kỹ sư phần mềm với ...",
```

---

### 2.3. `personalInfo` — Thông tin cá nhân (cột trái)

Hiển thị dưới phần liên hệ, trên kỹ năng kỹ thuật:

```ts
personalInfo: {
  motto: "Phương châm sống — 1–2 câu",
  softSkills: ["Giao tiếp", "Làm việc nhóm"],
  interests: ["Đọc sách", "Thể thao"],
  aspirations: "Mong muốn nghề nghiệp, môi trường làm việc, định hướng 2–3 năm...",
},
```

| Trường | Kiểu | Ẩn khi |
|--------|------|--------|
| `motto` | `string` | `""` (chuỗi rỗng) |
| `softSkills` | `string[]` | `[]` |
| `interests` | `string[]` | `[]` |
| `aspirations` | `string` | `""` |

**Lưu ý:** Kỹ năng mềm nên để ở `personalInfo.softSkills`, không trộn vào `skills` (dành cho kỹ năng kỹ thuật).

---

### 2.4. `contact` — Liên hệ (cột trái)

Mảng các mục liên hệ. Mỗi mục:

```ts
{
  label: "email@example.com",           // Text hiển thị
  href: "mailto:email@example.com",       // Link khi click
  icon: "email",                          // Loại icon — xem bảng dưới
}
```

| `icon` | Ý nghĩa | `href` gợi ý |
|--------|---------|----------------|
| `email` | Email | `mailto:you@email.com` |
| `phone` | Điện thoại | `tel:+84901234567` (không dấu cách) |
| `location` | Địa chỉ | `"#"` (không mở tab mới) |
| `linkedin` | LinkedIn | URL đầy đủ `https://linkedin.com/in/...` |
| `github` | GitHub | URL repo hoặc profile |
| `website` | Website cá nhân | URL HTTPS |

**Thêm / bớt mục:** Copy hoặc xóa object trong mảng `contact`.

**Ví dụ thêm Telegram** (dùng icon `website` hoặc mở rộng `icons.tsx` nếu cần icon riêng):

```ts
{ label: "t.me/username", href: "https://t.me/username", icon: "website" },
```

---

### 2.5. `experience` — Kinh nghiệm làm việc

Thứ tự trong mảng = thứ tự hiển thị (**mới nhất đặt trên cùng**).

```ts
{
  company: "Tên công ty",
  role: "Vị trí công việc",
  location: "TP. Hồ Chí Minh",   // tuỳ chọn — bỏ field nếu không cần
  period: "01/2023 – Hiện tại",
  highlights: [
    "Thành tựu / nhiệm vụ 1 (nên có số liệu nếu có)",
    "Thành tựu 2",
  ],
},
```

| Trường | Ghi chú |
|--------|---------|
| `highlights` | Mỗi phần tử = 1 bullet; nên 2–4 dòng / công ty |
| `period` | Tự viết: `06/2021 – 12/2022` hoặc `2020 – 2023` |

**Thêm công ty:** Thêm object vào đầu mảng `experience`.

**Xóa công ty:** Xóa object tương ứng.

---

### 2.6. `education` — Học vấn

```ts
{
  school: "Tên trường",
  degree: "Bằng cấp / chuyên ngành",
  period: "2017 – 2021",
  details: "GPA, học bổng, luận văn...",  // tuỳ chọn
},
```

---

### 2.7. `skills` — Kỹ năng kỹ thuật (sidebar)

Nhóm theo category:

```ts
{
  category: "Ngôn ngữ & Framework",
  items: ["TypeScript", "React", "Next.js"],
},
```

- **Thêm nhóm:** Thêm object `{ category, items }`.
- **Thêm skill:** Thêm string vào `items`.

---

### 2.8. `projects` — Dự án

```ts
{
  name: "Tên dự án",
  link: "https://github.com/...",  // tuỳ chọn — không có thì bỏ field
  period: "2024",                  // tuỳ chọn
  description: "Mô tả ngắn 1–2 câu",
  tech: ["Next.js", "PostgreSQL"],
},
```

**Ẩn toàn bộ section dự án:** `projects: []`

---

### 2.9. `certifications` — Chứng chỉ

```ts
{ name: "AWS Certified ...", issuer: "Amazon Web Services", year: "2024" },
```

**Ẩn section:** `certifications: []`

---

### 2.10. `languages` — Ngôn ngữ

```ts
{ name: "Tiếng Anh", level: "TOEIC 850 — Giao tiếp công việc" },
```

**Ẩn section:** `languages: []`

---

### 2.11. `references` — Người tham chiếu (tuỳ chọn)

```ts
references: [
  { name: "Nguyễn B", role: "Trưởng nhóm tại ABC", contact: "email@company.com" },
],
```

**Ẩn section:** `references: []` (mặc định)

---

### 2.12. `meta` — SEO (tab trình duyệt, chia sẻ link)

```ts
meta: {
  siteTitle: "Họ Tên — CV",
  description: "Mô tả ngắn cho Google / Facebook preview",
  siteUrl: "https://domain-cua-ban.com",
},
```

Cập nhật `siteUrl` sau khi deploy để preview link đúng.

---

## 3. Màu sắc (`globals.css`)

Mở `src/app/globals.css`, khối `@theme { ... }`. Đổi mã hex (hoặc `oklch`, `hsl`) — lưu file, refresh trình duyệt.

| Biến CSS | Vai trò | Vị trí trên trang |
|----------|---------|-------------------|
| `--color-ink` | Chữ chính (đậm) | Tên job, tiêu đề con, skill tags |
| `--color-ink-muted` | Chữ phụ / mô tả | Summary, bullet, thời gian |
| `--color-surface` | Nền ngoài khung CV | Toàn trang (body) |
| `--color-accent` | Màu thương hiệu chính | Badge chức danh, viền tagline, tiêu đề section, nút In |
| `--color-accent-light` | Accent nhạt hơn | Tên công ty, link hover, icon |
| `--color-accent-dark` | Dự phòng / trang trí | Có thể dùng trong `CVHeader.tsx` |
| `--color-border` | Viền, đường kẻ | Khung card, timeline |
| `--color-highlight` | Nền sidebar / thẻ nhạt | Cột trái, nền project |

### Ví dụ đổi sang tông xanh lá

```css
@theme {
  --color-accent: #14532d;
  --color-accent-light: #166534;
  --color-accent-dark: #052e16;
}
```

### Ví dụ tông tím chuyên nghiệp

```css
@theme {
  --color-accent: #4c1d95;
  --color-accent-light: #6d28d9;
  --color-accent-dark: #2e1065;
}
```

### Tuỳ chỉnh header

Header nằm trong `src/components/CVHeader.tsx`: avatar tròn, tên serif, chức danh dạng chữ (không badge), tagline có đường kẻ trên.

- Đổi màu accent / viền avatar: sửa class và `boxShadow` inline trong file đó.
- Đổi kích thước ảnh: class `h-[7.75rem] w-[7.75rem]` (và `sm:h-[8.5rem]`).
- Footer trang trí: `src/components/CVFooter.tsx` (ẩn khi in PDF — class `no-print`).

### Màu khi in PDF

Trong `@media print` (cùng file `globals.css`):

- `body { font-size: 11pt; }` — cỡ chữ in
- Link in kèm URL: `color: #64748b` trong rule `a[href^="http"]::after`

---

## 4. Font chữ (`layout.tsx` + `globals.css`)

### Bước 1 — Chọn font trên Google Fonts

Ví dụ: [Inter](https://fonts.google.com/specimen/Inter), [Roboto](https://fonts.google.com/specimen/Roboto), [Be Vietnam Pro](https://fonts.google.com/specimen/Be+Vietnam+Pro) (hỗ trợ tiếng Việt).

### Bước 2 — Sửa `src/app/layout.tsx`

```ts
import { Be_Vietnam_Pro, Source_Serif_4 } from "next/font/google";

const beVietnam = Be_Vietnam_Pro({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "vietnamese"],  // bắt buộc "vietnamese" nếu font hỗ trợ
  variable: "--font-sans-loaded",
  display: "swap",
});
```

Đổi font sans: thay `Be_Vietnam_Pro` bằng font khác (tên import = tên font, dấu cách → `_`, ví dụ `Open_Sans`).

Đổi font tiêu đề (serif): thay `Source_Serif_4` tương tự.

Gắn biến vào `<html>`:

```tsx
<html className={`${beVietnam.variable} ${sourceSerif.variable}`}>
```

### Bước 3 — Sửa tên hiển thị trong `globals.css`

```css
@theme {
  --font-sans: "Be Vietnam Pro", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "Source Serif 4", ui-serif, Georgia, serif;
}
```

Tên trong ngoặc kép phải **khớp** tên font trên Google Fonts.

### Font được dùng ở đâu?

| Kiểu | Biến | Dùng cho |
|------|------|----------|
| Sans | `--font-sans` | Toàn bộ body, liên hệ, mô tả |
| Serif | `font-serif` (class Tailwind) | Họ tên header, tiêu đề section |

Class `font-serif` trong component map tới `--font-serif` qua Tailwind `@theme`.

---

## 5. Nhãn section tiếng Việt / Anh

Trong `src/components/CVPage.tsx`, object `labels`:

```ts
const labels = {
  vi: { summary: "Tóm tắt", experience: "Kinh nghiệm làm việc", ... },
  en: { summary: "Summary", experience: "Experience", ... },
};
```

- Đổi ngôn ngữ trang: `locale: "en"` trong `cv.ts` → `personal`.
- Đổi chữ hiển thị: sửa text trong `labels.vi` hoặc `labels.en`.
- Nút in: `print: "In / PDF"` / `"Print / PDF"`.

---

## 6. Ảnh đại diện

### Cách 1 — File local (khuyên dùng)

1. Đặt ảnh vào `public/avatar.jpg` (hoặc `.png`, `.webp`).
2. Trong `cv.ts`:

```ts
avatarUrl: "/avatar.jpg",
```

### Cách 2 — URL ngoài

```ts
avatarUrl: "https://example.com/photo.jpg",
```

### Không dùng ảnh

```ts
avatarUrl: "",
```

Trang hiển thị **2 chữ cái đầu** của họ tên (ví dụ Nguyễn Văn A → **VA**).

---

## 7. Ẩn / hiện section

| Section | Cách ẩn |
|---------|---------|
| Phương châm sống | `personalInfo.motto: ""` |
| Kỹ năng mềm | `personalInfo.softSkills: []` |
| Sở thích | `personalInfo.interests: []` |
| Mong muốn | `personalInfo.aspirations: ""` |
| Dự án | `projects: []` |
| Chứng chỉ | `certifications: []` |
| Ngôn ngữ | `languages: []` |
| Người tham chiếu | `references: []` (mặc định) |

Section **Tóm tắt**, **Kinh nghiệm**, **Học vấn**, **Kỹ năng**, **Liên hệ** luôn hiển thị (lõi CV).

---

## 8. In hoặc xuất PDF

- Trên web: nút **In / PDF** (góc phải, không in ra PDF).
- Hoặc `Ctrl+P` (Windows) / `Cmd+P` (Mac).
- Chọn máy in **Save as PDF** / **Microsoft Print to PDF**.
- Khổ giấy: A4 (đã cấu hình trong `globals.css`).

Toolbar và nút in có class `no-print` — không xuất hiện trên bản in.

---

## 9. SEO & meta

Chỉ sửa trong `cv.ts` → `meta`:

- `siteTitle` — tiêu đề tab trình duyệt
- `description` — mô tả khi share link
- `siteUrl` — URL canonical / Open Graph

Metadata được đọc trong `src/app/layout.tsx` (`export const metadata`).

---

## 10. Xem thay đổi sau khi sửa

```bash
npm run dev
```

Mở http://localhost:3000 — trang tự reload khi lưu file (dev mode).

**Lỗi TypeScript thường gặp:**

| Lỗi | Cách sửa |
|-----|----------|
| Thiếu dấu phẩy giữa các object | Thêm `,` sau `}` cuối mỗi mục trong mảng |
| `icon` sai giá trị | Chỉ dùng: `email`, `phone`, `location`, `linkedin`, `github`, `website` |
| `locale` sai | Chỉ `"vi"` hoặc `"en"` |

---

## Checklist trước khi gửi nhà tuyển dụng

- [ ] Đã thay toàn bộ dữ liệu mẫu trong `cv.ts`
- [ ] Email / SĐT / link LinkedIn hoạt động
- [ ] Kinh nghiệm sắp xếp mới → cũ
- [ ] Bullet có số liệu cụ thể khi có thể
- [ ] `meta.siteTitle` và `meta.siteUrl` đúng
- [ ] In thử PDF, kiểm tra không bị cắt section
- [ ] Màu và font phù hợp ngành (IT: xanh navy/xanh lá; sáng tạo: có thể tím/cam nhẹ)

---

*Nếu cần thay đổi bố cục lớn (thêm section mới, đổi 1 cột thành 2 trang), phải sửa thêm `CVPage.tsx` và có thể `Section.tsx`.*
