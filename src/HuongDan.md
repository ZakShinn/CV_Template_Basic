# Hướng dẫn chỉnh sửa CV & trang web

Mọi thứ bạn cần sửa là **các file** ngay trong `src/` (không có thư mục con `resume/`, `avatar/`, …).

## Các file cần biết


| File                     | Mục đích                                                       |
| ------------------------ | -------------------------------------------------------------- |
| `**resume-basic.ts`**    | Thông tin cơ bản: họ tên, tóm tắt, liên hệ, phương châm…       |
| `**resume-advanced.ts**` | Nâng cao: kinh nghiệm, học vấn, dự án, chứng chỉ, SEO (`meta`) |
| `**resume.ts**`          | Gộp dữ liệu (thường không cần sửa)                             |
| `**avatar.ts**`          | Ảnh đại diện + favicon                                         |
| `**color.ts**`           | Mã màu hex toàn trang                                          |
| `**font.ts**`            | Font chữ (+ `app/layout.tsx` khi đổi Google Font)              |
| `**config.ts**`          | Bật/tắt section CV và nút toolbar (in, PDF, dịch, dark mode…)  |


## Quy trình nhanh

1. `resume-basic.ts` — họ tên, liên hệ, tóm tắt
2. `resume-advanced.ts` — kinh nghiệm, học vấn, `meta.siteUrl`
3. `avatar.ts` + ảnh trong `public/avatar/`
4. `color.ts` — đổi hex
5. `font.ts` + `app/layout.tsx` — đổi font
6. `config.ts` — ẩn mục / tắt nút không cần
7. **Lưu** → **F5** trình duyệt

---

## `resume-basic.ts`


| Khối           | Ghi chú                                                               |
| -------------- | --------------------------------------------------------------------- |
| `personal`     | `fullName`, `title`, `tagline`, `location`                            |
| `summary`      | 3–5 câu                                                               |
| `personalInfo` | `motto`, `softSkills`, `interests`, `aspirations` — `""` / `[]` để ẩn |
| `contact`      | `{ label, href, icon }` — xem mục **Mạng xã hội & liên hệ** bên dưới  |


## Mạng xã hội & liên hệ

Chỉnh mảng `contact` trong `**resume-basic.ts`**. Mỗi dòng = một link trên sidebar CV.

### Icon có sẵn (không cần sửa code React)


| `icon`     | Dùng cho                                   |
| ---------- | ------------------------------------------ |
| `email`    | Email (`href`: `mailto:ban@email.com`)     |
| `phone`    | Số điện thoại (`href`: `tel:+84901234567`) |
| `location` | Địa điểm (`href`: `#`, chỉ hiển thị chữ)   |
| `linkedin` | LinkedIn                                   |
| `github`   | GitHub                                     |
| `website`  | Website / blog / link chung                |
| `facebook` | Facebook                                   |
| `zalo`     | Zalo (`https://zalo.me/...`)               |
| `telegram` | Telegram (`https://t.me/...`)              |


**Ví dụ thêm Telegram** (chỉ sửa `resume-basic.ts`):

```ts
{
  label: "@ten_telegram",
  href: "https://t.me/ten_telegram",
  icon: "telegram",
},
```

**Ví dụ thêm LinkedIn:**

```ts
{
  label: "linkedin.com/in/ten-ban",
  href: "https://linkedin.com/in/ten-ban",
  icon: "linkedin",
},
```

Thứ tự các dòng trong `contact` = thứ tự hiển thị trên CV (trên xuống dưới).

### Mạng chưa có icon riêng (cách nhanh)

Dùng `icon: "website"` cho Instagram, YouTube, TikTok, Discord, portfolio cá nhân, v.v.:

```ts
{
  label: "youtube.com/@kenh-cua-ban",
  href: "https://youtube.com/@kenh-cua-ban",
  icon: "website",
},
```

`label` là text hiển thị; `href` phải là URL đầy đủ (`https://...`), trừ `email` / `phone` / `location` như bảng trên.

### Thêm icon mới (Instagram, Discord, …)

Khi muốn icon riêng thay vì icon globe (`website`), sửa **3 file** theo thứ tự:

**Bước 1 — `resume-types.ts`**

Thêm tên icon vào kiểu `ContactLink` (ví dụ Discord):

```ts
icon:
  | "email"
  | ...
  | "telegram"
  | "discord";  // ← thêm dòng này
```

**Bước 2 — `components/icons.tsx`**

1. Tạo component SVG, ví dụ `IconDiscord` (copy cấu trúc `IconTelegram`).
2. Đăng ký trong object `contactIcons`:

```ts
const contactIcons: Record<ContactLink["icon"], React.FC<IconProps>> = {
  ...
  telegram: IconTelegram,
  discord: IconDiscord,  // ← thêm dòng này
};
```

Icon SVG có thể lấy từ [Simple Icons](https://simpleicons.org/) (viewBox `0 0 24 24`, `fill="currentColor"`).

**Bước 3 — `resume-basic.ts`**

```ts
{
  label: "Discord",
  href: "https://discord.gg/ma-ban",
  icon: "discord",
},
```

Lưu cả 3 file → F5 trình duyệt. Nếu TypeScript báo lỗi, kiểm tra tên `icon` đã khớp ở cả 3 chỗ chưa.

## `resume-advanced.ts`


| Khối                                                    | Ghi chú                                     |
| ------------------------------------------------------- | ------------------------------------------- |
| `experience`                                            | Mới nhất trên cùng; bullet có số liệu       |
| `education`, `skills`                                   |                                             |
| `projects`, `certifications`, `languages`, `references` | `[]` để ẩn                                  |
| `meta`                                                  | `siteTitle`, `description`, `siteUrl` — SEO |


**Chỉ nhập tiếng Việt.** Bấm **English** trên web để dịch tự động.

## `avatar.ts`

1. Đặt ảnh vào `public/avatar/`
2. Sửa `src: "/avatar/ten-file.jpg"`
3. `enabled: false` → hiện chữ cái đầu tên thay ảnh

## `color.ts`

Mỗi dòng trong object `colors` có **ghi chú** giải thích dùng cho phần nào trên CV/trang (chữ chính, sidebar, nút PDF, viền…).

- Sửa mã **hex** trong `colors` → lưu → F5.
- Đổi nhanh cả bộ: copy `presets.green` hoặc `presets.purple` vào `colors`, hoặc `getThemeCssBlock(presets.green)` trong `layout.tsx`.
- In PDF: bật *In nền* trình duyệt để giữ màu sidebar.

## `font.ts`

1. Chọn font trên [Google Fonts](https://fonts.google.com/) (có Vietnamese)
2. Sửa `family` trong `font.ts`
3. Đổi import trong `app/layout.tsx` cho khớp `nextFontId`

## `config.ts`

| `mode` | `full` = đầy đủ · `basic` = ẩn personalInfo, projects, certifications, references |
| `sections.`* | `false` = không hiện khối đó |
| `features.*` | Tắt nút dịch, dark mode, in, PDF, DOCX, thanh accent, footer |
| `features.allowSearchIndexing` | `false` (mặc định) = chặn Google index · `true` = cho phép tìm kiếm |

## In & deploy

- **Ctrl+P** / **In CV** → A4, bật *In nền*  
- Deploy Vercel → cập nhật `meta.siteUrl` trong `resume-advanced.ts`

